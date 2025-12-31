
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-am-gradient-start to-white py-20 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-am-black mb-6">
          Bem-vinda ao seu momento de beleza
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Descubra as melhores dicas e produtos das marcas que você ama.
          Consultoria especializada <strong>Natura, O Boticário, Eudora, O.U.I</strong> e muito mais.
        </p>
      </section>

      {/* Vitrine Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px bg-gray-300 w-16"></div>
          <h3 className="mx-4 text-xl md:text-2xl font-bold text-am-black uppercase tracking-widest text-center">
            Destaques da Semana
          </h3>
          <div className="h-px bg-gray-300 w-16"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ProductCard brandRaw="natura" productName="Hidratante Tododia Noz Pecã e Cacau - 400ml" />
          <ProductCard brandRaw="boticario" productName="Malbec Gold Desodorante Colônia 100ml" />
          <ProductCard brandRaw="eudora" productName="Siàge Nutri Rosé Shampoo + Condicionador" />
          <ProductCard brandRaw="oui" productName="L’Amour-Esse 142 Eau de Parfum" />
          <ProductCard brandRaw="avon" productName="Renew Reversalist Creme Diurno FPS 25" />
          <ProductCard brandRaw="tupperware" productName="Eco Tupper Garrafa 500ml" />
        </div>
      </section>
    </main>
  );
}
