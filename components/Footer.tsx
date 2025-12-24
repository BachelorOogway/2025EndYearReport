"use client";
import { Gochi_Hand } from "next/font/google";
import usePageManager from "@/hooks/usePageManager";

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  const { currentPage } = usePageManager();
  
  // Page 4 needs white text, others default blue
  const isWhite = currentPage === 4;
  const color = isWhite ? "#FFFFFF" : "#93B9CE";

  return (
    <div className="footer-wrapper">
      <p
        className={gochiHand.className}
        style={{
          fontStyle: "normal",
          fontSize: "1.5rem",
          lineHeight: "29px",
          color: color,
          margin: 0,
          transition: "color 0.3s ease", // Smooth transition
        }}
      >
        @TripleUni 2025
      </p>
    </div>
  );
}
