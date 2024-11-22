/* eslint-disable */
import { cn } from '../../lib/utils'
import {
  Home,
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  Plus,
  FileText,
} from 'lucide-react'
import { Button } from '../ui/button'
import PropTypes from 'prop-types'
import { Logo } from '../ui/logo'

const menuItems = [
  {
    title: "Home",
    icon: Home,
    id: "home",
  },
  {
    title: "Create new",
    icon: Plus,
    id: "create",
  },
  {
    title: "Project list view",
    icon: CheckSquare,
    id: "list",
  },
  {
    title: "Project card view",
    icon: LayoutDashboard,
    id: "card",
  },
  {
    title: "Project board view",
    icon: LayoutDashboard,
    id: "board",
  },
  {
    title: "Project details",
    icon: FileText,
    id: "details",
  },
  {
    title: "Todo list",
    icon: CheckSquare,
    id: "todo",
  },
  {
    title: "Team",
    icon: Users,
    id: "team",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
];

export function Sidebar({ activeView, onViewChange, onCreateNew }) {
  return (
    <aside className="w-64 border-r border-border bg-background transition-colors">
      <div className="p-4">
        <Logo className="mb-6" />
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent",
                activeView === item.id && "bg-accent text-foreground"
              )}
              onClick={() => {
                if (item.id === 'create') {
                  onCreateNew?.()
                } else {
                  onViewChange?.(item.id)
                }
              }}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.title}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  activeView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  onCreateNew: PropTypes.func.isRequired,
}
