"use client";

import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
    const { dispatch } = useCart();
    const isOutOfStock = !product.inStock || product.stockQuantity < 1;

    // "Added" feedback state for the card button
    const [cardAdded, setCardAdded] = useState(false);
    // "Added" feedback state for the modal button
    const [modalAdded, setModalAdded] = useState(false);

    const handleAddToCart = useCallback(
        (setAdded: (v: boolean) => void) => {
            dispatch({ type: "ADD_ITEM", payload: product as Product });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        },
        [dispatch, product]
    );

    return (
        <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] h-full">
            <div className="h-[250px] bg-[#f0f0f0] relative overflow-hidden group">
                <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {isOutOfStock ? (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                            Out of Stock
                        </span>
                    ) : (
                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                            {product.stockQuantity} in Stock
                        </span>
                    )}
                </div>
            </div>

            <div className="p-[1.5rem] flex-1 flex flex-col pb-0">
                <span className="text-[0.8rem] text-blue font-semibold uppercase mb-[0.5rem]">{product.category}</span>
                <h3 className="text-[1.1rem] text-dark-blue font-semibold mb-[0.5rem] leading-[1.4] line-clamp-2">{product.name}</h3>
                <span className="text-[1.2rem] font-bold text-[#333] mt-auto pb-4">₦{product.price.toLocaleString()}</span>
            </div>

            <div className="p-[0_1.5rem_1.5rem_1.5rem] flex gap-2">
                <Dialog>
                    <DialogTrigger className="flex-1 p-[0.75rem] border-2 border-blue text-blue bg-white rounded-[10px] font-semibold hover:bg-blue/10 transition-colors flex items-center justify-center gap-2">
                        <Eye size={18} />
                        View
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden bg-white rounded-2xl gap-0 border-none">
                        <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                            <div className="w-full md:w-[45%] h-[250px] md:h-auto bg-[#f0f0f0] relative">
                                <Image
                                    src={product.image || "/placeholder.png"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                                {isOutOfStock ? (
                                    <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                                        Out of Stock
                                    </span>
                                ) : (
                                    <span className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                                        {product.stockQuantity} in Stock
                                    </span>
                                )}
                            </div>
                            <div className="w-full md:w-[55%] p-8 flex flex-col overflow-y-auto relative">
                                <DialogHeader className="mb-2 text-left pr-8">
                                    <span className="text-[0.85rem] text-blue font-bold uppercase tracking-wider mb-2 block">{product.category}</span>
                                    <DialogTitle className="text-[1.8rem] text-dark-blue font-bold leading-[1.2]">{product.name}</DialogTitle>
                                </DialogHeader>

                                <div className="text-[2rem] font-bold text-[#333] mb-6">₦{product.price.toLocaleString()}</div>

                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                                    <DialogDescription className="text-[1rem] text-[#555] leading-[1.6] whitespace-pre-line">
                                        {product.description}
                                    </DialogDescription>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(setModalAdded);
                                        }}
                                        disabled={isOutOfStock}
                                        className={cn(
                                            "w-full p-[1rem] border-none rounded-[12px] font-bold cursor-pointer transition-all duration-300 text-[1.1rem] flex items-center justify-center gap-3",
                                            isOutOfStock
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : modalAdded
                                                    ? "bg-green-500 text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)]"
                                                    : "bg-blue text-white hover:bg-mid-blue shadow-[0_8px_20px_rgba(0,92,255,0.25)] hover:shadow-[0_12px_25px_rgba(0,92,255,0.35)] hover:-translate-y-[2px]"
                                        )}
                                    >
                                        {modalAdded ? <Check size={22} /> : <ShoppingCart size={22} />}
                                        {isOutOfStock ? "Out of Stock" : modalAdded ? "Added!" : "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(setCardAdded);
                    }}
                    disabled={isOutOfStock}
                    className={cn(
                        "flex-[2] p-[0.75rem] border-none rounded-[10px] font-semibold cursor-pointer transition-colors duration-200 text-[0.95rem] flex items-center justify-center gap-2",
                        isOutOfStock
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : cardAdded
                                ? "bg-green-500 text-white shadow-[0_4px_10px_rgba(34,197,94,0.3)]"
                                : "bg-blue text-white hover:bg-mid-blue shadow-[0_4px_10px_rgba(0,92,255,0.2)] hover:shadow-[0_6px_15px_rgba(0,92,255,0.3)]"
                    )}
                >
                    {cardAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                    {isOutOfStock ? "Sold Out" : cardAdded ? "Added!" : "Add"}
                </button>
            </div>
        </div>
    );
};
