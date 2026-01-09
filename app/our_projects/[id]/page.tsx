import prisma from '@/src/lib/prisma'

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)

  if (isNaN(id)) {
    return <div>Invalid post ID</div>
  }

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main className="p-4 my-10 border-amber-900 border-2 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
    </main>
  )
}
