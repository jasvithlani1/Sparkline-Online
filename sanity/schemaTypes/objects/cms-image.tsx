import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Sanity cannot render SVG thumbnails natively, so we build a preview
// component that fetches the CDN URL and renders it via an <img> tag.
function CmsImagePreview({ alt, assetRef }: { alt?: string; assetRef?: string }) {
  if (!assetRef) return <ImageIcon />;
  // Convert asset _ref (image-<id>-<w>x<h>-<ext>) to CDN URL
  const [, id, dims, ext] = assetRef.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) ?? [];
  if (!id) return <ImageIcon />;
  const url = `https://cdn.sanity.io/images/8g3u06mk/production/${id}-${dims}.${ext}`;
  return (
    <img
      src={url}
      alt={alt ?? ""}
      style={{ width: "100%", height: "100%", objectFit: "contain", background: "#1a1a2e" }}
    />
  );
}

export const cmsImage = defineType({
  name: "cmsImage",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Uploaded image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fallbackUrl",
      title: "Fallback public URL",
      type: "string",
      description: "Existing public asset path, such as /images/work-firecrawl.png.",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "className",
      title: "Image class name",
      type: "string",
      description: "Optional rendering class used by the current site design.",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "fallbackUrl",
      assetRef: "image.asset._ref",
    },
    prepare({ title, subtitle, assetRef }: { title?: string; subtitle?: string; assetRef?: string }) {
      return {
        title: title ?? "No alt text",
        subtitle,
        media: () => <CmsImagePreview alt={title} assetRef={assetRef} />,
      };
    },
  },
});
