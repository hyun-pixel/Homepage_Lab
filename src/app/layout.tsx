import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLOWAX SPACE | Before We Arrive",
  description:
    "AI와 자율 로봇이 인간보다 먼저 새로운 세계를 준비하는 FLOWAX SPACE의 시네마틱 웹 경험.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
