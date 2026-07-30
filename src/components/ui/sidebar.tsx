// ==================== CUSTOM APPSIDEBAR WITH LOGO ====================
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                {/* public/favicon.ico লোগোটি এখানে রেন্ডার হবে */}
                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img
                    src="/favicon.ico"
                    alt="Lablink Logo"
                    className="size-6 object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Lablink</span>
                  <span className="text-xs text-muted-foreground">v1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* এখানে আপনার সাইডবারের মূল মেনু আইটেমগুলো থাকবে */}
      </SidebarContent>

      <SidebarFooter>
        {/* ফুটার যদি কিছু থাকে */}
      </SidebarFooter>
    </Sidebar>
  );
}
