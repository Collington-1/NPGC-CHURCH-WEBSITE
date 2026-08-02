import { Hero } from "@/components/home/hero";
import { WelcomeSection } from "@/components/home/welcome-section";
import { LatestSermons } from "@/components/home/latest-sermons";
import { ShortsGrid } from "@/components/home/shorts-grid";
import { ProgramsPreview } from "@/components/home/programs-preview";
import { MeetPastor } from "@/components/home/meet-pastor";
import { Testimonials } from "@/components/home/testimonials";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { GivingCta } from "@/components/home/giving-cta";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <LatestSermons />
      <ShortsGrid />
      <ProgramsPreview />
      <MeetPastor />
      <Testimonials />
      <GalleryPreview />
      <GivingCta />
      <ContactSection />
    </>
  );
}
