import type { StructureResolver } from "sanity/structure";

const singletons = new Set(["siteSettings", "aboutContent"]);
const submissionTypes = [
  "contactSubmission",
  "newsletterSubmission",
  "giveConfirmation",
  "arkvilleRegistration",
  "discipleshipRegistration",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("About Page Content")
        .id("aboutContent")
        .child(S.document().schemaType("aboutContent").documentId("aboutContent")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !singletons.has(item.getId() as string) &&
          !submissionTypes.includes(item.getId() as string)
      ),
      S.divider(),
      S.listItem()
        .title("Form Submissions")
        .child(
          S.list()
            .title("Form Submissions")
            .items(
              submissionTypes.map((type) =>
                S.listItem()
                  .title(type)
                  .child(S.documentTypeList(type).title(type))
              )
            )
        ),
    ]);
