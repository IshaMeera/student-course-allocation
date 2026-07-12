"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Settings2,
  BarChart3,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    href: "/students",
    icon: GraduationCap,
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "Allocation",
    href: "/allocation",
    icon: Settings2,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="h-20 flex items-center px-6 border-b">
        <h1 className="text-xl font-bold">
         CourseAI
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  active
                    ? "bg-gray-100 text-black"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}