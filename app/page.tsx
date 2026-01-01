// Cache bust: 2026-01-01-v2
import ProductCard from "@/components/ProductCard";
import SeasonalPromo from "@/components/SeasonalPromo";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";

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

// Function to get 6 rotating products based on the day
function getRotatingProducts() {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

  // Group products by brand
  const byBrand: Record<string, typeof PRODUCTS> = {
    boticario: PRODUCTS.filter(p => p.brand === 'boticario'),
    eudora: PRODUCTS.filter(p => p.brand === 'eudora'),
    avon: PRODUCTS.filter(p => p.brand === 'avon'),
    natura: PRODUCTS.filter(p => p.brand === 'natura'),
    tupperware: PRODUCTS.filter(p => p.brand === 'tupperware'),
    oui: PRODUCTS.filter(p => p.brand === 'oui'),
  };

  const priorityOrder = ['boticario', 'eudora', 'oui', 'natura', 'avon', 'tupperware'] as const;
  const selections: typeof PRODUCTS = [];

  // 1. Pick one from each in order
  priorityOrder.forEach(brand => {
    const list = byBrand[brand];
    if (list && list.length > 0) {
      const index = dayOfYear % list.length;
      selections.push(list[index]);
    }
  });

  // 2. Fill the remaining slot (to get 6) with an extra from the first priority brand (Boticário)
  // that isn't already selected, or just the next one
  const firstBrandList = byBrand['boticario'];
  if (firstBrandList && firstBrandList.length > 1) {
    const secondIndex = (dayOfYear + 1) % firstBrandList.length;
    selections.push(firstBrandList[secondIndex]);
  }

  return selections;
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

  return (
    <main className="min-h-screen bg-gray-50">
      <SeasonalPromo />

      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 pt-4 flex justify-center">
        <AdSensePlaceholder slot="HOME_TOP_SLOT" className="w-full h-[90px] max-w-4xl" />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-am-gradient-start to-white py-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-black text-am-black mb-6">
          Bem-vinda ao seu momento de beleza
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Descubra as melhores dicas e produtos das marcas que você ama.
          Consultoria especializada <strong>Natura, O Boticário, Eudora, O.U.I</strong> e muito mais.
        </p>
      </section>

      {/* Mid Section Ad */}
      <div className="container mx-auto px-4 py-4 flex justify-center">
        <AdSensePlaceholder slot="HOME_HERO_BOTTOM_SLOT" className="w-full h-[100px] max-w-5xl" />
      </div>

      {/* Ofertas Flash Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {dailyOffers.map(product => (
            <div key={`offer-${product.id}`} className="relative">
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                Oferta do Dia
              </div>
              <ProductCard
                brandRaw={product.brand}
                productName={product.name}
              />
            </div>
          ))}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {rotatingProducts.map(product => (
            <ProductCard
              key={product.id}
              brandRaw={product.brand}
              productName={product.name}
            />
          ))}
        </div>

        {/* Ad between Products and Blog */}
        <div className="container mx-auto px-4 py-8 flex justify-center border-y border-gray-100 mb-12">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Publicidade</p>
            <AdSensePlaceholder slot="HOME_GRID_FOOTER_SLOT" className="w-full h-[250px] md:h-[90px] max-w-4xl" />
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

      {/* Bottom Sticky-like Ad */}
      <div className="bg-white border-t border-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Recomendado para você</p>
          <AdSensePlaceholder slot="HOME_FOOTER_ADS_SLOT" className="w-full h-[280px] md:h-[150px] max-w-6xl" />
        </div>
      </div>
    </main>
  );
}

