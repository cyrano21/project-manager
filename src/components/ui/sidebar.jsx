import PropTypes from 'prop-types'
import { useState } from 'react'
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"
import { Home, LayoutDashboard, Users, Settings, Menu, X } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Projects", href: "/projects" },
  { icon: Users, label: "Team", href: "/team" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ className }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="grid gap-1 py-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                  "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <aside className="fixed left-0 top-0 z-30 hidden h-full w-[240px] flex-col border-r bg-background lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span className={cn("transition-opacity", isCollapsed ? "opacity-0" : "opacity-100")}>
              Project Manager
            </span>
          </a>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                  "text-muted-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <Button
            variant="outline"
            size="icon"
            className="ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
      </aside>
    </div>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
}
