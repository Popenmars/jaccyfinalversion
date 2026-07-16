"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    redirect("/admin/dashboard");
  }

  return { error: "Invalid username or password." };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  image: string;
}) {
  await prisma.product.create({
    data: {
      ...data,
      inStock: data.stockQuantity > 0,
    },
  });
  redirect("/admin/dashboard/products");
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    image: string;
  }
) {
  await prisma.product.update({
    where: { id },
    data: {
      ...data,
      inStock: data.stockQuantity > 0,
    },
  });
  redirect("/admin/dashboard/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  redirect("/admin/dashboard/products");
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function updateOrderStatus(id: string, status: string) {
  await prisma.order.update({
    where: { id },
    data: { status },
  });
}
