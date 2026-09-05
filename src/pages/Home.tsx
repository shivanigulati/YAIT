import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Stats from "../components/home/Stats";
import Gallery from "../components/home/Gallery";
import WhyYaIt from "../components/home/WhyYaIt";
import VisionValues from "../components/home/VisionValues";
import AreasWeSupport from "../components/home/AreasWeSupport";
import OurStory from "../components/home/OurStory";
import GetSupport from "../components/home/GetSupport";
import FinalCta from "../components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Gallery />
      <WhyYaIt />
      <VisionValues />
      <AreasWeSupport />
      <OurStory />
      <GetSupport />
      <FinalCta />
    </>
  );
}
