import Banner from "@/components/homePage/Banner";
import FeaturedClasses from "@/components/homePage/FeaturedClasses";
import LatestForumPosts from "@/components/homePage/LatestForumPosts";
import ReadyToTransform from "@/components/homePage/ReadyToTransform";
import Stats from "@/components/homePage/Stats";
import WhyVitaForge from "@/components/homePage/WhyVitaForge";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedClasses />
      <Stats />
      <LatestForumPosts />
      <WhyVitaForge />
      <ReadyToTransform />
    </div>
  );
}
