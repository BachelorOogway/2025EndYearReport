"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import usePageManager from "@/hooks/usePageManager";
import styles from "./styles/page2.module.css";

export default function Page2() {
  const PAGE_NUMBER = 2;
  const { appendNextPage } = usePageManager();
  // 暂时强制显示 Day 模式以还原设计稿，实际逻辑可保留
  const [variant] = useState<"day" | "night">("day"); 
  const [isGrowing, setIsGrowing] = useState(false);

  const handleTreeClick = () => {
    if (!isGrowing) {
      setIsGrowing(true);
    }
  };

  return (
    <PageWrapper pageNumber={PAGE_NUMBER}>
      {variant === "day" ? (
        <div className={styles.container}>
          {/* Top Cloud */}
          <div className={styles.cloud1}>
            <Image 
              src="/imgs/page2Day/cloud1.svg" 
              alt="Cloud" 
              fill 
              className={styles.objectContain}
            />
          </div>

          {/* Text Group 1 */}
          <div className={styles.textGroup1}>
            <div className={styles.greetingRow}>
              <span className={styles.fontPrimary}>嘿！</span>
              <span className={styles.fontPrimary}>【用户名称】</span>
            </div>
            <span className={styles.fontPrimary}>你的25-26年度旅程即将开启——</span>
          </div>

          {/* Text Group 2 */}
          <div className={styles.textGroup2}>
            <span className={styles.fontPrimary}>阳光正好</span>
            <span className={styles.fontPrimary}>一起来回顾你的成长吧！</span>
          </div>

          {/* Visual Area */}
          <div className={styles.visualArea}>
            <div className={styles.cloud2}>
              <Image src="/imgs/page2Day/cloud2.svg" alt="Cloud" fill />
            </div>

            <div className={styles.sun}>
               <div 
                 className={styles.treeWrapper} 
                 onClick={handleTreeClick}
                 data-next-ignore="true"
               >
                  {/* Small Tree (Sapling) */}
                  <Image 
                    src="/imgs/page2Day/tree.svg" 
                    alt="Small Tree" 
                    fill 
                    className={`${styles.smallTree} ${isGrowing ? styles.smallTreeHidden : ""}`}
                  />
                  
                  {/* Big Tree (Grown) */}
                  <Image 
                    src="/imgs/page2Day/bigTree.svg" 
                    alt="Big Tree" 
                    fill 
                    className={`${styles.bigTree} ${isGrowing ? styles.bigTreeActive : ""}`}
                  />

                  {/* Hints */}
                  <div className={`${styles.arrow} ${isGrowing ? styles.fadeOut : ""}`}>
                    <Image src="/imgs/page2Day/arrow.svg" alt="Arrow" fill />
                  </div>
                  <span className={`${styles.clickHint} ${isGrowing ? styles.fadeOut : ""}`}>
                    点击树苗
                  </span>
               </div>
            </div>

            <div className={styles.cloud3}>
              <Image src="/imgs/page2Day/cloud3.svg" alt="Cloud" fill />
            </div>

            <div className={styles.field}>
              <Image 
                src="/imgs/page2Day/field.png" 
                alt="Field" 
                fill 
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Night Mode (TODO)</div>
      )}
    </PageWrapper>
  );
}
