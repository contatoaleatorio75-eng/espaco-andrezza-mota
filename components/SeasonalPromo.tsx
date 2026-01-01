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
                // Approximate for 2026 based on user request context, or general feb window
                startDate: new Date(currentYear, 1, 1), // Feb 1
                endDate: new Date(currentYear, 1, 28, 23, 59, 59), // Feb 28
                bgColor: "bg-purple-100",
                textColor: "text-purple-800",
            },

            // Monthly / Generic Rotation (Fallbacks)
            {
                id: "natura-month",
                title: "🧡 Mês da Beleza Natura 🧡",
                message: "As melhores fragrâncias e hidratação com ofertas exclusivas.",
                startDate: new Date(currentYear, 0, 1), // Cycle fallback
                endDate: new Date(currentYear, 11, 31),
                bgColor: "bg-orange-600",
                textColor: "text-white",
            },
        ];

        // Filter active promos
        const activePromos = promotions.filter(p => today >= p.startDate && today <= p.endDate);

        if (activePromos.length > 0) {
            // Priority: Specific events > Catch-all Month
            const seasonalEvents = [
                "black-friday", "mothers-day", "fathers-day", "childrens-day", "consumer-day", "carnival"
            ];
            const eventPromo = activePromos.find(p => seasonalEvents.includes(p.id));

            setPromo(eventPromo || activePromos[0]);
        }
    }, []);

    if (!promo) return null;

    return (
        <div className={`w-full py-3 px-4 text-center font-medium ${promo.bgColor} ${promo.textColor} shadow-sm transition-all duration-500`}>
            <p>
                <span className="font-bold text-lg block sm:inline mr-2">{promo.title}</span>
                {promo.message}
            </p>
        </div>
    );
}
