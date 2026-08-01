import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { heroSlide } from "./heroSlide";
import { sermon } from "./sermon";
import { program } from "./program";
import { staffMember } from "./staffMember";
import { testimonial } from "./testimonial";
import { galleryImage } from "./galleryImage";
import { faq } from "./faq";
import { aboutContent } from "./aboutContent";
import { contactSubmission } from "./contactSubmission";
import { newsletterSubmission } from "./newsletterSubmission";
import { giveConfirmation } from "./giveConfirmation";
import { arkvilleRegistration } from "./arkvilleRegistration";
import { discipleshipRegistration } from "./discipleshipRegistration";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    heroSlide,
    sermon,
    program,
    staffMember,
    testimonial,
    galleryImage,
    faq,
    aboutContent,
    contactSubmission,
    newsletterSubmission,
    giveConfirmation,
    arkvilleRegistration,
    discipleshipRegistration,
  ],
};
