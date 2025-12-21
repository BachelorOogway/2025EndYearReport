"use client";
import usePageManager from "@/hooks/usePageManager";
import Page1 from "@/components/pages/page1";
import Page2 from "@/components/pages/page2";

export default function Pages() {
  const { isActive } = usePageManager();
  const PAGES = [Page1, Page2];
  return (
    <>
      {PAGES.map((Comp, idx) => (isActive(idx + 1) ? <Comp key={idx} /> : null))}
    </>
  );
}

