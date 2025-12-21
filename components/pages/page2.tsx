"use client";
import { useCallback, useState } from "react";
import PageWrapper from "@/components/PageWrapper";

export default function Page2() {
  const PAGE_NUMBER = 2;
  const [variant, setVariant] = useState<"day" | "night" | null>(null);

  const handleShow = useCallback(() => {
    setVariant((prev) => {
      if (prev) return prev;
      const hour = new Date().getHours();
      return hour >= 6 && hour < 18 ? "day" : "night";
    });
  }, []);

  return (
    <PageWrapper pageNumber={PAGE_NUMBER} onShow={handleShow}>
      <div>
        {variant === null ? <p>加载中</p> : variant === "day" ? <p>Page2 Day（占位）</p> : <p>Page2 Night（占位）</p>}
      </div>
    </PageWrapper>
  );
}
