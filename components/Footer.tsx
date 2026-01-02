
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-8">
                    Siga para mais dicas diárias de beleza
                </h3>

                <div className="flex justify-center space-x-8 mb-10">
                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/espacoandrezzamota"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 transition-all transform hover:scale-110 hover:-translate-y-1"
                    >
                        <span className="sr-only">Instagram</span>
                        <FaInstagram className="h-10 w-10" />
                    </a>

                    {/* YouTube */}
                    <a
                        href="https://www.youtube.com/@espacoandrezzamota"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 transition-all transform hover:scale-110 hover:-translate-y-1"
                    >
                        <span className="sr-only">YouTube</span>
                        <FaYoutube className="h-10 w-10" />
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/553197111424"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600 transition-all transform hover:scale-110 hover:-translate-y-1"
                    >
                        <span className="sr-only">WhatsApp</span>
                        <FaWhatsapp className="h-10 w-10" />
                    </a>
                </div>

                <div className="border-t border-gray-200 pt-8 mt-8">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Espaço Andrezza Mota. <Link href="/politica-de-privacidade" className="hover:text-am-green">Política de Privacidade</Link>.
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                        Natura, Boticário, Eudora, O.U.I, Avon e Tupperware são marcas registradas de seus respectivos proprietários.
                    </p>
                </div>
            </div>
        </footer>
    );
}
