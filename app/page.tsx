// Cache bust: 2026-01-01-v2
import ProductCard from "@/components/ProductCard";
import SeasonalPromo from "@/components/SeasonalPromo";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";


interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

function getPosts(): Post[] {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");

    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".md") && !fileName.includes("sample-post"))
      .map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Simple frontmatter parser
        const matchTitle = fileContents.match(/title: "(.*?)"/);
        const matchDate = fileContents.match(/date: "(.*?)"/);
        const matchDesc = fileContents.match(/description: "(.*?)"/);

        return {
          slug: fileName.replace(/\.md$/, ""),
          title: matchTitle ? matchTitle[1] : "Sem título",
          date: matchDate ? matchDate[1] : "",
          description: matchDesc ? matchDesc[1] : "",
        };
      });

    return posts;
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

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

      {/* Ofertas Flash Section */}
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

      {/* Pronta Entrega Section - WhatsApp Focused */}
      <section className="bg-emerald-50 py-4 border-b border-emerald-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-emerald-300 w-16"></div>
            <a
              href={`https://wa.me/553197111424?text=${encodeURIComponent("Oi Andrezza! Vi sua seção de Pronta Entrega no site e gostaria de saber o que você tem disponível agora.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 text-xl md:text-2xl font-bold text-emerald-900 uppercase tracking-widest text-center hover:text-green-600 transition-colors"
            >
              🌻 *Pronta Entrega em Betim - MG.
            </a>
            <div className="h-px bg-emerald-300 w-16"></div>
          </div>
          <p className="text-center text-emerald-700 mb-2 max-w-xl mx-auto italic">
            Produtos em estoque para entrega imediata. Clique para reservar via WhatsApp!
          </p>
          <p className="text-center text-emerald-600 text-[10px] mb-4 font-medium uppercase tracking-tighter">
            *Consulte condições
          </p>

          <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
            {prontaEntrega.map(product => (
              <div key={`pe-${product.id}`} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] max-w-sm">
                <ProductCard
                  brandRaw={product.brand}
                  productName={product.name}
                  link={`https://wa.me/553197111424?text=${encodeURIComponent(`Oi Andrezza! Quero reservar o item de pronta entrega: "${product.name}"`)}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vitrine Grid */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gray-300 w-16"></div>
          <h3 className="mx-4 text-xl md:text-2xl font-bold text-am-black uppercase tracking-widest text-center">
            Destaques da Semana
          </h3>
          <div className="h-px bg-gray-300 w-16"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {rotatingProducts.map(product => (
            <ProductCard
              key={product.id}
              brandRaw={product.brand}
              productName={product.name}
              link={product.link}
            />
          ))}
        </div>

        {/* Decorative Spacer */}
        <div className="container mx-auto px-4 py-8 flex justify-center border-y border-gray-100 mb-12">
          <div className="text-center">
            <p className="font-serif italic text-am-black/40">Sua beleza é única, celebre-a todos os dias.</p>
          </div>
        </div>

        {/* Dicas de Beleza Section */}
        <div className="flex items-center justify-center mb-8">
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
      </section>

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
    </main>
  );
}
