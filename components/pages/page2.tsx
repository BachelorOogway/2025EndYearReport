"use client";
import { useState } from "react";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import usePageManager from "@/hooks/usePageManager";
import styles from "./styles/page2.module.css";

export default function Page2() {
  const PAGE_NUMBER = 2;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { appendNextPage } = usePageManager();
  // 暂时强制显示 Night 模式以还原设计稿
  const [variant] = useState<"day" | "night">("night"); 
  const [isGrowing, setIsGrowing] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleTreeClick = () => {
    if (!isGrowing) {
      setIsGrowing(true);
    }
  };

  function onShow() {
    // 触发重绘以重置 CSS 动画
    setAnimKey(prev => prev + 1);
  }

  return (
    <PageWrapper pageNumber={PAGE_NUMBER} onShow={onShow}>
      {/* 使用 key 强制重新挂载/重置动画状态 */}
      <div key={animKey} style={{ width: '100%', height: '100%' }}>
        {variant === "day" ? (
          <div className={styles.container}>
            {/* Top Cloud */}
            <div className={styles.cloud1}>
              <Image 
                src="/imgs/page2/page2Day/cloud1.svg" 
                alt="Cloud" 
                fill 
                className={styles.objectContain}
              />
            </div>

            {/* Text Group 1 */}
            <div className={styles.textGroup1}>
              <div 
                className={`${styles.greetingRow} reveal-line`}
                style={{ '--order': 1 } as React.CSSProperties}
              >
                <span className={styles.fontPrimary}>嘿！</span>
                <span className={styles.fontPrimary}>【用户名称】</span>
              </div>
              <span 
                className={`${styles.fontPrimary} reveal-line`}
                style={{ '--order': 2 } as React.CSSProperties}
              >
                你的25-26年度旅程即将开启——
              </span>
            </div>

            {/* Text Group 2 */}
            <div className={styles.textGroup2}>
              <span 
                className={`${styles.fontPrimary} reveal-line`}
                style={{ '--order': 3 } as React.CSSProperties}
              >
                阳光正好
              </span>
              <span 
                className={`${styles.fontPrimary} reveal-line`}
                style={{ '--order': 4 } as React.CSSProperties}
              >
                一起来回顾你的成长吧！
              </span>
            </div>

            {/* Visual Area */}
            <div className={styles.visualArea}>
              <div className={styles.cloud2}>
                <Image src="/imgs/page2/page2Day/cloud2.svg" alt="Cloud" fill />
              </div>

              <div className={styles.sun}>
                 <div 
                   className={styles.treeWrapper} 
                   onClick={handleTreeClick}
                   data-next-ignore="true"
                 >
                    {/* Small Tree (Sapling) */}
                    <Image 
                      src="/imgs/page2/tree.svg" 
                      alt="Small Tree" 
                      fill 
                      className={`${styles.smallTree} ${isGrowing ? styles.smallTreeHidden : ""}`}
                    />
                    
                    {/* Big Tree (Grown) */}
                    <Image 
                      src="/imgs/page2/page2Day/bigTree.svg" 
                      alt="Big Tree" 
                      fill 
                      className={`${styles.bigTree} ${isGrowing ? styles.bigTreeActive : ""}`}
                    />

                    {/* Hints */}
                    <div className={`${styles.arrow} ${isGrowing ? styles.fadeOut : ""}`}>
                      <Image src="/imgs/page2/arrow.svg" alt="Arrow" fill />
                    </div>
                    <span className={`${styles.clickHint} ${isGrowing ? styles.fadeOut : ""}`}>
                      点击树苗
                    </span>
                 </div>
              </div>

              <div className={styles.cloud3}>
                <Image src="/imgs/page2/page2Day/cloud3.svg" alt="Cloud" fill />
              </div>

              <div className={styles.field}>
                <Image 
                  src="/imgs/page2/field.png" 
                  alt="Field" 
                  fill 
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.nightContainer}>
            {/* Background */}
            <div className={styles.nightBackground}>
              <Image 
                src="/imgs/page2/page2Night/background.png" 
                alt="Night Background" 
                fill 
                style={{ objectFit: "cover" }} 
              />
            </div>

            {/* Text Group */}
            <div className={styles.nightTextGroup}>
              <div className={styles.nightTextBlock}>
                 <div 
                   className={`${styles.greetingRow} reveal-line`}
                   style={{ '--order': 1 } as React.CSSProperties}
                 >
                    <span className={styles.fontNight}>嘿！</span>
                    <span className={styles.fontNight}>【用户名称】</span>
                 </div>
                 <span 
                   className={`${styles.fontNight} reveal-line`}
                   style={{ '--order': 2 } as React.CSSProperties}
                 >
                   你的25-26年度旅程即将开启——
                 </span>
              </div>
              
              <div className={styles.nightTextBlock}>
                 <span 
                   className={`${styles.fontNight} reveal-line`}
                   style={{ '--order': 3 } as React.CSSProperties}
                 >
                   夜深了
                 </span>
                 <span 
                   className={`${styles.fontNight} reveal-line`}
                   style={{ '--order': 4 } as React.CSSProperties}
                 >
                   准备好回顾这一年了吗？
                 </span>
              </div>
            </div>

            {/* Visual Area */}
            <div className={styles.visualArea}>
               <div className={styles.nightTreeContainer}>
                  <div 
                     className={styles.treeWrapper} 
                     onClick={handleTreeClick}
                     data-next-ignore="true"
                  >
                      {/* Small Tree (Sapling) - Same as Day */}
                      <Image 
                        src="/imgs/page2/tree.svg" 
                        alt="Small Tree" 
                        fill 
                        className={`${styles.smallTree} ${isGrowing ? styles.smallTreeHidden : ""}`}
                      />
                      
                      {/* Big Tree Night */}
                      <Image 
                        src="/imgs/page2/page2Night/bigTreeNight.svg" 
                        alt="Big Tree Night" 
                        fill 
                        className={`${styles.bigTree} ${isGrowing ? styles.bigTreeActive : ""}`}
                      />

                      {/* Hints */}
                      <div className={`${styles.arrow} ${isGrowing ? styles.fadeOut : ""}`}>
                        <Image src="/imgs/page2/arrow.svg" alt="Arrow" fill />
                      </div>
                      <span 
                        className={`${styles.clickHint} ${isGrowing ? styles.fadeOut : ""}`}
                        style={{ color: '#fff' }}
                      >
                        点击树苗
                      </span>
                  </div>
               </div>

               <div className={styles.field}>
                  <Image 
                    src="/imgs/page2/field.png" 
                    alt="Field" 
                    fill 
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
               </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
