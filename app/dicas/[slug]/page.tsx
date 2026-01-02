
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";


// Generate static params for all posts to enable static export
export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), "content/posts");

    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => ({
            slug: fileName.replace(/\.md$/, ""),
        }));
}

// Function to get post content
function getPostContent(slug: string) {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Quick and dirty frontmatter removal for display (assuming --- separator)
    // In a real app we'd use 'gray-matter', but keeping dependencies low as per instructions unless needed.
    // Actually, let's just strip the first block between --- 
    const content = fileContents.replace(/---[\s\S]*?---/, "").trim();

    // Extract frontmatter for title
    const matchTitle = fileContents.match(/title: "(.*?)"/);
    const matchDate = fileContents.match(/date: "(.*?)"/);

    return {
        title: matchTitle ? matchTitle[1] : "Dica de Beleza",
        date: matchDate ? matchDate[1] : "",
        content,
    };
}

// Page Component - Now following Next.js 15/16 async params pattern
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostContent(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
                <Link href="/" className="text-am-green hover:underline mb-8 inline-block">&larr; Voltar para Home</Link>

                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-am-black mb-4">{post.title}</h1>
                    <p className="text-gray-500">{post.date}</p>
                </header>

                <div className="prose prose-pink max-w-none text-gray-700 leading-relaxed mb-12">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>



                <div className="mt-12 pt-8 italic text-gray-500">
                    <p>Gostou dessa dica? Compartilhe com suas amigas ou me chame no WhatsApp para saber mais sobre os produtos!</p>
                </div>
            </article>
        </main>
    );
}
