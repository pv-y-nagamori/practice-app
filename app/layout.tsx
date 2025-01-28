import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, CssBaseline } from "@mui/material";
import { NextAuthProvider } from "./providers/nextauth";

import NavigationBar from "@/app/_components/navigationbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "next-app",
  description: "next-app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <NextAuthProvider>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <NavigationBar/>
            {children}
          </Box>
        </AppRouterCacheProvider>
      </body>
      </NextAuthProvider>
    </html>
  );
}