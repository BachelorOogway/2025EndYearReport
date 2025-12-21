"use client";
import { useContext } from "react";
import { PageManagerContext } from "@/components/PageManagerProvider";

export default function usePageManager() {
  const ctx = useContext(PageManagerContext);
  if (!ctx) {
    throw new Error("usePageManager must be used within PageManagerProvider");
  }
  return ctx;
}

