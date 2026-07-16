"use server";

import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types";

export async function createOrder(data: {
  customerName: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  instructions?: string;
  items: CartItem[];
  total: number;
}) {
  try {
    const orderRef = `JCY-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    await prisma.order.create({
      data: {
        orderRef,
        customerName: data.customerName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        address: data.address,
        city: data.city,
        state: data.state,
        instructions: data.instructions || null,
        products: JSON.parse(JSON.stringify(data.items)),
        total: data.total,
        status: "Pending",
      }
    });

    // Update stock
    await prisma.$transaction(
      data.items.map(item => 
        prisma.product.update({
          where: { id: item.product.id },
          data: {
            stockQuantity: {
              decrement: item.quantity
            }
          }
        })
      )
    );

    return { success: true, orderRef };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order. Please try again." };
  }
}
