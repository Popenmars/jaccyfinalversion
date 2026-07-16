export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import type { Product } from "@/types";
import ProductsClient from "@/components/admin/ProductsClient";

async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <ProductsClient products={products} />
  );
}
