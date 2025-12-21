import Layout from "@/components/layout";
import Pages from "@/components/Pages";
import PageManagerProvider from "@/components/PageManagerProvider";

export default function Home() {
  return (
    <Layout>
      <PageManagerProvider>
        {/* 背景音乐（复制2024行为） */}
        <audio id="bgm" src="/audio/bgm.mp3" preload="auto" loop />
        <div className="pages-wrapper" id="pages-wrapper">
          <Pages />
        </div>
      </PageManagerProvider>
    </Layout>
  );
}
