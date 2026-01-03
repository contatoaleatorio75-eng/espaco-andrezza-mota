"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "true");
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 z-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 max-w-4xl">
                <p>
                    Nós utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência e recomendar conteúdo de seu interesse. Ao continuar navegando, você concorda com a nossa{" "}
                    <a href="/politica-de-privacidade" className="text-am-green underline hover:text-green-700">
                        Política de Privacidade
                    </a>.
                </p>
            </div>
            <button
                onClick={acceptCookies}
                className="bg-am-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md"
            >
                Concordar e Fechar
            </button>
        </div>
    );
}
