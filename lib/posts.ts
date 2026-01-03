import fs from "fs";
import path from "path";

export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
}

export function getPosts(): Post[] {
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
