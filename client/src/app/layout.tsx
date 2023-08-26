import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Chat App",
  description:
    "A simple chat app built using NextJS Typescript and Upstash Redis database.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
