export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { LandingNav } from "@/components/LandingNav";
import { LandingFooter } from "@/components/LandingFooter";
import { Suspense } from "react";
import type { Product } from "@/types";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { ProductCard } from "@/components/shop/ProductCard";

async function getProducts(category?: string, search?: string): Promise<Product[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (category) where.category = category;
    if (search) {
        where.name = { contains: search, mode: 'insensitive' };
    }
    const products = await prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });
    return products;
}

async function getCategories(): Promise<string[]> {
    const categories = await prisma.product.findMany({
        select: { category: true },
        distinct: ['category']
    });
    return categories.map((c: { category: string }) => c.category);
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string, search?: string }> }) {
    const { category, search } = await searchParams;
    const products = await getProducts(category, search);
    const categories = await getCategories();

    return (
        <>
            <LandingNav />
            <main className="pt-[2rem] pb-[4rem] bg-[#f8f9fa] min-h-screen mt-[90px] max-[900px]:mt-[100px]">
                <div className="max-w-[1200px] mx-auto px-[1.5rem]">
                    <header className="mb-[3rem] text-center">
                        <h1 className="text-[2.5rem] text-dark-blue font-bold mb-[1rem]">Our Collection</h1>
                        <p className="text-[#666] text-[1.1rem]">Discover the latest gadgets and accessories.</p>
                    </header>

                    <Suspense fallback={null}>
                        <ShopBrowser
                            categories={categories}
                            currentCategory={category}
                            currentSearch={search}
                        />
                    </Suspense>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[2rem]">
                        {products.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500 py-10 text-lg">No products found.</p>
                        ) : (
                            products.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </main>
            <LandingFooter />
        </>
    );
}
