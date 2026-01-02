
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Contato() {
    return (
        <main className="container mx-auto px-4 py-12 text-am-black">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-serif font-bold mb-8">Fale Comigo</h1>

                <p className="text-xl text-gray-600 mb-10">
                    Quer uma consultoria personalizada ou tem dúvidas sobre algum produto?
                    Escolha o melhor canal para falar comigo!
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                    <a
                        href="https://wa.me/553197111424"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-4 bg-green-500 text-white font-bold py-4 px-8 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105"
                    >
                        <FaWhatsapp className="text-3xl" />
                        <span>Chamar no WhatsApp</span>
                    </a>
                    <p className="text-sm text-gray-400 mt-4">Atendimento rápido e personalizado.</p>
                </div>

                <div className="flex justify-center gap-8 mt-12">
                    <a href="https://www.instagram.com/espacoandrezzamota" target="_blank" className="flex flex-col items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors">
                        <FaInstagram className="text-4xl" />
                        <span className="font-medium">Instagram</span>
                    </a>
                    <a href="https://www.youtube.com/@espacoandrezzamota" target="_blank" className="flex flex-col items-center gap-2 text-gray-500 hover:text-red-600 transition-colors">
                        <FaYoutube className="text-4xl" />
                        <span className="font-medium">YouTube</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
