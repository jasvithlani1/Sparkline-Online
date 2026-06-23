import { InboxIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  icon: InboxIcon,
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "🟢 New", value: "new" },
          { title: "👁 Read", value: "read" },
          { title: "🗄 Archived", value: "archived" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 6,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: "name",
      email: "email",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare({ name, email, submittedAt, status }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Unknown date";
      const badge = status === "new" ? "🟢 " : status === "archived" ? "🗄 " : "";
      return {
        title: `${badge}${name ?? "Unknown"} — ${email ?? ""}`,
        subtitle: date,
      };
    },
  },
});
