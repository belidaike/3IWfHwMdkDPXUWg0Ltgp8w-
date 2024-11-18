
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Define metadata at the top level
export const metadata = {
  title: 'Shop Smartly',

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
          <title>Your Website Title</title>
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
                <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
