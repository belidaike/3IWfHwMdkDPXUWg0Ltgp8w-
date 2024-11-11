import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});


// export const metadata: Metadata = {
//   title: "Shop Smartly",
//   description: "Shop smart today!",
// };

export const metadata: Metadata = {
  // metadataBase: new URL('https://myaffiliatesitesoon.com'),
  title: {
    default: 'Shop Smartly',
    template: `%s | Shop Smartly`
  },
  openGraph: {
    description: 'Learn to code && have fun doing it.'
  }
}
interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="roboto.className">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center  gap-2 border-b px-4 ">
                  <span className="flex items-center">
                    <SidebarTrigger className="-ml-1 px-4 mr-2" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </span>
                  <div className="flex w-full items-center justify-between">
                    <form className="flex justify-center w-full md:w-2/3 lg:w-1/3 mr-4">
                      <div className="relative w-full">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="w-full pl-8 appearance-none bg-background shadow-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </form>
                    <ModeToggle />
                  </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4">
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}