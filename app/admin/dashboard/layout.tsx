import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <AdminSidebar />
      <main className="flex-1 md:ml-[260px] p-6 md:p-8 pt-16 md:pt-8">
        {children}
      </main>
    </div>
  );
}
