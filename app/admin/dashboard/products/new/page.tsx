import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/dashboard/products"
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-dark-blue mb-6 transition-colors w-fit"
      >
        <ChevronLeft size={16} />
        Back to Products
      </Link>
      <h1 className="text-2xl font-bold text-dark-blue mb-6">Add New Product</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <ProductForm />
      </div>
    </div>
  );
}
