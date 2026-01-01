
import ProductCard from "@/components/ProductCard";
import SeasonalPromo from "@/components/SeasonalPromo";
import fs from "fs";
import path from "path";
import Link from "next/link"; // Keeping Link if needed, though mostly using <a> or just div click could work, but Link is better.

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
      .filter((fileName) => fileName.endsWith(".md"))
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

export default function Home() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      <SeasonalPromo />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-am-gradient-start to-white py-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-am-black mb-6">
          Bem-vinda ao seu momento de beleza
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Descubra as melhores dicas e produtos das marcas que você ama.
          Consultoria especializada <strong>Natura, O Boticário, Eudora, O.U.I</strong> e muito mais.
        </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <ProductCard brandRaw="natura" productName="Hidratante Tododia Noz Pecã e Cacau - 400ml" />
          <ProductCard brandRaw="boticario" productName="Malbec Gold Desodorante Colônia 100ml" />
          <ProductCard brandRaw="eudora" productName="Siàge Nutri Rosé Shampoo + Condicionador" />
          <ProductCard brandRaw="oui" productName="L’Amour-Esse 142 Eau de Parfum" />
          <ProductCard brandRaw="avon" productName="Renew Reversalist Creme Diurno FPS 25" />
          <ProductCard brandRaw="tupperware" productName="Eco Tupper Garrafa 500ml" />
        </div>

        {/* Dicas de Beleza Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gray-300 w-16"></div>
          <h3 className="mx-4 text-xl md:text-2xl font-bold text-am-black uppercase tracking-widest text-center">
            Dicas de Beleza
          </h3>
          <div className="h-px bg-gray-300 w-16"></div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.slug} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <h4 className="font-serif text-xl font-bold text-am-black mb-2">{post.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <button className="text-am-green font-semibold text-sm uppercase tracking-wide">Ler mais &rarr;</button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic col-span-full">
              Novas dicas estão sendo preparadas com carinho para você...
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
