// Cache bust: 2026-01-03-v3
import ProductCard from "@/components/ProductCard";
import ProductVitrine from "@/components/ProductVitrine";
import SeasonalPromo from "@/components/SeasonalPromo";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { getPosts } from "@/lib/posts";

const DECORATIVE_IMAGES = [
  { src: "/mockups/fragrance.png", alt: "Perfume de Luxo" },
  { src: "/mockups/cream.png", alt: "Creme Premium" },
  { src: "/mockups/makeup.png", alt: "Maquiagem Elegante" },
  { src: "/mockups/soap.png", alt: "Sabonetes Orgânicos" },
  { src: "/mockups/shampoo.png", alt: "Shampoo Premium" },
  { src: "/mockups/nails.png", alt: "Esmaltes de Luxo" },
];



// Function to get 12 rotating products based on the day
function getRotatingProducts() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  // Group products by brand
  const brands = ['boticario', 'eudora', 'oui', 'natura', 'avon', 'tupperware'] as const;
  const byBrand: Record<string, typeof PRODUCTS> = {};
  brands.forEach(brand => {
    byBrand[brand] = PRODUCTS.filter(p => p.brand === brand);
  });

  const selections: typeof PRODUCTS = [];

  // 1. Pick two from each brand to get 12
  brands.forEach(brand => {
    const list = byBrand[brand];
    if (list && list.length > 0) {
      // First selection
      const index1 = dayOfYear % list.length;
      selections.push(list[index1]);

      // Second selection (if available)
      if (list.length > 1) {
        const index2 = (dayOfYear + 3) % list.length; // offset to pick a different one
        // Ensure we don't pick the same one twice if there are enough products
        if (index1 !== index2) {
          selections.push(list[index2]);
        } else if (list.length > 2) {
          selections.push(list[(index1 + 1) % list.length]);
        }
      }
    }
  });

  // 2. If we still don't have 12 (due to some brands having few products), fill with whatever is left
  if (selections.length < 12) {
    const remainingCount = 12 - selections.length;
    const pool = PRODUCTS.filter(p => !selections.find(s => s.id === p.id));
    for (let i = 0; i < remainingCount && i < pool.length; i++) {
      selections.push(pool[i]);
    }
  }

  return selections.slice(0, 12);
}

// Function to get 2 specific "Flash" offers
function getDailyOffers() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  // We take products that are likely different from the main vitrine by using a large offset
  const offsetProducts = [...PRODUCTS].reverse();
  const selections = [
    offsetProducts[dayOfYear % offsetProducts.length],
    offsetProducts[(dayOfYear + 5) % offsetProducts.length]
  ];
  return selections;
}

export default function Home() {
  const posts = getPosts();
  const rotatingProducts = getRotatingProducts();
  const dailyOffers = getDailyOffers();

  const prontaEntrega = PRODUCTS.filter(p => p.isProntaEntrega);

  return (
    <main className="min-h-screen bg-gray-50">
      <SeasonalPromo />

      {/* Hero Content Section */}
      <section className="bg-white pt-6 pb-4 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold animate-shimmer glowing-text mb-2 italic leading-tight">
              E se sua BELEZA estivesse pronta para BRILHAR?!?
            </h1>
            <p className="text-[10px] md:text-xs text-amber-700/50 font-medium uppercase tracking-widest mb-6">
              By Andrezza Mota
            </p>
            <div className="h-0.5 w-16 bg-amber-100 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-light tracking-wide px-4">
              Descubra a consultoria personalizada que realça o que você tem de melhor.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyOffers.map(product => (
            <div key={`offer-${product.id}`} className="relative">
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                Oferta do Dia
              </div>
              <ProductCard
                brandRaw={product.brand}
                productName={product.name}
                link={product.link}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Floating Ribbon Showcase */}
      <div className="relative py-16 overflow-hidden bg-white/40 backdrop-blur-md border-y border-gray-100 mb-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
        <div className="flex animate-marquee gap-12 px-4 py-4">
          {[...Array(30)].map((_, i) => {
            const baseImg = DECORATIVE_IMAGES[i % DECORATIVE_IMAGES.length];
            const hueRotate = (i * 137.5) % 360;
            const brightness = 95 + (i % 3) * 5;
            const scale = 0.82 + (i % 5) * 0.04;

            return (
              <div
                key={`home-item-${i}`}
                className="relative w-40 h-40 shrink-0 floating group"
                style={{
                  animationDelay: `${(i * 0.4) % 4}s`,
                  animationDuration: `${3.5 + (i % 4) * 0.5}s`,
                  transform: `scale(${scale})`
                }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    filter: `hue-rotate(${hueRotate}deg) brightness(${brightness}%) contrast(105%)`,
                  }}
                >
                  <Image
                    src={baseImg.src}
                    alt={baseImg.alt}
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative gradients for edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50/80 to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Pronta Entrega Section - WhatsApp Focused */}
      <section className="bg-emerald-50 py-4 border-b border-emerald-100 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4 rotate-12">
          <Image src="/mockups/cream.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none -translate-x-1/4 translate-y-1/4 -rotate-12">
          <Image src="/mockups/soap.png" alt="" fill className="object-contain" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-emerald-300 w-16"></div>
            <a
              href={`https://wa.me/c/553197111424?text=${encodeURIComponent("Oi Andrezza! Vi sua seção de Pronta Entrega no site e gostaria de saber o que você tem disponível agora.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 text-xl md:text-2xl font-bold text-emerald-900 uppercase tracking-widest text-center hover:text-green-600 transition-colors flex items-center gap-2"
            >
              🌻 *Pronta Entrega em Betim - MG. <span className="pointing-hand">👈</span>
            </a>
            <div className="h-px bg-emerald-300 w-16"></div>
          </div>
          <p className="text-center text-emerald-700 mb-2 max-w-xl mx-auto italic">
            Produtos para entrega imediata conforme estoque. Clique para reservar via WhatsApp!
          </p>
          <p className="text-center text-emerald-600 text-[10px] mb-4 font-medium uppercase tracking-tighter">
            *Consulte condições
          </p>

          <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
            {prontaEntrega.slice(0, 4).map(product => (
              <div key={`pe-${product.id}`} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] max-w-sm flex">
                <ProductCard
                  brandRaw={product.brand}
                  productName={product.name}
                  link="https://wa.me/c/553197111424"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Vitrine with Filters */}
      <ProductVitrine
        initialProducts={rotatingProducts}
        allProducts={PRODUCTS}
      />

      {/* Decorative Spacer */}
      <div className="container mx-auto px-4 py-8 flex justify-center border-y border-gray-100 mb-12">
        <div className="text-center">
          <p className="font-serif italic text-am-black/40">Sua beleza é única, celebre-a todos os dias.</p>
        </div>
      </div>

      {/* Depoimentos Section */}
      <section className="container mx-auto px-4 py-12 bg-white rounded-3xl shadow-sm border border-gray-50 mb-16">
        <div className="flex items-center justify-center mb-10">
          <div className="h-px bg-amber-200 w-12"></div>
          <h3 className="mx-4 text-xl md:text-2xl font-bold text-am-black uppercase tracking-widest text-center">
            O que dizem nossas clientes em Betim
          </h3>
          <div className="h-px bg-amber-200 w-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 border-l-4 border-amber-400 bg-amber-50/30 italic text-gray-700">
            <p className="mb-4">"Amei o atendimento da Andrezza! Entrega super rápida em Betim e os mimos que ela manda são de um carinho enorme."</p>
            <cite className="font-bold text-sm not-italic text-am-black">— Marina Silva, Alterosa</cite>
          </div>
          <div className="p-6 border-l-4 border-am-green bg-emerald-50/30 italic text-gray-700">
            <p className="mb-4">"Os produtos O.U.i são maravilhosos e raros de achar pronta entrega. Recomendo muito o Espaço Andrezza Mota!"</p>
            <cite className="font-bold text-sm not-italic text-am-black">— Camila Oliveira, Centro</cite>
          </div>
          <div className="p-6 border-l-4 border-am-blue bg-sky-50/30 italic text-gray-700">
            <p className="mb-4">"Consultoria nota 10. Sempre tiro minhas dúvidas antes de comprar meu Boticário e a Andrezza sabe tudo!"</p>
            <cite className="font-bold text-sm not-italic text-am-black">— Juliana Pereira, PTB</cite>
          </div>
        </div>
      </section>

      {/* Dicas de Beleza Section */}
      <div id="dicas-de-beleza" className="flex items-center justify-center mb-8 scroll-mt-20">
        <div className="h-px bg-gray-300 w-16"></div>
        <h3 className="mx-4 text-xl md:text-2xl font-bold text-am-black uppercase tracking-widest text-center">
          Dicas de Beleza
        </h3>
        <div className="h-px bg-gray-300 w-16"></div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-2xl font-bold text-am-black mb-3">{post.title}</h4>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <p className="text-gray-600 mb-6 line-clamp-3">{post.description}</p>
              </div>
              <Link href={`/dicas/${post.slug}`} className="text-am-green font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Ler dica completa &rarr;
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic col-span-full py-12">
            Novas dicas estão sendo preparadas com carinho para você...
          </p>
        )}
      </div>

      {/* Bottom Features Placeholder */}
      <div className="bg-white border-t border-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl font-bold text-am-black mb-4">Atendimento Personalizado</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Dúvidas sobre qual produto escolher? Entre em contato e receba uma consultoria exclusiva para seu tipo de pele e estilo.
          </p>
          <Link
            href="/contato"
            className="inline-block bg-am-green text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-am-black transition-colors"
          >
            Falar com a Consultora
          </Link>
        </div>
      </div>

      {/* Instagram Invitation */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-am-black mb-4">Acompanhe as Novidades</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Siga **@espacoandrezzamota** no Instagram e fique por dentro de todos os lançamentos e promoções relâmpago!</p>
          <a
            href="https://www.instagram.com/espacoandrezzamota"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-lg"
          >
            Ver no Instagram 📸
          </a>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
    </main>
  );
}
