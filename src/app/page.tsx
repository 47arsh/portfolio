import { About } from "@/components/About";
import { ActivityStrip } from "@/components/ActivityStrip";
import { Contact } from "@/components/Contact";
import { Earlier } from "@/components/Earlier";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { OpenSource } from "@/components/OpenSource";
import { ShippedList } from "@/components/ShippedList";
import { Sound } from "@/components/Sound";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <ShippedList />
      <OpenSource />
      <ActivityStrip />
      <Sound />
      <Earlier />
      <About />
      <Contact />
    </>
  );
}
