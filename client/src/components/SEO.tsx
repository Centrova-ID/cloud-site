/* SEO layer: keeps each route discoverable with unique metadata, canonical URLs, social cards, and JSON-LD. */
import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  schema?: Record<string, unknown>;
};

const siteUrl = "https://cloud.centrova.id";
const defaultImage = `${siteUrl}/manus-storage/vps-addon-hero_7aa17125.png`;

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attribute, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

export default function SEO({ title, description, path, image = defaultImage, schema }: SEOProps) {
  useEffect(() => {
    const url = `${siteUrl}${path === "/" ? "/" : path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "VPS Addon");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", "Ilustrasi layanan VPS Addon untuk website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const oldSchema = document.getElementById("route-schema");
    oldSchema?.remove();
    const schemaNode = document.createElement("script");
    schemaNode.id = "route-schema";
    schemaNode.type = "application/ld+json";
    schemaNode.textContent = JSON.stringify(schema ?? {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      isPartOf: { "@type": "WebSite", name: "VPS Addon", url: siteUrl },
      primaryImageOfPage: { "@type": "ImageObject", url: image },
    });
    document.head.appendChild(schemaNode);

    return () => oldSchema?.remove();
  }, [title, description, path, image, schema]);

  return null;
}
