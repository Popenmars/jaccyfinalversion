export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, DollarSign } from "lucide-react";

async function getStats() {
  const [productCount, orderCount, totalRevenue, pendingOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.count({ where: { status: "Pending" } }),
  ]);

  return {
    productCount,
    orderCount,
    totalRevenue: totalRevenue._sum.total || 0,
    pendingOrders,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const statCards = [
    { label: "Total Products", value: stats.productCount, icon: Package, color: "bg-blue/10 text-blue" },
    { label: "Total Orders", value: stats.orderCount, icon: ShoppingCart, color: "bg-green-500/10 text-green-600" },
    {
      label: "Total Revenue",
      value: `₦${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-blue mb-1">Dashboard Overview</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back, Admin 👋</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-dark-blue mt-0.5">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
