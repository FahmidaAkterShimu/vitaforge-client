import Banner from "@/components/homePage/Banner";
import ReadyToTransform from "@/components/homePage/ReadyToTransform";
import Stats from "@/components/homePage/Stats";
import WhyVitaForge from "@/components/homePage/WhyVitaForge";

export default function Home() {
  return (
    <div>
      <Banner />
      <Stats />
      <WhyVitaForge />
      <ReadyToTransform />
    </div>
  );
}
