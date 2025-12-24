"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import usePageManager from "@/hooks/usePageManager";
import ScrollUpHint from "@/components/ScrollUpHint";
import styles from "./styles/page3.module.css";

export default function Page3() {
  const PAGE_NUMBER = 3;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { appendNextPage } = usePageManager();
  
  // Toggle for Easter Egg mode (restoring design as Easter Egg version by default)
  const [isEasterEgg] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Mock Data
  const summary = {
    appLaunchDate: "2023-07-28",
    userJoinDate: "2023-07-28",
    userRank: 12345,
  };

  const daysTogether = useMemo(() => {
    const start = new Date(summary.userJoinDate).getTime();
    const now = Date.now();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary.userJoinDate]);

  function onShow() {
    setAnimKey(prev => prev + 1);
  }

  // 最后一行的 order，用于计算 Hint 的 delay
  // Top (1~5) + Bottom (6~7) = 7
  // EasterEgg (8~9)
  const lastOrder = isEasterEgg ? 9 : 7;

  return (
    <PageWrapper 
      pageNumber={PAGE_NUMBER} 
      onShow={onShow}
    >
      <div key={animKey} className={styles.container} id="page3-container">
        {/* Background */}
        <div className={styles.background}>
          <Image 
            src="/imgs/page3/background.svg" 
            alt="Background" 
            fill 
            style={{ objectFit: "cover" }} 
          />
        </div>

        <div className={styles.content}>
          {/* Top Section */}
          <div className={styles.topSection}>
            <span 
              className={`${styles.titleEnglish} reveal-line`}
              style={{ '--order': 1 } as React.CSSProperties}
            >
              At the Beginning....
            </span>
            
            <div className={styles.infoGroup}>
              <div 
                className={`${styles.textRow} reveal-line`}
                style={{ '--order': 2 } as React.CSSProperties}
              >
                <span className={styles.fontPrimary}>噗噗在</span>
                <span className={styles.fontPrimary}>【2023年7月28日】</span>
              </div>
              <div 
                className={`${styles.textRow} reveal-line`}
                style={{ '--order': 3 } as React.CSSProperties}
              >
                <span className={styles.fontPrimary}>悄然上线</span>
              </div>
              <div 
                className={`${styles.textRow} reveal-line`}
                style={{ '--order': 4 } as React.CSSProperties}
              >
                <span className={styles.fontPrimary}>你在</span>
                <span className={styles.fontPrimary}>【2023年7月28日】</span>
              </div>
              <div 
                className={`${styles.textRow} reveal-line`}
                style={{ '--order': 5 } as React.CSSProperties}
              >
                <span className={styles.fontPrimary}>与噗噗相遇~</span>
              </div>
            </div>
          </div>

          {/* Middle Section - Image (Always Visible) */}
          <div className={`${styles.middleSection} ${!isEasterEgg ? styles.wideSpacing : ''}`}>
            <Image 
              src="/imgs/page3/Circle.png" 
              alt="Together" 
              fill 
              className={styles.circleImage}
            />
          </div>

          {/* Bottom Section */}
          <div className={styles.bottomSection}>
            <div className={styles.statGroup}>
              <span 
                className={`${styles.fontPrimary} reveal-line`}
                style={{ '--order': 6 } as React.CSSProperties}
              >
                我们已经相互陪伴了
              </span>
              <div 
                className={`${styles.textRow} reveal-line`}
                style={{ '--order': 7 } as React.CSSProperties}
              >
                 <span className={styles.highlightText}>{daysTogether}</span>
                 <span className={styles.fontPrimary}>天！</span>
              </div>
            </div>

            {isEasterEgg && (
              <div className={styles.statGroup}>
                <div 
                  className={`${styles.textRow} reveal-line`}
                  style={{ '--order': 8 } as React.CSSProperties}
                >
                  <span className={styles.fontPrimary}>你是第</span>
                  <span className={styles.highlightText}>{summary.userRank}</span>
                  <span className={styles.fontPrimary}>登岛的伙伴</span>
                </div>
                <span 
                  className={`${styles.fontPrimary} reveal-line`}
                  style={{ '--order': 9 } as React.CSSProperties}
                >
                  是噗噗最珍贵的元老🫶
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ScrollUpHint also uses reveal-line for delay, but we need to ensure it's positioned correctly */}
        {/* We wrap it in a div that applies the reveal animation */}
        <div 
          className="reveal-line" 
          style={{ 
            '--order': lastOrder + 1, 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            pointerEvents: 'none' 
          } as React.CSSProperties}
        >
          <ScrollUpHint />
        </div>
      </div>
    </PageWrapper>
  );
}
