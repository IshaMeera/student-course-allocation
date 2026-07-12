import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b px-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          Student Course Allocation System
        </h2>

        <p className="text-sm text-slate-500">
          AI Powered Admission Dashboard
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" />

        <UserCircle size={34} />
      </div>
    </header>
  );
}