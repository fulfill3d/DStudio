import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ReduxProvider from "@/components/common/redux-provider";

export const metadata: Metadata = {
  title: "DStudio",
  description: "dstudio.fulfill3d.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ReduxProvider>
        {children}
      </ReduxProvider>
      </body>
    </html>
  );
}
