import { useCallback, useEffect, useState} from "react";
import { ProductRecommendations } from "@/components/Product/ProductRecommendations/ProductRecommendations";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { Footer } from "@/components/shared/Footer/Footer";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Details } from "@/components/Product/Details/Details";
import { Banner } from "@/components/shared/Banner/Banner";
import { Header } from "@/components/shared/Header/Header";
import { useRouter } from "next/router";
import _ from "lodash";
import { CartModal } from "@/components/shared/CartModal/CartModal";
import { getImage } from "@/services/hooks/getImage";


export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [currentProduct, setCurrentProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [banner, setBanner] = useState<any>();
  const [theme, setTheme] = useState<"rentalLight" | "rentalHeavy">();

  const getProduct = async (id: string) => {
    const response = await fetch(`/api/product?product=${id}`);

    const formattedResponse = await response.json();
    if (!!formattedResponse.error) return;
    setCurrentProduct(formattedResponse);
    setRelatedProducts(formattedResponse.relatedProducts);
  };

  const getContent = useCallback(async () => {
    if (theme === "rentalLight") {
      const result = await getImage("plataforma_elevatoria_busca");
      setBanner(result.banner_search_platform[0]);
    }
    const result = await getImage("buscar_equipamento_pesados");
      setBanner(result.banner_search_equipment[0]);
  }, []);

  useEffect(() => {
    const currentSiteTheme: any = localStorage.getItem("paymentFlow");
    if (_.isEmpty(theme)) {
      setTheme(currentSiteTheme)
    } 
  }, []);

  useEffect(() => {
    getContent();
    if (typeof id !== "string") return;
    getProduct(id);
  }, [id]);

  const addToCart = (product: any) => {
    const storedItems =
      localStorage.getItem("items") ?? ""
        ? JSON.parse(localStorage.getItem("items") ?? "")
        : [];

    const itemExists = storedItems.some(
      (storedItem: any) => storedItem.id === product.id
    );
    if (!itemExists) {
      storedItems.push({
        ...product,
        localUtility: null,
        timeToLocale: 0,
        typeToLocale: "Dias",
        quantity: 1,
      });
      localStorage.setItem("items", JSON.stringify(storedItems));
    } else {
    }
    router.push("/carrinho/passo-01");
  };

  return (
    <>
      <Header theme={theme}/>
      <main>
        <Banner
          breadcrumb="Home > Buscar equipamento"
          title={banner?.fields.content_title}
          backgroundImage={banner?.fields.native.links[0].href}
        />
        {!_.isEmpty(currentProduct) && (
          <Details product={currentProduct} addToCart={addToCart} theme={theme}/>
        )}
        <ExpertRecommendation />
        {!_.isEmpty(relatedProducts) && (
          <ProductRecommendations products={relatedProducts} />
        )}
        <MachinesAndPlatforms/>
      </main>
      <Footer  theme={theme} />
      <CartModal />
    </>
  );
}
