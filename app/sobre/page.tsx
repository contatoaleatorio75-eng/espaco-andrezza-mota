"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const DECORATIVE_IMAGES = [
    { src: "/mockups/fragrance.png", alt: "Perfume de Luxo" },
    { src: "/mockups/cream.png", alt: "Creme Premium" },
    { src: "/mockups/makeup.png", alt: "Maquiagem Elegante" },
    { src: "/mockups/soap.png", alt: "Sabonetes Orgânicos" },
    { src: "/mockups/shampoo.png", alt: "Shampoo Premium" },
    { src: "/mockups/nails.png", alt: "Esmaltes de Luxo" },
];

export default function Sobre() {

    return (
        <main className="container mx-auto px-4 py-12 text-am-black overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-center mb-8">Sobre Andrezza Mota</h1>

                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
                    <div className="w-full md:w-1/3 relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform hover:scale-105 shrink-0 z-10">
                        <Image
                            src="/andrezza-mota.jpg"
                            alt="Andrezza Mota"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex-1 space-y-6 text-lg leading-relaxed text-gray-700">
                        <p className="text-xl font-medium text-am-green">
                            Olá! Sou Andrezza Mota, sua consultora de beleza e bem-estar.
                        </p>
                        <p>
                            Minha paixão é ajudar você a encontrar os produtos perfeitos para realçar sua beleza natural.
                            Trabalho com as melhores marcas do mercado nacional e internacional, incluindo <strong>Natura, Boticário, Eudora, O.U.I, Avon e Tupperware</strong>.
                        </p>

                        <p>
                            Neste espaço, compartilho não apenas produtos, mas dicas valiosas de skincare, maquiagem e perfumaria
                            para que você se sinta confiante e radiante todos os dias.
                        </p>

                        <div className="pt-4">
                            <a
                                href={`https://wa.me/553197111424?text=${encodeURIComponent("Oi Andrezza! Estava lendo sobre você no site e gostaria de tirar uma dúvida.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-am-green text-white px-8 py-4 rounded-full font-bold hover:bg-am-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            >
                                Falar no WhatsApp <span className="pointing-hand">👈</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Floating Ribbon Showcase */}
            <div className="relative py-16 -mx-4 overflow-hidden bg-white/40 backdrop-blur-md border-y border-gray-100 mb-12 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
                <div className="flex animate-marquee gap-12 px-4 py-4">
                    {/* Variety Engine: Generating 30 distinct visual items from 6 base products */}
                    {[...Array(30)].map((_, i) => {
                        const baseImg = DECORATIVE_IMAGES[i % DECORATIVE_IMAGES.length];
                        const hueRotate = (i * 137.5) % 360; // Golden ratio based distribution
                        const brightness = 95 + (i % 3) * 5;
                        const scale = 0.82 + (i % 5) * 0.04;

                        return (
                            <div
                                key={`sobre-item-${i}`}
                                className="relative w-44 h-44 shrink-0 floating group"
                                style={{
                                    animationDelay: `${(i * 0.4) % 4}s`,
                                    animationDuration: `${3.5 + (i % 4) * 0.5}s`,
                                    transform: `scale(${scale})`
                                }}
                            >
                                <div
                                    className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{
                                        filter: `hue-rotate(${hueRotate}deg) brightness(${brightness}%) contrast(105%)`,
                                    }}
                                >
                                    <Image
                                        src={baseImg.src}
                                        alt={baseImg.alt}
                                        fill
                                        className="object-contain drop-shadow-md"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Decorative gradients for edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50/80 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50/80 to-transparent z-20 pointer-events-none"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center pb-8">
                <p className="text-gray-500 italic text-sm">
                    "Beleza é sentir-se bem na própria pele."
                </p>
            </div>
        </main>
    );
}
