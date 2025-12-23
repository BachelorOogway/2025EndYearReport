"use client";
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";

type PageEntry = {
  el: HTMLElement | null;
  firstEntered: boolean;
  action?: () => void;
};

type PageManagerContextType = {
  showUpTo: number;
  registerPageRef: (page: number, el: HTMLElement | null) => void;
  onEnterViewportForFirstTime: (page: number, action: () => void) => void;
  appendNextPage: (by: number, scrollTo?: boolean) => void;
  isActive: (page: number) => boolean;
  onAppendNext: (page: number, cb: () => void) => void;
  offAppendNext: (page: number, cb: () => void) => void;
};

export const PageManagerContext = createContext<PageManagerContextType | null>(null);

export default function PageManagerProvider({ children }: { children: React.ReactNode }) {
  const [showUpTo, setShowUpTo] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagesRef = useRef<Map<number, PageEntry>>(new Map());
  const rootMargin = "-50% 0px -50% 0px";
  const observerRef = useRef<IntersectionObserver | null>(null);
  const appendSubscribersRef = useRef<Map<number, Set<() => void>>>(new Map());
  const scrollAccumRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);
  const cooldownUntilRef = useRef<number>(0);
  const thresholdPxRef = useRef<number>(0);

  const registerPageRef = useCallback((page: number, el: HTMLElement | null) => {
    const prev = pagesRef.current.get(page) || { el: null, firstEntered: false };
    pagesRef.current.set(page, { ...prev, el });
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  const onEnterViewportForFirstTime = useCallback((page: number, action: () => void) => {
    const prev = pagesRef.current.get(page) || { el: null, firstEntered: false };
    pagesRef.current.set(page, { ...prev, action });
    const el = prev.el || (typeof document !== "undefined" ? document.getElementById(`page${page}`) : null);
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  const appendNextPage = useCallback((by: number, scrollTo: boolean = false) => {
    // 推进渲染范围
    setShowUpTo((prev) => (by === prev ? prev + 1 : prev));
    // 通知由当前页触发的“进入下一页”订阅者，用于隐藏提示等
    const subs = appendSubscribersRef.current.get(by);
    if (subs && subs.size) {
      subs.forEach((cb) => {
        try { cb(); } catch (e) { /* ignore */ }
      });
    }
    if (scrollTo) {
      // 触发转场
      if (by + 1 > currentPage) {
        setCurrentPage(by + 1);
      }
    }
  }, [currentPage]);

  const isActive = useCallback((page: number) => page <= showUpTo, [showUpTo]);

  const onAppendNext = useCallback((page: number, cb: () => void) => {
    const set = appendSubscribersRef.current.get(page) || new Set<() => void>();
    set.add(cb);
    appendSubscribersRef.current.set(page, set);
  }, []);

  const offAppendNext = useCallback((page: number, cb: () => void) => {
    const set = appendSubscribersRef.current.get(page);
    if (set) {
      set.delete(cb);
      if (set.size === 0) appendSubscribersRef.current.delete(page);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 按页面编号排序后逐一处理，避免并发漏触发
        const handled = entries
          .map((entry) => {
            const target = entry.target as HTMLElement;
            const id = target?.id || "";
            const match = id.match(/page(\d+)/);
            const page = match ? Number(match[1]) : NaN;
            return { entry, target, page };
          })
          .filter((i) => !Number.isNaN(i.page))
          .sort((a, b) => a.page - b.page);

        handled.forEach(({ entry, target, page }) => {
          const state = pagesRef.current.get(page);
          if (!state) return;
          if (entry.isIntersecting && !state.firstEntered) {
            state.firstEntered = true;
            pagesRef.current.set(page, state);
            try {
              state.action?.();
            } finally {
              observerRef.current?.unobserve(target);
            }
          }
        });
      },
      { rootMargin }
    );

    // 已注册元素需要补观察
    pagesRef.current.forEach((val) => {
      if (val.el) observerRef.current?.observe(val.el);
    });

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  // 容器滚动/触摸推进
  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = document.getElementById("pages-wrapper");
    if (!container) return;
    // 极小阈值，只要有滑动意图就触发
    thresholdPxRef.current = 15;

    const attemptNavigation = (direction: 'next' | 'prev') => {
      const now = Date.now();
      if (now < cooldownUntilRef.current) return;
      
      if (direction === 'next') {
        if (currentPage < showUpTo) {
          setCurrentPage(prev => prev + 1);
        } else {
          // 如果当前是最后一页，尝试解锁下一页并跳转
          appendNextPage(showUpTo, true);
        }
      } else {
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
      }
      
      cooldownUntilRef.current = now + 600;
      scrollAccumRef.current = 0;
      touchStartYRef.current = null;
    };

    const onWheel = (e: WheelEvent) => {
      // 阻止默认滚动行为（尽管 overflow: hidden 已经阻止了，双重保险）
      e.preventDefault();
      
      const now = Date.now();
      if (now < cooldownUntilRef.current) return;
      scrollAccumRef.current += e.deltaY;
      
      if (Math.abs(scrollAccumRef.current) >= thresholdPxRef.current) {
        if (scrollAccumRef.current > 0) {
          attemptNavigation('next');
        } else {
          attemptNavigation('prev');
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };
    
    // 核心：在 touchmove 中阻止默认行为，解决下拉刷新/回弹冲突
    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };
    
    const onTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now < cooldownUntilRef.current) return;
      const endY = e.changedTouches[0]?.clientY ?? null;
      if (touchStartYRef.current == null || endY == null) return;
      
      const delta = touchStartYRef.current - endY; // Positive = Finger Up (Scroll Down) = Next
      if (Math.abs(delta) >= thresholdPxRef.current) {
        if (delta > 0) {
          attemptNavigation('next');
        } else {
          attemptNavigation('prev');
        }
      }
      touchStartYRef.current = null;
    };

    // passive: false 是调用 preventDefault 的关键
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [showUpTo, currentPage, appendNextPage]);

  const value = useMemo<PageManagerContextType & { currentPage: number }>(() => ({
    showUpTo,
    registerPageRef,
    onEnterViewportForFirstTime,
    appendNextPage,
    isActive,
    onAppendNext,
    offAppendNext,
    currentPage,
  }), [showUpTo, registerPageRef, onEnterViewportForFirstTime, appendNextPage, isActive, onAppendNext, offAppendNext, currentPage]);

  return <PageManagerContext.Provider value={value}>{children}</PageManagerContext.Provider>;
}
