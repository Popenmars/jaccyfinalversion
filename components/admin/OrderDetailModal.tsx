"use client";

import { Order } from "@prisma/client";
import { X, MapPin, Phone, MessageCircle, Package } from "lucide-react";
import { CartItem } from "@/types";

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const items = order.products as unknown as CartItem[];

  return (
    <div className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-dark-blue">Order Details</h2>
            <p className="text-blue font-mono text-sm mt-0.5">{order.orderRef}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2.5">
            <h3 className="font-semibold text-dark-blue text-sm mb-1">Customer Information</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package size={15} className="text-gray-400 flex-shrink-0" />
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={15} className="text-gray-400 flex-shrink-0" />
              <a href={`tel:${order.phone}`} className="hover:text-blue transition-colors">{order.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MessageCircle size={15} className="text-green-500 flex-shrink-0" />
              <a
                href={`https://wa.me/${order.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600 transition-colors"
              >
                WhatsApp: {order.whatsapp}
              </a>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <span>{order.address}, {order.city}, {order.state}</span>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-dark-blue text-sm mb-3">Items Ordered</h3>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-dark-blue">{item.product?.name || "Product"}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm text-dark-blue">
                    ₦{((item.product?.price || 0) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between bg-dark-blue text-white rounded-xl px-5 py-3">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">₦{order.total.toLocaleString()}</span>
          </div>

          {/* Instructions */}
          {order.instructions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-800 text-sm mb-1">Special Instructions</h3>
              <p className="text-yellow-700 text-sm">{order.instructions}</p>
            </div>
          )}

          {/* Date */}
          <p className="text-xs text-gray-400 text-right">
            Placed on {new Date(order.createdAt).toLocaleString("en-NG")}
          </p>
        </div>
      </div>
    </div>
  );
}
