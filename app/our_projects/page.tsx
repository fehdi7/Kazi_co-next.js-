// app/our_projects/page.tsx
import Link from "next/link";
import prisma from "@/src/lib/prisma";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-4 my-10 border-amber-900 border-2 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Our Projects</h1>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/our_projects/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* client-only UI, no slug here */}
      <ProjectsClient />
    </main>
  );
}
