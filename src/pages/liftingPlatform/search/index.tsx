/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { Banner } from "@/components/shared/Banner/Banner";
import banner from "@/assets/img/scissor-lift.jpg";
import { FilterBar } from "@/components/Search/FilterBar/FilterBar";
import { Section } from "@/components/shared/Section/Section";
import { ProductList } from "@/components/Search/ProductList/ProductList";
import { Footer } from "@/components/shared/Footer/Footer";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { CartModal } from "@/components/shared/CartModal/CartModal";
import { Header } from "@/components/shared/Header/Header";
import {
  Filters,
  RefinementCrumbs,
  Refinements,
  Refinement,
} from "@/dtos/SearchProducts";
import { getImage } from "@/services/hooks/getImage";
import _ from "lodash";
import { updateParagraphs } from "@/utils/texts";
import { useRouter } from "next/router";

export default function Search() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState<any>();
  const [filters, setFilters] = useState<Filters[]>([]);
  const [refinementCrumbs, setRefinementCrumbs] = useState([]);
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = useState<Refinement[]>([]);

  const { isDesktop, isMobile } = useScreenWidth();

  const navigationObject: any = {
    displayName: "Equipamentos",
    refinements: [
      {
        link: "",
        label: "Plataformas Elevatórias",
      },
      {
        link: "/compressores/busca",
        label: "Compressores",
      },
      {
        link: "/geradores/busca",
        label: "Geradores",
      },
    ],
  };

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const mapFilters = () => {
    const newState: Refinement[] = refinementCrumbs
      .filter(
        (crumb: RefinementCrumbs) =>
          crumb.label !== "Leves" &&
          crumb.label !== "Geradores" &&
          crumb.label !== "Compressores"
      )
      .map((crumb: RefinementCrumbs) => {
        return {
          link: crumb.removeAction.link,
          label: crumb.label,
        };
      });

    setSelectedFilters(newState);
  };

  useEffect(() => {
    mapFilters();
  }, [refinementCrumbs]);

  useEffect(() => {
    localStorage.setItem("paymentFlow", "rentalLight");
  }, []);

  const onSelectFilter = async (label: string, link: string) => {
    if (link === "/compressores/busca" || link === "/geradores/busca")
      return router.push(link);
    const response =
      link === "?pageSize=150"
        ? await initialSearchRequest("?N=423258165")
        : await initialSearchRequest(link);
    const formattedResponse = await response.json();
    setProducts(formattedResponse.products[0]);
    const usedFilters = formattedResponse.refinementCrumbs
      .filter(
        (crumb: RefinementCrumbs) =>
          crumb.label !== "Leves" &&
          crumb.label !== "Geradores" &&
          crumb.label !== "Compressores"
      )
      .map((filter: RefinementCrumbs) => {
        return {
          displayName: filter.displayName,
          refinements: [
            {
              link: filter.removeAction.link,
              label: filter.label,
            },
          ],
        };
      });
    console.log("used", usedFilters);
    const repeatedMenu = formattedResponse.filters.map((used: Filters) => {
      const repeated = usedFilters.filter(
        (filter: RefinementCrumbs) => used.displayName === filter.displayName
      );
      if (repeated.length > 0) {
        repeated.forEach((rep: Filters) => {
          used.refinements.splice(0, 0, rep.refinements[0]);
          const index = usedFilters.indexOf(rep);
          usedFilters.splice(index, 1);
        });
        return used;
      }
      return used;
    });

    const groupedMap: Record<string, Refinements[]> = {};

    const resultArray: Filters[] = [];

    usedFilters.forEach((item: Filters) => {
      if (!groupedMap[item.displayName]) {
        groupedMap[item.displayName] = item.refinements;
        resultArray.push(item);
      } else {
        groupedMap[item.displayName].push(...item.refinements);
        const existingItem = resultArray.find(
          (resultItem) => resultItem.displayName === item.displayName
        );
        if (existingItem) {
          existingItem.refinements = groupedMap[item.displayName];
        }
      }
    });

    const newFilters: Array<Filters> =
      resultArray.length < 0
        ? [...usedFilters, ...repeatedMenu]
        : [...resultArray, ...repeatedMenu];

    newFilters.unshift(navigationObject);
    const removeCategory = newFilters.filter(
      (filt: Filters) => filt.displayName !== "Categoria"
    );

    setFilters(removeCategory);
    setRefinementCrumbs(formattedResponse.refinementCrumbs);
  };

  const clearFilters = () => null;

  const submitFilters = () => null;

  const searchRequest = (product: string) => {
    const requestBody = {
      category: "423258165",
      searchTerm: product,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    return fetch("/api/search", requestOptions);
  };

  const initialSearchRequest = (product: string) => {
    return fetch(`/api/search?productName=${product}`);
  };

  const onSearch = useCallback(async (term: string) => {
    const response = await searchRequest(term);
    const formattedResponse = await response.json();
    if (!!formattedResponse.error) return;
    setProducts(formattedResponse.products[0]);
    formattedResponse.filters?.unshift(navigationObject);
    const filters = formattedResponse.filters?.filter(
      (filt: RefinementCrumbs) => filt.displayName !== "Categoria"
    );
    setFilters(filters);
  }, []);

  const initialSearch = useCallback(async (term: string) => {
    const response = await initialSearchRequest(term);
    const formattedResponse = await response.json();
    if (!!formattedResponse.error) return;
    setProducts(formattedResponse.products[0]);
    formattedResponse.filters?.unshift(navigationObject);
    const filters = formattedResponse.filters?.filter(
      (filt: RefinementCrumbs) => filt.displayName !== "Categoria"
    );
    setFilters(filters);
  }, []);

  const getContent = useCallback(async () => {
    const result = await getImage("plataforma_elevatoria_busca");
    setContent(result.banner_search_platform[0]);
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const searchTerm = params.get("productName");
    const formHomeParams = params.get("localUtility");
    const productSearchCode = process.env.NEXT_PUBLIC_LIFTING_PLATFORMS;
    if (_.isEmpty(searchTerm)) {
      if (_.isEmpty(queryString) || !_.isEmpty(formHomeParams)) {
        initialSearch(`?N=${productSearchCode}`);
      } else {
        initialSearch(queryString);
      }
    } else {
      onSearch(searchTerm || `?N=${productSearchCode}`);
    }
    getContent();
  }, []);

  return isFiltersOpen && !isDesktop ? (
    <FilterBar
      filters={filters}
      refinementCrumbs={refinementCrumbs}
      onSearch={onSearch}
      submitFilters={submitFilters}
      onSelectFilter={onSelectFilter}
      setIsFiltersOpen={setIsFiltersOpen}
      clearFilters={clearFilters}
    />
  ) : (
    <>
      <Header onSearch={onSearch} />
      <main>
        <Banner
          breadcrumb={
            isDesktop ? "Home > Buscar equipamento" : "Buscar equipamento"
          }
          title={content?.fields.content_title}
          backgroundImage={content?.fields.native.links[0].href}
        />
        <Section containerClass="flex py-10 gap-5">
          {isDesktop && (
            <FilterBar
              filters={filters}
              refinementCrumbs={refinementCrumbs}
              onSearch={onSearch}
              onSelectFilter={onSelectFilter}
              clearFilters={clearFilters}
              page="Plataformas Elevatórias"
            />
          )}
          <ProductList
            products={products}
            itemType="Equipamentos"
            selectedFilters={selectedFilters}
            onRemoveFilter={onSelectFilter}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </Section>
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
      {isMobile && <CartModal />}
    </>
  );
}
