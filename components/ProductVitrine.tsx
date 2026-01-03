"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    brand: string;
    link?: string;
    isProntaEntrega?: boolean;
}

interface ProductVitrineProps {
    initialProducts: Product[];
    allProducts: Product[];
}

export default function ProductVitrine({ initialProducts, allProducts }: ProductVitrineProps) {
    const [filter, setFilter] = useState<string>("all");

    const BRANDS = [
        { id: "all", name: "Todos" },
        { id: "boticario", name: "Boticário" },
        { id: "natura", name: "Natura" },
        { id: "eudora", name: "Eudora" },
        { id: "oui", name: "O.U.i" },
        { id: "avon", name: "Avon" },
        { id: "tupperware", name: "Tupperware" }
    ];

    const filteredProducts = filter === "all"
        ? initialProducts
        : allProducts.filter(p => p.brand === filter).slice(0, 12);

    return (
        <section className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-gray-300 w-16"></div>
                <h3 className="mx-4 text-xl md:text-2xl font-bold text-am-black uppercase tracking-widest text-center">
                    Destaques da Semana
                </h3>
                <div className="h-px bg-gray-300 w-16"></div>
            </div>

            {/* Brand Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {BRANDS.map(brand => (
                    <button
                        key={brand.id}
                        onClick={() => setFilter(brand.id)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === brand.id
                            ? "bg-am-green text-white shadow-md scale-105"
                            : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                            }`}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        brandRaw={product.brand}
                        productName={product.name}
                        link={product.link}
                    />
                ))}
            </div>
        </section>
    );
}
