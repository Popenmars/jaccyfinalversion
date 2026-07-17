"use client"

import Image from "next/image"
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

const LandingNavLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 3, name: "Shop", href: "/shop" },
    { id: 4, name: "Contact", href: "/contact" },
]

export const LandingNav = () => {
    const [open, setOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

    const { state } = useCart();
    const cartItemsCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="fixed z-[1000] top-0 flex w-full h-[90px] max-[900px]:h-[100px] justify-between items-center bg-light-blue shadow-[0_8px_20px_#00000040]">
            <div
                onClick={() => router.push("/")}
                className="w-[150px] h-[90px] p-[20px] max-[900px]:w-[200px] cursor-pointer"
            >
                <Image
                    src="/logo.png"
                    width={300}
                    height={300}
                    alt="logo"
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex items-center">
                <nav className={cn(
                    "w-fit flex justify-center items-center p-[20px] gap-[30px]",
                    "max-[900px]:absolute max-[900px]:flex-col max-[900px]:left-0 max-[900px]:right-0 max-[900px]:w-full max-[900px]:bg-light-blue max-[900px]:transition-all max-[900px]:duration-500 max-[900px]:shadow-[0_8px_20px_#00000040] max-[900px]:items-center",
                    open ? "max-[900px]:top-[100px]" : "max-[900px]:top-[-1200px]"
                )}>
                    <ul className="flex gap-[20px] mt-[10px] max-[900px]:flex-col">
                        {LandingNavLinks.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.id} className="inline-block">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-blue no-underline pb-[5px] border-b-2 transition-colors duration-300",
                                            "hover:text-mid-blue hover:border-dark-blue",
                                            isActive ? "border-dark-blue text-dark-blue" : "border-transparent"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {/* <button
                        onClick={() => (window.location.href = "/register")}
                        className="inline-block h-[50px] w-[120px] bg-dark-blue text-[#f0f8ff] rounded-[5px] hover:bg-mid-blue transition-colors"
                    >
                        Get started
                    </button> */}
                </nav>

                <div className="flex items-center gap-[10px] mr-[20px] ml-[20px]">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-dark-blue flex items-center justify-center p-[10px] cursor-pointer bg-transparent border-none hover:text-blue transition-colors"
                    >
                        <ShoppingCart size={24} strokeWidth={2} />
                        {cartItemsCount > 0 && (
                            <span className="absolute top-[2px] right-[2px] bg-blue text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setOpen((s) => !s)}
                        className="hidden max-[900px]:flex bg-transparent border-none w-[50px] h-[50px] cursor-pointer p-[10px] text-dark-blue items-center justify-center"
                    >
                        {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
                    </button>
                </div>
            </div>

            <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
        </header>
    )
}
