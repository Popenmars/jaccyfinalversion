"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProduct, updateProduct } from "@/app/actions/admin";
import { useTransition, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 chars"),
  price: z.coerce.number().positive("Price must be positive"),
  stockQuantity: z.coerce.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(2, "Category is required"),
  image: z.string().url("A valid image URL is required"),
});

type ProductFormValues = z.infer<typeof ProductSchema>;

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    image: string;
  };
}

export const ProductForm = ({ product }: ProductFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues, unknown, ProductFormValues>({
    resolver: zodResolver(ProductSchema) as never,
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      stockQuantity: product?.stockQuantity || 0,
      category: product?.category || "",
      image: product?.image || "",
    },
  });

  const imageValue = watch("image");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "jaccy_gadgets"
      );
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setValue("image", data.secure_url, { shouldValidate: true });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    startTransition(async () => {
      if (product) {
        await updateProduct(product.id, values);
      } else {
        await createProduct(values);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-1.5">
        <Label>Product Name</Label>
        <Input {...register("name")} disabled={isPending} placeholder="e.g. Wireless Headphones" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea {...register("description")} disabled={isPending} rows={4} placeholder="Product description..." />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Price (₦)</Label>
          <Input {...register("price")} type="number" step="0.01" disabled={isPending} />
          {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Stock Quantity</Label>
          <Input {...register("stockQuantity")} type="number" disabled={isPending} />
          {errors.stockQuantity && <p className="text-red-500 text-xs">{errors.stockQuantity.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Category</Label>
        <Input {...register("category")} disabled={isPending} placeholder="e.g. Phones, Accessories" />
        {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Product Image</Label>
        {imageValue ? (
          <div className="relative w-full h-52 rounded-xl overflow-hidden border bg-gray-50">
            <Image src={imageValue} alt="Product preview" fill className="object-contain p-2" />
            <button
              type="button"
              onClick={() => setValue("image", "", { shouldValidate: true })}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue hover:bg-blue/5 transition-all">
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Loader2 size={24} className="animate-spin text-blue" />
                <span className="text-sm">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={28} />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs">PNG, JPG, WEBP up to 10MB</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        )}
        <Input {...register("image")} type="url" placeholder="Or paste image URL directly" disabled={isPending} />
        {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
      </div>

      <Button type="submit" disabled={isPending || uploading} className="bg-dark-blue hover:bg-mid-blue w-fit px-8">
        {isPending && <Loader2 className="animate-spin mr-2" size={16} />}
        {product ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
};
