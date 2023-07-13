import { Banner } from "@/components/shared/Banner/Banner";
import { About } from "@/components/Category/About/About";
import { WhereToUse } from "@/components/Category/WhereToUse/WhereToUse";
import { ProductCarousel } from "@/components/Category/ProductCarousel/ProductCarousel";
import { AboutRental } from "@/components/Category/AboutRental/AboutRental";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { info } from "@/components/Category/utils";

const Category: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Banner {...info.banner} blur="bg-black/[0.6]" />
        <About {...info.about} />
        <WhereToUse {...info.whereToUse} />
        {info.productCarousels.map((productCarousel) => (
          <ProductCarousel
            key={productCarousel.id}
            variant={
              productCarousel.backgroundColor === "bg-orange-500"
                ? "white"
                : undefined
            }
            {...productCarousel}
          />
        ))}
        <AboutRental {...info.aboutRental} />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Category;
