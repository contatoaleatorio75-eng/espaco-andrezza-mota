"use client";

import { useState, useEffect } from "react";

type Promotion = {
    id: string;
    title: string;
    message: string;
    startDate: Date;
    endDate: Date;
    bgColor: string;
    textColor: string;
    link?: string;
};

export default function SeasonalPromo() {
    const [promo, setPromo] = useState<Promotion | null>(null);

    useEffect(() => {
        // Current year is 2026 to start, but logic should handle the current year dynamically if needed, 
        // or we hardcode 2026 as requested in prompts "Verão 2026". 
        // The user request context explicitly mentions dates for 2026 (Ex: Verão 2026, Black Friday 27/11).
        // I will use 2026 for the specific year requested, or dynamic for recurring. 
        // Given the request "Exemplo: Verão 2026... Dia das Mães (10/05)...", I'll set up for the current year.

        // Note: JS Months are 0-indexed (0 = Jan, 11 = Dec)
        const today = new Date();
        const currentYear = today.getFullYear();

        const promotions: Promotion[] = [
            // Major Events (High Priority)
            {
                id: "black-friday",
                title: "🖤 Black Friday 🖤",
                message: "Ofertas imperdíveis com descontos de até 70%! Aproveite.",
                startDate: new Date(currentYear, 10, 1), // Nov 1
                endDate: new Date(currentYear, 10, 27, 23, 59, 59), // Nov 27
                bgColor: "bg-black",
                textColor: "text-white",
            },
            {
                id: "mothers-day",
                title: "🌸 Dia das Mães 🌸",
                message: "Presenteie quem você ama com nossos kits especiais.",
                startDate: new Date(currentYear, 4, 1), // May 1
                endDate: new Date(currentYear, 4, 10, 23, 59, 59), // May 10
                bgColor: "bg-pink-100",
                textColor: "text-pink-800",
            },
            {
                id: "fathers-day",
                title: "👔 Dia dos Pais 👔",
                message: "Os melhores perfumes e cuidados para ele.",
                startDate: new Date(currentYear, 7, 1), // Aug 1
                endDate: new Date(currentYear, 7, 9, 23, 59, 59), // Aug 9
                bgColor: "bg-blue-100",
                textColor: "text-blue-900",
            },
            {
                id: "childrens-day",
                title: "🎈 Dia das Crianças 🎈",
                message: "Diversão e cheirinho gostoso para os pequenos!",
                startDate: new Date(currentYear, 9, 1), // Oct 1
                endDate: new Date(currentYear, 9, 12, 23, 59, 59), // Oct 12
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-800",
            },
            {
                id: "consumer-day",
                title: "🛍️ Dia do Consumidor 🛍️",
                message: "Frete grátis e promoções exclusivas para você!",
                startDate: new Date(currentYear, 2, 10), // Mar 10
                endDate: new Date(currentYear, 2, 15, 23, 59, 59), // Mar 15
                bgColor: "bg-green-100",
                textColor: "text-green-800",
            },
            {
                id: "carnival",
                title: "🎉 Carnaval 🎉",
                message: "Brilhe na folia com nossas makes e protetores solares!",
                startDate: new Date(currentYear, 1, 1),
                endDate: new Date(currentYear, 1, 28, 23, 59, 59),
                bgColor: "bg-purple-100",
                textColor: "text-purple-800",
            },
            {
                id: "easter",
                title: "🐰 Feliz Páscoa 🐰",
                message: "Ofertas doces como chocolate para você se cuidar!",
                startDate: new Date(currentYear, 2, 25),
                endDate: new Date(currentYear, 3, 5, 23, 59, 59),
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-900",
            },
            {
                id: "pink-october",
                title: "🎀 Outubro Rosa 🎀",
                message: "Cuidado e prevenção. Apoie esta causa com a gente.",
                startDate: new Date(currentYear, 9, 1),
                endDate: new Date(currentYear, 9, 31, 23, 59, 59),
                bgColor: "bg-pink-200",
                textColor: "text-pink-900",
            },
            {
                id: "christmas",
                title: "🎄 Natal Mágico 🎄",
                message: "Encontre o presente perfeito para quem você ama.",
                startDate: new Date(currentYear, 11, 1),
                endDate: new Date(currentYear, 11, 26, 23, 59, 59),
                bgColor: "bg-red-600",
                textColor: "text-white",
            },

            // Monthly / Generic Rotation (Fallbacks)
            {
                id: "natura-month",
                title: "🧡 Mês da Beleza Natura 🧡",
                message: "As melhores fragrâncias e hidratação com ofertas exclusivas.",
                startDate: new Date(currentYear, 0, 1),
                endDate: new Date(currentYear, 11, 31),
                bgColor: "bg-orange-600",
                textColor: "text-white",
                link: "https://minhaloja.natura.com/consultoria/andrezzamota",
            },
        ];

        // Filter active promos
        const activePromos = promotions.filter(p => today >= p.startDate && today <= p.endDate);

        if (activePromos.length > 0) {
            // Priority Order: Specific events > Catch-all Month
            const priorityOrder = [
                "christmas", "black-friday", "pink-october", "childrens-day",
                "fathers-day", "mothers-day", "easter", "consumer-day", "carnival"
            ];

            // Find the active promo that appears earliest in our priority list
            const sortedEvents = activePromos
                .filter(p => priorityOrder.includes(p.id))
                .sort((a, b) => priorityOrder.indexOf(a.id) - priorityOrder.indexOf(b.id));

            setPromo(sortedEvents[0] || activePromos[0]);
        }
    }, []);

    if (!promo) return null;

    const content = (
        <div className={`w-full py-3 px-4 text-center font-medium ${promo.bgColor} ${promo.textColor} shadow-sm transition-all duration-300 ${promo.link ? "hover:brightness-110 cursor-pointer" : ""}`}>
            <p>
                <span className="font-bold text-lg block sm:inline mr-2">{promo.title}</span>
                {promo.message}
            </p>
        </div>
    );

    if (promo.link) {
        return (
            <a href={promo.link} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
                {content}
            </a>
        );
    }

    return content;
}
