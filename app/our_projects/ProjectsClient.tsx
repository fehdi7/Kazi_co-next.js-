"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  export default function ProjectsClient() {
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const slug = slugify(title);

  return (
    <form className="mt-10 flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border border-amber-900 rounded-lg p-2"
      />

      <textarea
        name="content"
        placeholder="Content"
        className="border border-amber-900 rounded-lg p-2"
      />


      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          folder: `projects/${slug}`,
           multiple: true,
        }}
        onUpload={(result) => {
         if (typeof result.info !== "string") {
          console.log(result.info.secure_url);
          }
         }}
         >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="border border-amber-900 rounded-lg p-2"
          >
            Upload an Image
          </button>
        )}
      </CldUploadWidget>

       {/* Preview uploaded images */}
      <div className="flex flex-wrap gap-2 mt-4">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`uploaded ${i}`} className="w-40 h-40 object-cover rounded-lg" />
        ))}
      </div>
      
        <button
          type="submit"
          formAction="/api/create-post"
          className="bg-amber-900 text-white rounded-lg p-2"
        >
          Create Post
        </button>
    </form>
  );
}
