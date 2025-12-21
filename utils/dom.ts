export function unhide(el: Element | null | undefined) {
  if (!el) return;
  (el as HTMLElement).classList.remove("hide");
}

export function unhideAll(page_num: number, queries: string[]) {
  queries.forEach((query) => {
    const query_els = document.querySelectorAll(`.page${page_num} ${query}`);
    if (query_els) {
      query_els.forEach((el) => {
        unhide(el);
      });
    }
  });
}

export async function sendViewPageTracking(page_num: number) {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") || "";
    const body = new URLSearchParams({ token, page: String(page_num) });
    await fetch("https://api.uuunnniii.com/v4/report2024/record.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch (e) {
    // 静默失败，保持与 2024 行为一致
    console.warn("sendViewPageTracking failed", e);
  }
}

