
import Link from "next/link";
import Image from "next/image";
import AdSensePlaceholder from "./AdSensePlaceholder";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-am-gradient-start to-am-gradient-end shadow-sm">
            {/* Top Bar for Ads - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block bg-gray-50 border-b border-gray-100 py-2">
                <div className="container mx-auto px-4 flex justify-center">
                    <AdSensePlaceholder slot="TOP_HEADER_SLOT" className="w-[728px] h-[90px]" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Compact Logo */}
                    <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo-novo.jpg"
                            alt="Logo Espaço Andrezza Mota"
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-2xl font-serif font-black text-am-black tracking-tight leading-none">
                            Espaço Andrezza Mota
                        </h1>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-light hidden sm:block">
                            Consultoria em Beleza e Bem Estar
                        </p>
                    </div>
                </Link>

                <nav className="mt-4 md:mt-0">
                    <ul className="flex space-x-6 md:space-x-8 text-sm md:text-base font-medium text-am-black/80">
                        <li><Link href="/" className="hover:text-am-black transition-colors hover:underline decoration-am-green decoration-2">Lojas</Link></li>
                        <li><Link href="/sobre" className="hover:text-am-black transition-colors hover:underline decoration-am-blue decoration-2">Sobre</Link></li>
                        <li><Link href="/contato" className="hover:text-am-black transition-colors hover:underline decoration-am-green decoration-2">Contato</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
