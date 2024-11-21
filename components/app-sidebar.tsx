import * as React from "react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Button } from "./ui/button";

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
        <div className="mt-auto p-4">
          <Card className="">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Donate Here</CardTitle>
              <CardDescription>This website is free if you want to support any amount would be appriciated.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">Donate</Button>
            </CardContent>
          </Card>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
