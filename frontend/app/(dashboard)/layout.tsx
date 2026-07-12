import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import FloatingAI from "@/components/layout/FloatingAI";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* <Header /> */}

        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </main>

      <FloatingAI />
    </div>
  );
}