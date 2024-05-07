"use client";
import HomeNavbar from "@/components/HomeNavbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div>
      <HomeNavbar pathname={pathname} />
      {children}
    </div>
  );
}
