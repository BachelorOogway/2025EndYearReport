"use client";
import { useState } from "react";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import { sendViewPageTracking } from "@/utils/dom";

// Component24 (Page22) - 成就总结页组件
// 进入页面时，图片元素从四周滑动出现
export default function Page22() {
  const PAGE_NUMBER = 22;
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // 模拟数据 - 实际应从 props 或 API 获取
  const achievementCount = 15; // 成就数量
  const growthPercentage = 25; // 成长百分比

  const handleTreeTrunkClick = () => {
    // 点击树干查看成长足迹的逻辑
    console.log("点击树干查看成长足迹");
  };

  const handleYearClick = (year: number) => {
    setSelectedYear(year === selectedYear ? null : year);
  };

  // 图片滑动出现动画 - 参考example.tsx的reveal方式
  function slideIn(selector: string, delayMs: number, fromDirection: 'left' | 'right' | 'top' | 'bottom' = 'bottom', durationMs = 800) {
    setTimeout(() => {
      if (typeof document === "undefined") return;
      const pageElement = document.getElementById(`page${PAGE_NUMBER}`);
      if (!pageElement) return;
      
      const elements = pageElement.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        el.classList.remove("hide");
        
        // 根据方向设置初始位置
        let initialTransform = "";
        switch (fromDirection) {
          case 'left':
            initialTransform = "translateX(-100px)";
            break;
          case 'right':
            initialTransform = "translateX(100px)";
            break;
          case 'top':
            initialTransform = "translateY(-100px)";
            break;
          case 'bottom':
            initialTransform = "translateY(100px)";
            break;
        }
        
        // 设置初始状态
        el.style.transform = initialTransform;
        el.style.opacity = "0";
        el.style.transition = `transform ${durationMs}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${durationMs}ms ease-out`;
        
        // 触发动画
        requestAnimationFrame(() => {
          el.style.transform = "translate(0, 0)";
          el.style.opacity = "1";
        });
      });
    }, delayMs);
  }

  // 淡入动画 - 参考Page2
  function fadeIn(selector: string, delayMs: number, durationMs = 600) {
    setTimeout(() => {
      if (typeof document === "undefined") return;
      const pageElement = document.getElementById(`page${PAGE_NUMBER}`);
      if (!pageElement) return;
      
      const elements = pageElement.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        el.classList.remove("hide");
        el.style.transition = `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, delayMs);
  }

  // 缩放进入动画
  function scaleIn(selector: string, delayMs: number, durationMs = 600) {
    setTimeout(() => {
      if (typeof document === "undefined") return;
      const pageElement = document.getElementById(`page${PAGE_NUMBER}`);
      if (!pageElement) return;
      
      const elements = pageElement.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        el.classList.remove("hide");
        el.style.transition = `transform ${durationMs}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${durationMs}ms ease-out`;
        el.style.transform = "scale(1)";
        el.style.opacity = "1";
      });
    }, delayMs);
  }

  // 页面进入视口时触发动画 - 参考example.tsx
  function onShow() {
    let t = 0;
    const step = 200; // 动画间隔时间

    // 第一部分：今年成就区域
    // 文本从左侧滑入
    slideIn(".page22-text-1", (t += step), 'left', 800);
    slideIn(".page22-text-2", (t += step), 'left', 800);
    
    // 树从下方滑入
    slideIn(".page22-tree-1", (t += step * 1.5), 'bottom', 1000);
    
    // 提示文字和箭头从右侧滑入
    slideIn(".page22-hint", (t += step * 1.2), 'right', 800);
    
    // 叶子装饰从不同方向滑入
    slideIn(".page22-leaf-1", (t += step), 'top', 700);
    slideIn(".page22-leaf-2", (t += step), 'left', 700);
    slideIn(".page22-leaf-3", (t += step), 'right', 700);
    slideIn(".page22-leaf-4", (t += step), 'bottom', 700);
    slideIn(".page22-leaf-5", (t += step), 'top', 700);

    // 第二部分：年份成就区域
    t += step * 2; // 间隔
    slideIn(".page22-years-text", (t += step), 'top', 800);
    slideIn(".page22-tree-2", (t += step * 1.5), 'bottom', 1000);
    
    // 年份卡片从不同方向滑入
    slideIn(".page22-year-2023", (t += step), 'right', 700);
    slideIn(".page22-year-2024", (t += step), 'left', 700);
    slideIn(".page22-year-2025", (t += step), 'right', 700);
    
    // 页脚从下方滑入
    slideIn(".page22-footer", (t += step), 'bottom', 600);
  }

  function handleShow() {
    onShow();
    sendViewPageTracking(PAGE_NUMBER);
  }

  return (
    <PageWrapper pageNumber={PAGE_NUMBER} onShow={handleShow}>
      {/* 第一部分：今年成就 */}
      <div className="content-block">
        {/* 文本内容 */}
        <div className="page22-text-1 hide">
          <p>今年你收获了<span className="figure">{achievementCount}</span>个成就</p>
        </div>
        <div className="page22-text-2 hide">
          <p>比去年增长了<span className="figure">{growthPercentage}</span>%</p>
        </div>

        {/* 树图片 - 从下方滑入 */}
        <div className="page22-tree-1 hide relative w-full max-w-[18rem] h-[18rem] mx-auto my-6">
          <div className="relative w-full h-full" onClick={handleTreeTrunkClick} data-next-ignore="true">
            <Image 
              src="/imgs/page22/tree.png" 
              alt="Tree" 
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 提示文字和箭头 - 从右侧滑入 */}
        <div className="page22-hint hide flex items-center justify-start gap-3 mt-6">
          <div className="relative w-[2.85rem] h-[2.65rem]" style={{ animation: "float 2s ease-in-out infinite" }}>
            <Image src="/imgs/page22/arrow.png" alt="Arrow" width={45} height={42} />
          </div>
          <span className="text-[0.8125rem] text-black whitespace-nowrap">
            点击树干 看看你的成长足迹
          </span>
        </div>

        {/* 叶子装饰 - 从不同方向滑入 */}
        <div className="relative w-full min-h-[400px]">
          <div className="page22-leaf-1 hide absolute top-10 left-10 w-20 h-20 z-0">
            <Image src="/imgs/page22/leaf1.png" alt="Leaf 1" width={80} height={80} className="object-contain" />
          </div>
          <div className="page22-leaf-2 hide absolute top-20 right-20 w-16 h-16 z-0">
            <Image src="/imgs/page22/leaf2.png" alt="Leaf 2" width={64} height={64} className="object-contain" />
          </div>
          <div className="page22-leaf-3 hide absolute bottom-20 left-20 w-18 h-18 z-0">
            <Image src="/imgs/page22/leaf3.png" alt="Leaf 3" width={72} height={72} className="object-contain" />
          </div>
          <div className="page22-leaf-4 hide absolute bottom-10 right-10 w-20 h-20 z-0">
            <Image src="/imgs/page22/leaf4.png" alt="Leaf 4" width={80} height={80} className="object-contain" />
          </div>
          <div className="page22-leaf-5 hide absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-0">
            <Image src="/imgs/page22/leaf5.png" alt="Leaf 5" width={64} height={64} className="object-contain" />
          </div>
        </div>
      </div>

      {/* 第二部分：不同年份的成就 */}
      <div className="content-block">
        {/* 年份文本 - 从上方滑入 */}
        <div className="page22-years-text hide">
          <p>点击不同年份 展开成就详情卡片</p>
        </div>

        {/* 年份树和卡片容器 */}
        <div className="page22-tree-2 hide relative w-full max-w-[18rem] h-[18rem] mx-auto my-6">
          {/* 树（有芒果） */}
          <div className="relative w-full h-full">
            <Image 
              src="/imgs/page22/tree.png" 
              alt="Tree with Mangoes" 
              fill
              className="object-contain"
            />
          </div>

          {/* 年份卡片 - 从不同方向滑入 */}
          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-around items-center pointer-events-none">
            <button
              className={`page22-year-2023 hide pointer-events-auto bg-gradient-to-b from-[#FFF681] to-[rgba(255,191,132,0.9)] border-2 border-black rounded-lg px-5 py-2.5 font-bold text-base text-black cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] whitespace-nowrap hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] self-end mr-4 -mt-12 rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-[0.25rem] ${
                selectedYear === 2023 ? "bg-gradient-to-b from-[#FFD700] to-[#FFA500] shadow-[0_4px_16px_rgba(255,215,0,0.4)]" : ""
              }`}
              onClick={() => handleYearClick(2023)}
            >
              2023
            </button>
            <button
              className={`page22-year-2024 hide pointer-events-auto bg-gradient-to-b from-[#FFF681] to-[rgba(255,191,132,0.9)] border-2 border-black rounded-lg px-5 py-2.5 font-bold text-base text-black cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] whitespace-nowrap hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] self-start ml-4 -mb-12 ${
                selectedYear === 2024 ? "bg-gradient-to-b from-[#FFD700] to-[#FFA500] shadow-[0_4px_16px_rgba(255,215,0,0.4)]" : ""
              }`}
              onClick={() => handleYearClick(2024)}
            >
              2024
            </button>
            <button
              className={`page22-year-2025 hide pointer-events-auto bg-gradient-to-b from-[#FFF681] to-[rgba(255,191,132,0.9)] border-2 border-black rounded-lg px-5 py-2.5 font-bold text-base text-black cursor-pointer transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.15)] whitespace-nowrap hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] self-end mr-4 -mb-12 ${
                selectedYear === 2025 ? "bg-gradient-to-b from-[#FFD700] to-[#FFA500] shadow-[0_4px_16px_rgba(255,215,0,0.4)]" : ""
              }`}
              onClick={() => handleYearClick(2025)}
            >
              2025
            </button>
          </div>
        </div>
      </div>

      {/* 页脚 - 从下方滑入 */}
      <div className="page22-footer hide w-full flex justify-center items-center py-6">
        <span className="text-xs text-[#87CEEB] font-normal">@Tripleuni 2025</span>
      </div>
    </PageWrapper>
  );
}
