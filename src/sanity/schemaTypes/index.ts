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
import { liveStatus } from "./liveStatus";
import { youtubeShort } from "./youtubeShort";
import { upcomingEvent } from "./upcomingEvent";
import { eventRegistration } from "./eventRegistration";
import { ministrationVideo } from "./ministrationVideo";
import { audioMinistration } from "./audioMinistration";
import { pastorBook } from "./pastorBook";
import { libraryDocument } from "./libraryDocument";

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
    liveStatus,
    youtubeShort,
    upcomingEvent,
    ministrationVideo,
    audioMinistration,
    pastorBook,
    libraryDocument,
    contactSubmission,
    newsletterSubmission,
    giveConfirmation,
    arkvilleRegistration,
    discipleshipRegistration,
    eventRegistration,
  ],
};
