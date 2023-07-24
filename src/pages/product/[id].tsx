import { useEffect, useState } from "react";
import { ProductRecommendations } from "@/components/Product/ProductRecommendations/ProductRecommendations";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Footer } from "@/components/shared/Footer/Footer";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Details } from "@/components/Product/Details/Details";
import { Banner } from "@/components/shared/Banner/Banner";
import banner from "@/assets/img/elevatingPlatforms.jpg";
import { Header } from "@/components/shared/Header/Header";
import { useRouter } from "next/router";
import _ from "lodash";
import productImageSample from "@/assets/img/product-sample.jpg";
import { FloatingButtons } from "@/components/shared/FloatingButtons/FloatingButtons";
import { CartModal } from "@/components/shared/CartModal/CartModal";
import { products } from "@/components/Product/utils";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [currentProduct, setCurrentProduct] = useState({});

  const product = {
    brand: "JPG",
    displayName: "Plataforma Elevatória Articulada Lança - Diesel - 45 pés",
    image: productImageSample,
    description:
      "A plataforma possui controle da velocidade do motor e possui um tempo de elevação 50% mais rápido que os equipamentos equivalentes. Seu alcance horizontal também é meio metro mais longo, proporcionando uma maior área de trabalho.",
    x_alcanceHorizontalM: "15",
    x_alturaDeTrabalhoM: "15",
    x_emissoMdiaKgDeCOH: "15",
    x_peso: "15",
    needTraining: true,
    needEquipment: true,
  };

  const getProduct = async (id: string) => {
    const response = await fetch(`/api/product?product=${id}`);

    const formattedResponse = await response.json();
    if (!!formattedResponse.error) return;

    setCurrentProduct(formattedResponse);
  };

  useEffect(() => {
    if (typeof id !== "string") return;
    getProduct(id);
  }, [id]);

  const addToCart = (id: string) => null;

  return (
    <>
      <Header />
      <main>
        <Banner
          breadcrumb="Home > Buscar equipamento"
          title="Encontre a plataforma ideal"
          backgroundImage={banner.src}
        />
        {!_.isEmpty(currentProduct) && (
          <Details product={currentProduct} addToCart={addToCart} />
        )}
        <ExpertRecommendation />
        <ProductRecommendations products={products} />
        <MachinesAndPlatforms />
      </main>
      <Footer />
      <CartModal />
    </>
  );
}
