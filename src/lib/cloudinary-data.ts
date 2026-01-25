import prisma from "./prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Mapping of folder names to display names
const CATEGORY_NAMES: Record<string, string> = {
  COMMERICAL: "Commercial",
  HEALTHCARE: "Healthcare",
  HOSPITALITY: "Hospitality",
  RESIDENTIAL: "Residential",
};

// Static fallback data for when database is not available (deployment)
const STATIC_CATEGORIES = [
  { id: 1, name: "Commercial", slug: "commerical" },
  { id: 2, name: "Healthcare", slug: "healthcare" },
  { id: 3, name: "Hospitality", slug: "hospitality" },
  { id: 4, name: "Residential", slug: "residential" },
];

const STATIC_PROJECTS: Record<string, Array<{ id: number; title: string; slug: string }>> = {
  commerical: [
    { id: 1, title: "CHIRON INSTRUMENTS", slug: "chiron-instruments" },
    { id: 2, title: "DALAMAL HOUSE", slug: "dalamal-house" },
    { id: 3, title: "KUCHE 7 OFFICE FORT", slug: "kuche-7-office-fort" },
    { id: 4, title: "LOMA IT PARK", slug: "loma-it-park" },
    { id: 5, title: "MAKER CHAMBERS", slug: "maker-chambers" },
    { id: 6, title: "NOMURA POWAI", slug: "nomura-powai" },
    { id: 7, title: "RUSTOMJEE CROWN SALES GALLERY", slug: "rustomjee-crown-sales-gallery" },
    { id: 8, title: "SAPANA POLYWEAVE PVT LTD GOREGAON", slug: "sapana-polyweave-pvt-ltd-goregaon" },
    { id: 9, title: "ZYDUS AHMEDABAD", slug: "zydus-ahmedabad" },
  ],
  healthcare: [
    { id: 10, title: "AYURVEDA SOMAIYA HOSPITAL SION", slug: "ayurveda-somaiya-hospital-sion" },
  ],
  hospitality: [
    { id: 11, title: "FAIRFIELD MARRIOTT INDORE", slug: "fairfield-marriott-indore" },
    { id: 12, title: "FORTUNE MARRIOTT INDORE", slug: "fortune-marriott-indore" },
    { id: 13, title: "SIX SENSES BARWARA RAJASTHAN", slug: "six-senses-barwara-rajasthan" },
    { id: 14, title: "THE PARK INDORE", slug: "the-park-indore" },
  ],
  residential: [
    { id: 15, title: "FARAH KHAN KITCHEN", slug: "farah-khan-kitchen" },
    { id: 16, title: "LODHA SEAMONT WALKESHWAR", slug: "lodha-seamont-walkeshwar" },
    { id: 17, title: "RAJTATTVA SHOW FLAT THANE", slug: "rajattattva-show-flat-thane" },
    { id: 18, title: "RUSTOMJEE CROWN SHOW FLAT PRABHADEVI", slug: "rustomjee-crown-show-flat-prabhadevi" },
    { id: 19, title: "RUSTOMJEE PARAMOUNT SHOW FLAT KHAR", slug: "rustomjee-paramount-show-flat-khar" },
    { id: 20, title: "SHAH KINGDOM SHOW FLAT KHARGHAR", slug: "shah-kingdom-show-flat-kharghar" },
    { id: 21, title: "VIREN MIRANI BUNGLOW BREACH CANDY", slug: "viren-mirani-bunglow-breach-candy" },
  ],
};

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  previewImage?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  previewImage?: string;
}

export interface FullProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  images: Array<{
    id: string;
    url: string;
    publicId: string;
  }>;
}

/**
 * Check if Prisma database is available
 * Skip check in production (Vercel) to avoid connection timeouts
 */
async function isDatabaseAvailable(): Promise<boolean> {
  // In production/build time, skip database check to avoid timeouts
  // The database is not available on Vercel anyway
  if (process.env.NODE_ENV === 'production') {
    return false;
  }
  
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get all categories from database or static fallback
 */
export async function getAllCategories(): Promise<CategoryData[]> {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
      });

      // Get preview images for each category
      const categoriesWithPreview = await Promise.all(
        categories.map(async (cat) => {
          let previewImage: string | undefined;
          
          // Try Cloudinary first
          try {
            const cloudinaryImages = await getImagesByFolder(`projects/${cat.slug}`);
            if (cloudinaryImages.length > 0) {
              previewImage = cloudinaryImages[0].secure_url;
            }
          } catch (error) {
            // Continue to try database
          }

          // Fall back to database images
          if (!previewImage) {
            const projectWithImage = await prisma.project.findFirst({
              where: { categoryId: cat.id },
              include: { images: true },
              orderBy: { createdAt: 'desc' },
            });
            previewImage = projectWithImage?.images[0]?.url;
          }

          return {
            id: String(cat.id),
            name: cat.name,
            slug: cat.slug,
            previewImage,
          };
        })
      );

      return categoriesWithPreview;
    } catch (error) {
      console.error("Error fetching categories from database:", error);
      // Fall through to static data
    }
  }

  // Use static data as fallback
  console.log("Using static category data (database unavailable)");
  const staticWithPreviews = await Promise.all(
    STATIC_CATEGORIES.map(async (cat) => {
      let previewImage: string | undefined;
      
      // Try Cloudinary
      try {
        const cloudinaryImages = await getImagesByFolder(`projects/${cat.slug}`);
        if (cloudinaryImages.length > 0) {
          previewImage = cloudinaryImages[0].secure_url;
        }
      } catch (error) {
        // No preview available
      }

      return {
        id: String(cat.id),
        name: CATEGORY_NAMES[cat.slug.toUpperCase()] || cat.name,
        slug: cat.slug,
        previewImage,
      };
    })
  );

  return staticWithPreviews;
}

/**
 * Get all projects in a specific category
 */
export async function getProjectsByCategory(categorySlug: string): Promise<ProjectData[]> {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (!category) {
        return getStaticProjects(categorySlug);
      }

      const projects = await prisma.project.findMany({
        where: { categoryId: category.id },
        include: { images: true },
        orderBy: { title: 'asc' },
      });

      // Get preview images for each project
      const projectsWithPreviews = await Promise.all(
        projects.map(async (project) => {
          let previewImage: string | undefined;
          
          // Try Cloudinary first
          try {
            const cloudinaryImages = await getImagesByFolder(`projects/${categorySlug}/${project.slug}`);
            if (cloudinaryImages.length > 0) {
              previewImage = cloudinaryImages[0].secure_url;
            }
          } catch (error) {
            // Continue to try database
          }

          // Fall back to database images
          if (!previewImage && project.images.length > 0) {
            previewImage = project.images[0]?.url;
          }

          return {
            id: String(project.id),
            title: project.title,
            slug: project.slug,
            previewImage,
          };
        })
      );

      return projectsWithPreviews;
    } catch (error) {
      console.error(`Error fetching projects for category ${categorySlug}:`, error);
      // Fall through to static data
    }
  }

  // Use static data as fallback - ALWAYS fetch Cloudinary images for static projects
  console.log(`Using static project data for ${categorySlug} (database unavailable)`);
  const staticProjects = STATIC_PROJECTS[categorySlug] || [];
  
  const staticWithPreviews = await Promise.all(
    staticProjects.map(async (project) => {
      let previewImage: string | undefined;
      
      // Try Cloudinary
      try {
        const cloudinaryImages = await getImagesByFolder(`projects/${categorySlug}/${project.title}`);
        if (cloudinaryImages.length > 0) {
          previewImage = cloudinaryImages[0].secure_url;
        }
      } catch (error) {
        // No preview available
      }

      return {
        id: String(project.id),
        title: project.title,
        slug: project.slug,
        previewImage,
      };
    })
  );

  return staticWithPreviews;
}

/**
 * Get static projects for a category
 */
function getStaticProjects(categorySlug: string): ProjectData[] {
  const projects = STATIC_PROJECTS[categorySlug] || [];
  
  return projects.map((project) => ({
    id: String(project.id),
    title: project.title,
    slug: project.slug,
    previewImage: undefined, // Will be populated by the caller
  }));
}

/**
 * Get all images for a specific project
 */
export async function getProjectImages(categorySlug: string, projectSlug: string) {
  // Try Cloudinary first - need to find the correct folder name
  // First try with slug, then try with static project title (with spaces)
  try {
    // Try with slug first (some projects might use slug format)
    let cloudinaryImages = await getImagesByFolder(`projects/${categorySlug}/${projectSlug}`);
    
    // If not found, try with title case from static data
    if (cloudinaryImages.length === 0) {
      const staticProjects = STATIC_PROJECTS[categorySlug] || [];
      const staticProject = staticProjects.find(p => p.slug === projectSlug);
      if (staticProject) {
        cloudinaryImages = await getImagesByFolder(`projects/${categorySlug}/${staticProject.title}`);
      }
    }
    
    if (cloudinaryImages.length > 0) {
      return cloudinaryImages.map((img: { secure_url: string; public_id: string }) => ({
        url: img.secure_url,
        publicId: img.public_id,
      }));
    }
  } catch (error) {
    console.log(`No Cloudinary images for ${projectSlug}`);
  }

  // Fall back to database
  const dbAvailable = await isDatabaseAvailable();
  if (dbAvailable) {
    try {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (!category) {
        return [];
      }

      const project = await prisma.project.findFirst({
        where: { 
          slug: projectSlug,
          categoryId: category.id,
        },
        include: { images: true },
      });

      if (project && project.images.length > 0) {
        return project.images.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        }));
      }
    } catch (error) {
      console.error(`Error fetching images from database for ${projectSlug}:`, error);
    }
  }

  return [];
}

/**
 * Get full project details including all images
 */
export async function getProjectDetails(
  categorySlug: string,
  projectSlug: string
): Promise<FullProjectData | null> {
  const images = await getProjectImages(categorySlug, projectSlug);

  if (images.length === 0) {
    return null;
  }

  return {
    id: projectSlug,
    title: projectSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    slug: projectSlug,
    category: categorySlug,
    images: images.map((img, index) => ({
      id: `${index}`,
      url: img.url,
      publicId: img.publicId,
    })),
  };
}

/**
 * Helper function to get images by folder from Cloudinary
 * Uses public_id: with wildcard because Cloudinary doesn't always set the folder property
 * when images are uploaded with the full path as public_id
 */
async function getImagesByFolder(folder: string) {
  const res = await cloudinary.search
    .expression(`public_id:${folder}/*`)
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  return res.resources;
}

/**
 * Check if a category exists in the database
 */
export async function categoryExists(categorySlug: string): Promise<boolean> {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      return !!category;
    } catch (error) {
      return false;
    }
  }

  // Check static data
  return STATIC_CATEGORIES.some((cat) => cat.slug === categorySlug);
}

/**
 * Check if a project exists in a category
 */
export async function projectExists(
  categorySlug: string,
  projectSlug: string
): Promise<boolean> {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (!category) {
        return false;
      }

      const project = await prisma.project.findFirst({
        where: { 
          slug: projectSlug,
          categoryId: category.id,
        },
      });

      return !!project;
    } catch (error) {
      return false;
    }
  }

  // Check static data
  const projects = STATIC_PROJECTS[categorySlug] || [];
  return projects.some((p) => p.slug === projectSlug);
}

