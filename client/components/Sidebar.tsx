import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Plus,
  Building2,
  BarChart3,
  Users,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Tickets",
      icon: Ticket,
      path: "/tickets",
    },
    {
      label: "Create Ticket",
      icon: Plus,
      path: "/tickets/create",
      highlight: true,
    },
    {
      label: "Properties",
      icon: Building2,
      path: "/properties",
    },
    {
      label: "Reports",
      icon: BarChart3,
      path: "/reports",
    },
    {
      label: "User Management",
      icon: Users,
      path: "/users",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static h-screen bg-white shadow-soft flex flex-col transition-all duration-300 z-50 ${
          isCollapsed ? "md:w-20 w-64" : "w-64"
        } ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div
          className={`px-6 h-[73px] border-b border-gray-200 flex items-center justify-between transition-all ${
            isCollapsed ? "md:px-2" : ""
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">MH</span>
            </div>
            <div
              className={`transition-all duration-300 whitespace-nowrap ${
                isCollapsed ? "md:opacity-0 md:w-0 md:hidden" : "opacity-100"
              }`}
            >
              <p className="font-bold text-gray-900 text-sm">MaintenanceHub</p>
              <p className="text-xs text-gray-500">Property Management</p>
            </div>
          </div>
          <button
            onClick={toggleCollapse}
            className="hidden md:flex text-gray-400 hover:text-gray-600 p-0.5 hover:bg-gray-100 rounded transition-colors shrink-0"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className={`flex-1 space-y-2 overflow-y-auto ${isCollapsed ? "p-2" : "p-4"}`}>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.path;
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setOpen(false)}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center rounded-lg transition-colors ${
                  isCollapsed
                    ? "md:justify-center md:p-3 md:mx-auto md:w-12 md:h-12 gap-3 px-4 py-3"
                    : "gap-3 px-4 py-3"
                } ${
                  item.highlight
                    ? "bg-brand-primary text-white hover:bg-blue-700"
                    : isActive
                      ? "bg-blue-50 text-brand-primary"
                      : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span
                  className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-gray-200 space-y-2 ${isCollapsed ? "p-2" : "p-4"}`}>
          <button
            title={isCollapsed ? "Sign Out" : undefined}
            onClick={() => navigate("/login")}
            className={`w-full flex items-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors ${
              isCollapsed
                ? "md:justify-center md:p-3 md:mx-auto md:w-12 md:h-12 gap-3 px-4 py-3"
                : "gap-3 px-4 py-3"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span
              className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
              }`}
            >
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
