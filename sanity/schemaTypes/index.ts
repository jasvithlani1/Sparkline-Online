import { blogPost } from "./documents/blog-post";
import { portfolioProject } from "./documents/portfolio-project";
import { service } from "./documents/service";
import { cmsImage } from "./objects/cms-image";
import { faqItem } from "./objects/faq-item";
import { projectSection } from "./objects/project-section";
import { seo } from "./objects/seo";

export const schemaTypes = [
  cmsImage,
  faqItem,
  seo,
  projectSection,
  service,
  portfolioProject,
  blogPost,
];
