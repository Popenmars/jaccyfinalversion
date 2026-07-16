"use client";

import { useState, useTransition } from "react";
import { Order } from "@/types";
import { updateOrderStatus } from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import { Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { OrderDetailModal } from "./OrderDetailModal";

const STATUS_LABELS: Record<string, string> = {
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function OrdersClient({ orders }: { orders: Order[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = orders.filter((o) => {
    const matchesFilter = statusFilter === "ALL" || o.status === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      o.orderRef.toLowerCase().includes(searchLower) || 
      o.customerName.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const handleFilter = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (orderId: string, status: string) => {
    startTransition(async () => {
      await updateOrderStatus(orderId, status);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-blue">Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">{filtered.length} orders</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Order ID or Customer Name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 font-medium">Filter:</span>
            {["ALL", ...Object.keys(STATUS_LABELS)].map((s) => (
              <button
                key={s}
                onClick={() => handleFilter(s)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  statusFilter === s
                    ? "bg-dark-blue text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {s === "ALL" ? "All" : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">Show:</span>
            {PAGE_SIZE_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => { setPageSize(n); setCurrentPage(1); }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  pageSize === n ? "bg-dark-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Order Ref</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Customer</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Total</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600 bg-gray-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                paginated.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-dark-blue">{order.orderRef}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-dark-blue">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 font-bold text-dark-blue">
                      ₦{order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        defaultValue={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={isPending}
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1.5 rounded-full border-none outline-none cursor-pointer",
                          STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"
                        )}
                      >
                        {Object.keys(STATUS_LABELS).map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-500 hover:text-blue hover:bg-blue/10 rounded-lg transition-all flex items-center gap-1.5 text-xs font-medium"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {start + 1}–{Math.min(start + pageSize, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronsLeft size={16} />
              </button>
              <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 py-1 text-sm font-medium">{currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronRight size={16} />
              </button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
