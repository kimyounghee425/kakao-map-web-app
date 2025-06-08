// 웹뷰 감지기

export const isInsideWebView = (): boolean => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("from") === "app";
};
