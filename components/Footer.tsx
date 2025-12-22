import { Gochi_Hand } from "next/font/google";

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <p
        className={gochiHand.className}
        style={{
          fontStyle: "normal",
          fontSize: "25px",
          lineHeight: "29px",
          color: "#93B9CE",
          margin: 0,
        }}
      >
        @TripleUni 2025
      </p>
    </div>
  );
}
