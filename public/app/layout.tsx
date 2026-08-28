import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mây Mây — AI đồng hành cảm xúc",
  description: "Một nơi dịu dàng để trò chuyện, gỡ rối và được lắng nghe.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
