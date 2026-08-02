import type { StructureResolver } from "sanity/structure";

const singletons = new Set(["siteSettings", "aboutContent", "liveStatus"]);
const mediaLibraryTypes = [
  "youtubeShort",
  "ministrationVideo",
  "audioMinistration",
  "pastorBook",
  "libraryDocument",
];
const submissionTypes = [
  "contactSubmission",
  "newsletterSubmission",
  "giveConfirmation",
  "arkvilleRegistration",
  "discipleshipRegistration",
  "eventRegistration",
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
      S.listItem()
        .title("Live Stream Status")
        .id("liveStatus")
        .child(S.document().schemaType("liveStatus").documentId("liveStatus")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !singletons.has(item.getId() as string) &&
          !submissionTypes.includes(item.getId() as string) &&
          !mediaLibraryTypes.includes(item.getId() as string)
      ),
      S.divider(),
      S.listItem()
        .title("Media Library")
        .child(
          S.list()
            .title("Media Library")
            .items(
              mediaLibraryTypes.map((type) =>
                S.listItem()
                  .title(type)
                  .child(S.documentTypeList(type).title(type))
              )
            )
        ),
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
