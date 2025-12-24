import type { ReactNode } from "react";
// Footer is removed from here to handle global logic inside PageManagerProvider

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="phone-shell">
      <div className="phone-content">
        {children}
      </div>
    </div>
  );
}
