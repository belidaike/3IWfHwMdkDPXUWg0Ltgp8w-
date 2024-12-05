
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { PostProvider } from "@/contexts/PostContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shop Smartly - Your Trusted Lazada Big Discount Website",
    template: "%s | Shop Smartly - Your Trusted Lazada Big Discount Website"
  },
  description: 'Find the best deals on the latest gadgets, beauty, and home essentials.',
  openGraph: {
    siteName: "5hop5marty",
    url: "https://yourwebsite.com/tech-gadgets",
  }
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" type="image/png" />
        </head>
        <body className={roboto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <span className="flex items-center">
                    <SidebarTrigger className="-ml-1 px-4 mr-2" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </span>
                  <div className="flex w-full items-center justify-end">
                    <ModeToggle />
                  </div>
                </header>
                <PostProvider>
                  <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
                </PostProvider>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
          <Toaster />
          <footer className="p-4 bg-gray-200 text-center dark:bg-gray-900 dark:text-white">
            <a href="/tech-gadgets" className="mx-2">Tech Gadgets</a>
            {/* <a href="/tech-gadgets/beauty" className="mx-2">Beauty</a> | */}
            {/* <a href="/tech-gadgets/home-essentials" className="mx-2">Home Essentials</a> */}
            <p>&copy; 2024 Shop Smartly. All rights reserved.</p>
          </footer>
        </body>
      </html >
    </>
  );
}
