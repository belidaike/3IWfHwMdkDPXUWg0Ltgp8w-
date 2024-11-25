import * as React from "react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { navData } from "./data/navData";
import Image from "next/image";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-auto w-[70px] h-[50px] items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <Image
                    src="/logo.png"
                    alt="Shop Smartly Logo"
                    width={50}
                    height={50}
                    className="w-full h-auto object-contain rounded-lg"
                    priority={true}
                  />
                </div>
                <div className="flex flex-col leading-none font-roboto">
                  <span className="font-semibold text-lg ">Shop</span>
                  <span className="text-lg">&nbsp;Smartly</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navData.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton aria-expanded={index === 0}>
                      <Link href={item.url}>{item.title}{" "}</Link>
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.subcategories?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subcategories.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {/* <div className="mt-auto p-4">
          <Card className="">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Support Our Mission</CardTitle>
              <CardDescription>
                <span className="text-xs"> This website is free to use, and your support helps us continue providing valuable content and services.
                  Every contribution, no matter how small, makes a difference. Thank you for considering supporting us!</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
             Dialog Trigger for Donation Modal
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">Donate Now</Button>
                </DialogTrigger>
               Dialog Content
                <DialogContent className="text-center">
                  <DialogHeader>
                    <DialogTitle>Donate via GCash</DialogTitle>
                    <DialogDescription>
                      Your support helps us continue providing valuable content. Thank you!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                 Replace with your GCash QR Code 
                    <Image
                      src="/path-to-your-gcash-qr-code.png"
                      alt="GCash QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                    <p className="mt-4 text-lg font-semibold">
                      GCash Number: <span className="text-blue-500">0917-123-4567</span>
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}