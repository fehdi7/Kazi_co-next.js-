"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

type UploadedImage = {
  url: string;
  publicId: string;
};

export default function AddProjects() {
  const [siteType, setSiteType] = useState("commercial");
  const [siteName, setSiteName] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [saving, setSaving] = useState(false);

  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const folder = siteName
    ? `projects/${siteType}/${slugify(siteName)}`
    : `projects/${siteType}`;

  const handleSave = async () => {
    setSaving(true);

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: siteName,
        slug: slugify(siteName),
        categorySlug: siteType,
        images,
      }),
    });

    alert("Saved!");
    setSiteName("");
    setImages([]);
    setSaving(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add Project</h1>

      <select
        value={siteType}
        onChange={(e) => setSiteType(e.target.value)}
        className="border p-2"
      >
        <option value="commercial">Commercial</option>
        <option value="residential">Residential</option>
        <option value="hospitality">Hospitality</option>
        <option value="healthcare">Healthcare</option>
      </select>

      <input
        placeholder="Project name"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
        className="border p-2"
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
            onClick={() => open()}
            className="bg-amber-900 text-white p-2"
          >
            Upload Images
          </button>
        )}
      </CldUploadWidget>

      <div className="grid grid-cols-2 gap-2">
        {images.map((img) => (
          <img
            key={img.publicId}
            src={img.url}
            className="h-32 w-full object-cover rounded"
          />
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white p-2"
      >
        {saving ? "Saving..." : "Save Project"}
      </button>
    </div>
  );
}
