export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import OrdersClient from "@/components/admin/OrdersClient";

async function getOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return orders;
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return <OrdersClient orders={orders} />;
}
