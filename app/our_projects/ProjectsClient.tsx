"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

type UploadedImage = {
  url: string;
  publicId: string;
};

export default function ProjectsClient() {
  const [siteType, setSiteType] = useState("commercial");
  const [siteName, setSiteName] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [saving, setSaving] = useState(false);

  // Slug helper
  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  // Cloudinary folder
  const folder = siteName
    ? `projects/${siteType}/${slugify(siteName)}`
    : `projects/${siteType}`;

  // Save project + images to Prisma
  const handleSave = async () => {
    if (!siteName || images.length === 0) {
      alert("Please enter a project name and upload at least one image");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: siteName,
          slug: slugify(siteName),
          categorySlug: siteType,
          images,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Error saving project: " + data.error);
        setSaving(false);
        return;
      }

      alert("Project saved successfully!");
      // Reset form
      setSiteName("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold">Add New Project</h1>

      <select
        value={siteType}
        onChange={(e) => setSiteType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="commercial">Commercial</option>
        <option value="residential">Residential</option>
        <option value="hospitality">Hospitality</option>
        <option value="healthcare">Healthcare</option>
      </select>

      <input
        type="text"
        placeholder="Project Name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
        className="border p-2 rounded"
      />

<CldUploadWidget
  options={{
    uploadPreset: "kazico",
    folder,
    multiple: true,
  }}
  onUpload={(result) => {
    if (result.event === "success" && typeof result.info !== "string") {
      const info = result.info;
      setImages((prev) => [
        ...prev,
        { url: info.secure_url, publicId: info.public_id },
      ]);
    }
  }}
>
  {({ open }) => (
    <button
      type="button"
      onClick={() => open()} // ✅ wrap in arrow function
      disabled={!siteName}
      className="bg-amber-900 text-white p-2 rounded disabled:opacity-50"
    >
      Upload Images
    </button>
  )}
</CldUploadWidget>



      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt="uploaded"
              className="rounded h-32 object-cover w-full"
            />
          ))}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || images.length === 0 || !siteName}
        className="bg-black text-white p-2 rounded disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Project"}
      </button>
    </div>
  );
}
