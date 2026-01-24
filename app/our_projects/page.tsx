import ProjectsClient from "./ProjectsClient";
import { getAllCategories } from "@/src/lib/cloudinary-data";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Our Projects | Kazi Constructions - Interior Design Portfolio",
  description: "Browse Kazi Constructions' portfolio of 500+ interior design projects across residential, commercial, hospitality, and healthcare sectors. View our latest work and get inspired for your next project.",
  keywords: "interior design portfolio Mumbai, commercial project gallery, residential interior projects, hospitality interior design examples, healthcare interior design, office interior design India",
};

export default async function ProjectsPage() {
  const categories = await getAllCategories();

  const categoriesWithPreview = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    previewImage: cat.previewImage || null,
  }));

  return <ProjectsClient categories={categoriesWithPreview} />;
}

