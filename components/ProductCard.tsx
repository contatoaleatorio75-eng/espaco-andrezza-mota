
import React from 'react';

const STORE_LINKS: Record<string, string> = {
    natura: "https://minhaloja.natura.com/consultoria/andrezzamota",
    boticario: "https://minhaloja.grupoboticario.com.br/espacoandrezzamota",
    eudora: "https://minhaloja.grupoboticario.com.br/espacoandrezzamota",
    oui: "https://minhaloja.grupoboticario.com.br/espacoandrezzamota",
    whatsapp: "https://wa.me/553197111424"
};

const BRAND_STYLES: Record<string, { border: string, text: string, bg_accent: string, label: string }> = {
    natura: { border: 'border-orange-500', text: 'text-orange-900', bg_accent: 'bg-orange-50', label: 'Natura' },
    boticario: { border: 'border-emerald-600', text: 'text-emerald-900', bg_accent: 'bg-emerald-50', label: 'O Boticário' },
    eudora: { border: 'border-purple-600', text: 'text-purple-950', bg_accent: 'bg-purple-50', label: 'Eudora' },
    avon: { border: 'border-pink-500', text: 'text-pink-900', bg_accent: 'bg-pink-50', label: 'Avon' },
    tupperware: { border: 'border-blue-500', text: 'text-blue-900', bg_accent: 'bg-blue-50', label: 'Tupperware' },
    oui: { border: 'border-slate-800', text: 'text-slate-900', bg_accent: 'bg-slate-50', label: 'O.U.i Paris' },
    default: { border: 'border-am-blue', text: 'text-am-black', bg_accent: 'bg-gradient-to-r from-am-green/30 to-am-blue/30', label: 'Oferta' }
};

interface ProductCardProps {
    brandRaw?: string;
    productName: string;
    link?: string;
}

export default function ProductCard({ brandRaw, productName, link }: ProductCardProps) {
    const brandKey = brandRaw?.toLowerCase().trim().replace('ó', 'o').replace('á', 'a') || 'default';
    const style = BRAND_STYLES[brandKey] || BRAND_STYLES.default;

    // Priority logic: 
    // 1. Manually provided link (for specialized WhatsApp catalog items)
    // 2. Predefined store links (Natura, Boticario, etc.)
    // 3. Fallback to a smart WhatsApp message
    const whatsappMessage = encodeURIComponent(`Olá Andrezza! Vi o produto "${productName}" no seu site e gostaria de saber mais/comprar.`);
    const fallbackLink = `https://wa.me/553197111424?text=${whatsappMessage}`;
    const finalLink = link || STORE_LINKS[brandKey] || fallbackLink;

    return (
        <div className={`my-4 w-full max-w-2xl mx-auto bg-white border-2 ${style.border} rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-1`}>
            <div className="flex flex-col md:flex-row">
                <div className={`${style.bg_accent} py-4 md:w-32 flex items-center justify-center`}>
                    <span className={`font-bold text-sm uppercase tracking-widest ${style.text} md:-rotate-90`}>
                        {style.label}
                    </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-2 flex items-center">
                            ✨ Indicação Espaço AM
                        </p>
                        <h3 className={`text-xl md:text-2xl font-bold ${style.text} leading-tight mb-4 font-serif`}>
                            {productName}
                        </h3>
                    </div>

                    <a
                        href={finalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center w-full md:w-auto overflow-hidden rounded-full p-0.5 font-bold transition-all duration-300 hover:scale-105 focus:outline-none"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-am-green to-am-blue opacity-70 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative w-full md:w-auto flex items-center justify-center px-8 py-3 text-sm bg-white text-am-black rounded-full transition-all group-hover:bg-transparent group-hover:text-white">
                            Comprar Agora <span className="ml-2">➜</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
