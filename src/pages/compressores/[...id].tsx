import { useCallback, useEffect, useState } from "react";
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
import { updateParagraphs } from "@/utils/texts";
import { ProductOCC } from "@/types";
import { DeleteCartModal } from "@/components/shared/DeleteCartModal/DeleteCartModal";

export default function ProductDetails() {
  const router = useRouter();
  const { id: idArray } = router.query;
  const id = idArray?.[1] ?? "";

  const [deleteCartProducts, setDeleteCartProducts] = useState<any>([]);

  const [currentProduct, setCurrentProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [banner, setBanner] = useState<any>();
  const [theme, setTheme] = useState<"rentalLight" | "rentalHeavy">();
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  useEffect(() => {
    updateParagraphs();
    const storedItems =
      localStorage?.getItem("items") ?? ""
        ? JSON.parse(localStorage?.getItem("items") ?? "")
        : [];

    const itemExists = storedItems.some(
      (storedItem: any) => storedItem?.id === id
    );

    if (itemExists) setDisabledBtn(true);
  }, [banner]);

  const getProduct = async (id: string) => {
    const response = await fetch(`/api/product?product=${id}`);

    const formattedResponse = await response.json();
    if (!!formattedResponse.error) return;
    setCurrentProduct(formattedResponse);
    setRelatedProducts(formattedResponse.relatedProducts);
  };

  const getContent = useCallback(async () => {
    const currentSiteTheme: any = localStorage.getItem("paymentFlow");
    if (currentSiteTheme === "rentalLight") {
      const result = await getImage("plataforma_elevatoria_busca");
      setBanner(result.banner_search_platform[0]);
    } else {
      const result = await getImage("buscar_equipamento_pesados");
      setBanner(result.banner_search_equipment[0]);
    }
  }, []);

  useEffect(() => {
    const currentSiteTheme: any = localStorage.getItem("paymentFlow");
    if (_.isEmpty(theme)) {
      setTheme(currentSiteTheme);
    }
  }, []);

  useEffect(() => {
    getContent();
    if (typeof id !== "string" && !_.isEmpty(currentProduct)) return;
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
        paymentFlow: localStorage.getItem("paymentFlow"),
      });

      const filteredItems = storedItems.filter(
        (item: ProductOCC) => item?.type === product.type
      );

      const deleteCart = filteredItems.length !== storedItems.length;

      if (deleteCart) {
        setDeleteCartProducts(filteredItems);
      } else {
        confirmCart(storedItems);
      }
    } else {
      setDisabledBtn(true);
    }
  };

  const confirmCart = (products: any) => {
    localStorage.setItem("items", JSON.stringify(products));
    router.push("/carrinho/passo-01");
  };

  const removeFromCart = (product: any) => {
    const storedItems =
      localStorage.getItem("items") ?? ""
        ? JSON.parse(localStorage.getItem("items") ?? "")
        : [];

    function arrayRemove(arr: [], value: {}) {
      return arr.filter(function (geeks) {
        return geeks != value;
      });
    }

    if (storedItems.length > 1) {
      storedItems?.map((items: any, index: number) => {
        if (items.id === product.id) {
          const filteredArry = arrayRemove(storedItems, items);
          localStorage.setItem("items", JSON.stringify(filteredArry));
        }
      });
    } else {
      localStorage.removeItem("items");
    }

    setDisabledBtn(false);
  };

  return (
    <>
      <Header theme={theme} />
      <main>
        <Banner
          breadcrumb="Home > Buscar equipamento"
          title={banner?.fields.content_title}
          backgroundImage={banner?.fields.native.links[0].href}
        />
        {!_.isEmpty(currentProduct) && (
          <Details
            product={currentProduct}
            addToCart={addToCart}
            theme={theme}
            isDisabled={disabledBtn}
            removeFromCart={removeFromCart}
          />
        )}
        <ExpertRecommendation />
        {!_.isEmpty(relatedProducts) && (
          <ProductRecommendations products={relatedProducts} />
        )}
        <MachinesAndPlatforms />
      </main>
      <Footer theme={theme} />
      <CartModal />
      {!_.isEmpty(deleteCartProducts) && (
        <DeleteCartModal
          onConfirm={() => confirmCart(deleteCartProducts)}
          onClose={() => setDeleteCartProducts([])}
        />
      )}
    </>
  );
}
