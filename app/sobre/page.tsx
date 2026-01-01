
import Image from "next/image";

export default function Sobre() {
    return (
        <main className="container mx-auto px-4 py-12 text-am-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-center mb-8">Sobre Andrezza Mota</h1>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-full md:w-1/3 relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition-transform hover:scale-105">
                        <Image
                            src="/andrezza-mota.png"
                            alt="Andrezza Mota"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex-1 space-y-4 text-lg leading-relaxed text-gray-700">
                        <p>
                            Olá! Sou <strong>Andrezza Mota</strong>, sua consultora de beleza e bem-estar.
                        </p>
                        <p>
                            Minha paixão é ajudar você a encontrar os produtos perfeitos para realçar sua beleza natural.
                            Trabalho com as melhores marcas do mercado nacional e internacional, incluindo <strong>Natura, Boticário, Eudora, O.U.I, Avon e Tupperware</strong>.
                        </p>
                        <p>
                            Neste espaço, compartilho não apenas produtos, mas dicas valiosas de skincare, maquiagem e perfumaria
                            para que você se sinta confiante e radiante todos os dias.
                        </p>
                        <p className="font-semibold text-am-green mt-6">
                            Sinta-se à vontade para me chamar no WhatsApp e tirar suas dúvidas!
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
