import { StackCompactIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const linkItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

export const siteFooter = defineType({
  name: "siteFooter",
  title: "Footer",
  type: "document",
  icon: StackCompactIcon,
  fields: [
    // ── Brand Column ─────────────────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Footer Logo",
      type: "cmsImage",
      description: "Logo shown in the bottom-left brand column.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Brand Tagline",
      type: "text",
      rows: 3,
      description: "Short description shown below the logo.",
      validation: (rule) => rule.required(),
    }),

    // ── Services Column ──────────────────────────────────────────────────────
    defineField({
      name: "servicesColumn",
      title: "Services Column",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [linkItem],
          validation: (r) => r.min(1).required(),
        }),
      ],
    }),

    // ── Quick Links Column ───────────────────────────────────────────────────
    defineField({
      name: "quickLinksColumn",
      title: "Quick Links Column",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [linkItem],
          validation: (r) => r.min(1).required(),
        }),
      ],
    }),

    // ── Contact Column ───────────────────────────────────────────────────────
    defineField({
      name: "contactColumn",
      title: "Contact Column",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
          description: 'Display text, e.g. "(470) 841-2335".',
        }),
        defineField({
          name: "phoneHref",
          title: "Phone Link",
          type: "string",
          description: 'tel: link, e.g. "tel:+14708412335".',
        }),
        defineField({
          name: "email",
          title: "Email Address",
          type: "string",
        }),
        defineField({
          name: "emailHref",
          title: "Email Link",
          type: "string",
          description: 'mailto: link, e.g. "mailto:info@sparklinemarketingfirm.com".',
        }),
        defineField({
          name: "address",
          title: "Physical Address",
          type: "string",
          description: "Display text for the address.",
        }),
        defineField({
          name: "addressHref",
          title: "Address Link",
          type: "string",
          description: 'Link for the address, e.g. "/contact" or a Google Maps URL.',
        }),
      ],
    }),

    // ── Social / Follow Us Column ────────────────────────────────────────────
    defineField({
      name: "socialColumn",
      title: "Follow Us Column",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "links",
          title: "Social Links",
          type: "array",
          description: 'Use platform names as labels exactly: "Facebook", "Instagram", "LinkedIn", "X" — the frontend maps these to icons.',
          of: [linkItem],
          validation: (r) => r.min(1).required(),
        }),
      ],
    }),

    // ── Bottom Bar ───────────────────────────────────────────────────────────
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: 'Shown in the footer bottom bar, e.g. "© 2026 SPARKLINE MARKETING FIRM. All Rights Reserved."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bottomGraphicUrl",
      title: "Bottom Decorative Graphic URL",
      type: "url",
      description: "URL of the decorative image displayed at the very bottom of the footer.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
