
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
    const phoneNumber = "553197111424";
    const message = "Olá! Vi seu site de beleza e gostaria de uma consultoria.";
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-28 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Falar no WhatsApp"
        >
            <FaWhatsapp className="text-3xl" />
            <span className="absolute right-full mr-3 bg-white text-gray-800 text-sm font-bold px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Fale comigo agora!
            </span>
        </a>
    );
}
