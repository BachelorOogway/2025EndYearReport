"use client";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import usePageManager from "@/hooks/usePageManager";
import styles from "./styles/page1.module.css";

export default function Page1() {
  const PAGE_NUMBER = 1;
  const { appendNextPage } = usePageManager();

  return (
    <PageWrapper pageNumber={PAGE_NUMBER}>
      <div className={styles.container}>
        {/* Background Image */}
        <div className={styles.bg}>
          <Image
            src="/imgs/page1/封面1.png"
            alt="Page 1 Background"
            fill
            className={styles.objectCover}
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className={styles.content}>
          <div className={styles.titleCard}>
            <div className={styles.titleHeader}>
              <h1 className={styles.titleEn}>TRIPLE UNI</h1>
              <h2 className={styles.titleCn}>年度总结</h2>
            </div>
            <div className={styles.schoolList}>
              <div className={`${styles.schoolBadge} ${styles.cuhk}`}>CUHK</div>
              <div className={`${styles.schoolBadge} ${styles.hku}`}>HKU</div>
              <div className={`${styles.schoolBadge} ${styles.hkust}`}>HKUST</div>
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.startBtn} onClick={() => appendNextPage(PAGE_NUMBER, true)}>
              <span className={styles.startBtnText}>立即开启</span>
            </button>
            <p className={styles.privacy}>点击即代表您同意隐私政策</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
