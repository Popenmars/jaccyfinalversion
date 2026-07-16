"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopBrowserProps {
    categories: string[];
    currentCategory?: string;
    currentSearch?: string;
}

export const ShopBrowser = ({
    categories,
    currentCategory,
    currentSearch,
}: ShopBrowserProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState(currentSearch ?? "");

    const navigate = (params: Record<string, string | undefined>) => {
        const sp = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([k, v]) => {
            if (v) sp.set(k, v);
            else sp.delete(k);
        });
        startTransition(() => {
            router.push(`/shop?${sp.toString()}`);
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate({ search: searchValue || undefined, category: currentCategory });
    };

    return (
        <div className="mb-[2rem]">
            {/* Search bar */}
            <form
                onSubmit={handleSearch}
                className="flex mb-[1.25rem] max-w-[480px] mx-auto"
            >
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search products…"
                    className="flex-1 p-[0.7rem_1rem] border border-[#d1d5db] border-r-0 rounded-[8px_0_0_8px] outline-none text-[0.95rem] text-dark-blue"
                />
                <button
                    type="submit"
                    className="p-[0.7rem_1.25rem] bg-blue text-white border-none rounded-[0_8px_8px_0] cursor-pointer flex items-center hover:bg-mid-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    <Search size={18} />
                </button>
            </form>

            {/* Category pills */}
            <div className="flex gap-[0.6rem] flex-wrap justify-center">
                <button
                    onClick={() => navigate({ category: undefined, search: searchValue || undefined })}
                    className={cn(
                        "p-[0.45rem_1.2rem] rounded-[50px] border text-[0.875rem] font-medium cursor-pointer transition-all duration-200",
                        !currentCategory
                            ? "border-blue bg-blue text-white"
                            : "border-[#e5e7eb] bg-white text-[#555] hover:border-blue hover:text-blue"
                    )}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => navigate({ category: cat, search: searchValue || undefined })}
                        className={cn(
                            "p-[0.45rem_1.2rem] rounded-[50px] border text-[0.875rem] font-medium cursor-pointer transition-all duration-200",
                            currentCategory === cat
                                ? "border-blue bg-blue text-white"
                                : "border-[#e5e7eb] bg-white text-[#555] hover:border-blue hover:text-blue"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};
