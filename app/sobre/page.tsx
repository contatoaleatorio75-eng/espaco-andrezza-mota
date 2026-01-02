"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const DECORATIVE_IMAGES = [
    { src: "/mockups/fragrance.png", alt: "Perfume de Luxo" },
    { src: "/mockups/cream.png", alt: "Creme Premium" },
    { src: "/mockups/makeup.png", alt: "Maquiagem Elegante" },
    { src: "/mockups/soap.png", alt: "Sabonetes Orgânicos" },
];

export default function Sobre() {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % DECORATIVE_IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="container mx-auto px-4 py-12 text-am-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-center mb-8">Sobre Andrezza Mota</h1>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-full md:w-1/3 relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition-transform hover:scale-105">
                        <Image
                            src="/andrezza-mota.jpg"
                            alt="Andrezza Mota"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex-1 space-y-4 text-lg leading-relaxed text-gray-700">
                        <p>
                            Olá! Sou <strong>Andrezza Mota</strong>, sua consultora de beleza e bem-estar.
                        </p>
                        <p>
                            Minha paixão é ajudar você a encontrar os produtos perfeitos para realçar sua beleza natural.
                            Trabalho com as melhores marcas do mercado nacional e internacional, incluindo <strong>Natura, Boticário, Eudora, O.U.I, Avon e Tupperware</strong>.
                        </p>

                        <div className="py-4 flex justify-center md:justify-start">
                            <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white p-2">
                                <Image
                                    src="/mockups/fragrance.png"
                                    alt="Fragrâncias de Luxo"
                                    fill
                                    className="object-contain p-4 bg-gray-50 rounded-lg"
                                />
                            </div>
                        </div>

                        <p>
                            Neste espaço, compartilho não apenas produtos, mas dicas valiosas de skincare, maquiagem e perfumaria
                            para que você se sinta confiante e radiante todos os dias.
                        </p>
                        <a
                            href={`https://wa.me/553197111424?text=${encodeURIComponent("Oi Andrezza! Estava lendo sobre você no site e gostaria de tirar uma dúvida.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-am-green mt-6 block hover:text-am-black transition-colors"
                        >
                            Sinta-se à vontade para me chamar no WhatsApp e tirar suas dúvidas! <span className="pointing-hand">👈</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
