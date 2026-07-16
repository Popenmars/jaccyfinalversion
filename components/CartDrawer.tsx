"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutModal } from "./CheckoutModal";

export function CartDrawer({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const { state, dispatch } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const cartTotal = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const CartContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          state.items.map((item) => (
            <div key={item.product.id} className="flex gap-4 items-center bg-white p-3 rounded-lg shadow-sm border">
              <Image src={item.product.image || "/logo.png"} width={60} height={60} alt={item.product.name} className="rounded-md object-cover bg-gray-100" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm line-clamp-1">{item.product.name}</h4>
                <p className="text-sm font-bold text-blue">₦{item.product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => dispatch({ type: "DECREMENT", payload: item.product.id })} className="p-1 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button onClick={() => dispatch({ type: "INCREMENT", payload: item.product.id })} className="p-1 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.product.id })} className="text-red-500 hover:text-red-700 p-2">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
      {state.items.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-600">Total</span>
            <span className="font-bold text-lg text-dark-blue">₦{cartTotal.toLocaleString()}</span>
          </div>
          <Button className="w-full bg-blue hover:bg-mid-blue text-white" onClick={() => { setOpen(false); setIsCheckoutOpen(true); }}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isDesktop ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="w-[400px] sm:max-w-md p-0 flex flex-col">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>Review your items before checkout.</SheetDescription>
            </SheetHeader>
            <CartContent />
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[80vh] flex flex-col">
            <DrawerHeader className="border-b">
              <DrawerTitle>Your Cart</DrawerTitle>
              <DrawerDescription>Review your items before checkout.</DrawerDescription>
            </DrawerHeader>
            <CartContent />
          </DrawerContent>
        </Drawer>
      )}
      <CheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  );
}
