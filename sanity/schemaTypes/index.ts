import { blogPost } from "./documents/blog-post";
import { portfolioProject } from "./documents/portfolio-project";
import { service } from "./documents/service";
import { siteSettings } from "./documents/site-settings";
import { siteHeader } from "./documents/site-header";
import { siteFooter } from "./documents/site-footer";
import { cmsImage } from "./objects/cms-image";
import { faqItem } from "./objects/faq-item";
import { projectSection } from "./objects/project-section";
import { seo } from "./objects/seo";
import { homePage } from "./documents/home-page";
import { aboutPage } from "./documents/about-page";
import { contactPage } from "./documents/contact-page";
import { termsPage } from "./documents/terms-page";
import { privacyPage } from "./documents/privacy-page";
import { servicesPage } from "./documents/services-page";
import { enquiry } from "./documents/enquiry";
import {
  legalParagraph,
  legalSubheading,
  legalList,
  legalTableRow,
  legalTable,
  legalSection,
} from "./objects/legal-block";

export const schemaTypes = [
  // shared objects
  cmsImage,
  faqItem,
  seo,
  projectSection,
  legalParagraph,
  legalSubheading,
  legalList,
  legalTableRow,
  legalTable,
  legalSection,
  // singletons
  siteSettings,
  siteHeader,
  siteFooter,
  // documents
  service,
  portfolioProject,
  blogPost,
  homePage,
  aboutPage,
  contactPage,
  termsPage,
  privacyPage,
  servicesPage,
  enquiry,
];
