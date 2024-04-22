import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasky",
  description:
    "Efficiently manage projects, tasks, and teams with our intuitive project management website. Streamline your workflow, track progress, allocate resources, and collaborate seamlessly. Whether you're a small team or a large enterprise, our platform offers powerful features to organize and prioritize your work, increase productivity, and achieve project success. Sign up now to experience simplified project management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
