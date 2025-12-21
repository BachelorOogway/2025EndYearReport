import type { ReactNode } from "react";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="phone-shell">
      <div className="phone-content">
        {children}
        <Footer />
      </div>
    </div>
  );
}
