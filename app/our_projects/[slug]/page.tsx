import prisma from "@/src/lib/prisma";

export default async function Postpage({ params }) {

  // Await params to access slug (required in Next.js 13+ App Router)
    const { slug } = await params; 
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },  // Now slug is properly awaited and defined
    });

    if (!post) {
      // Handle case where no post is found
      return (
        <main className="p-4 my-10 border-amber-900 border-2 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-lg">No post found with the slug "{slug}".</p>
        </main>
      );
    }

    // Render the post if found
    return (
      <main className="p-4 my-10 border-amber-900 border-2 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg">{post.content}</p>
      </main>
    );
  } catch (error) {
    // Handle database or other errors
    console.error("Error fetching post:", error);
    return (
      <main className="p-4 my-10 border-amber-900 border-2 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-lg">Something went wrong while loading the post.</p>
      </main>
    );
  }
}