"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/actions/checkout";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  whatsapp: z.string().min(10, "Valid WhatsApp number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  instructions: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { state, dispatch } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const cartTotal = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const onSubmit = async (data: CheckoutFormValues) => {
    if (state.items.length === 0) return;
    setIsSubmitting(true);

    const result = await createOrder({
      ...data,
      items: state.items,
      total: cartTotal,
    });

    if (result.success && result.orderRef) {
      setOrderRef(result.orderRef);
      setSuccess(true);
      
      const productList = state.items.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
      const message = `Hello Jaacyy's Gadgets! I just placed an order.\n\n*Order Ref:* ${result.orderRef}\n*Items:* ${productList}\n*Total:* ₦${cartTotal.toLocaleString()}`;
      setWhatsappMessage(message);

      dispatch({ type: "CLEAR_CART" });
      reset();
    } else {
      alert(result.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  const handleWhatsAppRedirect = () => {
    const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "2347040168887";
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
    onOpenChange(false);
    setSuccess(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        if (!isSubmitting) onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{success ? "Order Successful!" : "Checkout"}</DialogTitle>
          <DialogDescription>
            {success
              ? "Your order has been placed successfully."
              : "Please enter your details to complete your order."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-2">
              ✓
            </div>
            <h3 className="font-bold text-xl text-dark-blue">Order Placed!</h3>
            <p className="text-gray-600">
              Your reference code is: <span className="font-bold text-blue">{orderRef}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Please click the button below to send us a message on WhatsApp to confirm your order and delivery details.
            </p>
            <Button onClick={handleWhatsAppRedirect} className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white">
              Continue to WhatsApp
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="customerName">Full Name</Label>
                <Input id="customerName" {...register("customerName")} placeholder="John Doe" />
                {errors.customerName && <p className="text-red-500 text-xs">{errors.customerName.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} placeholder="08012345678" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" {...register("whatsapp")} placeholder="08012345678" />
              {errors.whatsapp && <p className="text-red-500 text-xs">{errors.whatsapp.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address">Delivery Address</Label>
              <Input id="address" {...register("address")} placeholder="123 Main St, Ikeja" />
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} placeholder="Ikeja" />
                {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register("state")} placeholder="Lagos" />
                {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="instructions">Order Instructions (Optional)</Label>
              <Textarea id="instructions" {...register("instructions")} placeholder="Any special delivery instructions?" rows={3} />
            </div>

            <div className="border-t pt-4 mt-2 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total to Pay:</span>
                <span className="font-bold text-xl text-dark-blue">₦{cartTotal.toLocaleString()}</span>
              </div>
              <Button type="submit" className="w-full bg-blue hover:bg-mid-blue" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
