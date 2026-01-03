import Link from "next/link";
import Image from "next/image";

import { SITE_SETTINGS } from "@/data/site-settings";

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-am-gradient-start to-am-gradient-end shadow-sm">


            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Compact Logo */}
                    <div
                        className="relative transition-transform group-hover:scale-105"
                        style={{ width: SITE_SETTINGS.logoSize, height: SITE_SETTINGS.logoSize }}
                    >
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
                    <ul className="flex space-x-6 md:space-x-8 text-sm md:text-base font-bold uppercase tracking-widest">
                        <li>
                            <Link href="/" className="text-emerald-600 hover:text-emerald-700 transition-all hover:scale-110 inline-block border-b-2 border-transparent hover:border-emerald-600 pb-1">
                                Lojas
                            </Link>
                        </li>
                        <li>
                            <Link href="/sobre" className="text-sky-600 hover:text-sky-700 transition-all hover:scale-110 inline-block border-b-2 border-transparent hover:border-sky-600 pb-1">
                                Sobre
                            </Link>
                        </li>
                        <li>
                            <Link href="/#dicas-de-beleza" className="text-amber-600 hover:text-amber-700 transition-all hover:scale-110 inline-block border-b-2 border-transparent hover:border-amber-600 pb-1 text-center leading-tight">
                                Dicas de<br className="hidden md:inline" /> Beleza
                            </Link>
                        </li>
                        <li>
                            <Link href="/contato" className="text-rose-600 hover:text-rose-700 transition-all hover:scale-110 inline-block border-b-2 border-transparent hover:border-rose-600 pb-1">
                                Contato
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
