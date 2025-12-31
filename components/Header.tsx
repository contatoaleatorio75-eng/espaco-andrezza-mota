
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-am-gradient-start to-am-gradient-end py-6 shadow-sm">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                <Link href="/" className="flex flex-col items-center group">
                    {/* Logo placeholder */}
                    <div className="relative w-40 h-20 mb-2 transition-transform group-hover:scale-105">
                        <div className="w-full h-full flex items-center justify-center border-2 border-am-black rounded-lg">
                            <span className="font-serif text-2xl font-bold text-am-black">AM</span>
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-serif font-medium text-am-black tracking-wider text-center">
                        Espaço Andrezza Mota
                    </h1>
                    <p className="text-sm text-gray-600 uppercase tracking-widest mt-1 font-light">
                        Consultoria em Beleza e Bem-Estar
                    </p>
                </Link>

                <nav className="mt-6">
                    <ul className="flex space-x-8 font-medium text-am-black/80">
                        <li><Link href="/" className="hover:text-am-black transition-colors hover:underline decoration-am-green decoration-2">Blog</Link></li>
                        <li><Link href="/sobre" className="hover:text-am-black transition-colors hover:underline decoration-am-blue decoration-2">Sobre Mim</Link></li>
                        <li><a href="https://wa.me/c/553197111424" target="_blank" rel="noopener noreferrer" className="hover:text-am-black transition-colors hover:underline decoration-am-green decoration-2">Contato</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
