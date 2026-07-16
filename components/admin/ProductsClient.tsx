"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { deleteProduct } from "@/app/actions/admin";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");

  // Get unique categories for the filter
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || product.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === "IN_STOCK") matchesStock = product.stockQuantity > 0;
    if (stockFilter === "OUT_OF_STOCK") matchesStock = product.stockQuantity <= 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-blue">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">{filteredProducts.length} products found</p>
        </div>
        <Link
          href="/admin/dashboard/products/new"
          className="flex items-center gap-2 bg-blue hover:bg-mid-blue text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-[0_4px_12px_rgba(0,92,255,0.25)]"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 font-medium mr-2">Category:</span>
            <button
              onClick={() => setCategoryFilter("ALL")}
              className={cn(
                "p-[0.45rem_1.2rem] rounded-[50px] border text-[0.875rem] font-medium cursor-pointer transition-all duration-200",
                categoryFilter === "ALL" 
                  ? "border-blue bg-blue text-white" 
                  : "border-[#e5e7eb] bg-white text-[#555] hover:border-blue hover:text-blue"
              )}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={cn(
                  "p-[0.45rem_1.2rem] rounded-[50px] border text-[0.875rem] font-medium cursor-pointer transition-all duration-200",
                  categoryFilter === c
                    ? "border-blue bg-blue text-white" 
                    : "border-[#e5e7eb] bg-white text-[#555] hover:border-blue hover:text-blue"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 font-medium mr-2">Stock:</span>
            {[
              { id: "ALL", label: "All Stock" },
              { id: "IN_STOCK", label: "In Stock" },
              { id: "OUT_OF_STOCK", label: "Out of Stock" }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStockFilter(s.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  stockFilter === s.id
                    ? "bg-dark-blue text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Product</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Price</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 bg-gray-50">Stock</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600 bg-gray-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No products found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-dark-blue line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue/10 text-blue text-xs font-semibold px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-dark-blue">₦{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
                          product.stockQuantity > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        )}
                      >
                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/products/${product.id}`}
                          className="p-2 text-gray-500 hover:text-blue hover:bg-blue/10 rounded-lg transition-all"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this product?")) {
                              await deleteProduct(product.id);
                            }
                          }}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
