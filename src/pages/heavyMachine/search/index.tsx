/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { Banner } from "@/components/shared/Banner/Banner";
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
import { truck } from "@/assets";
import Button from "@/components/shared/Button/Button";
import _ from "lodash";
import { updateParagraphs } from "@/utils/texts";
import { TalkToSpecialistModal } from "@/components/shared/TalkToSpecialistModal/TalkToSpecialistModal";

export default function HeavyMachineSearch() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState<any>();
  const [filters, setFilters] = useState<Filters[]>([]);
  const [refinementCrumbs, setRefinementCrumbs] = useState([]);

  useEffect(() => {
    updateParagraphs();
  }, [content]);

  const [selectedFilters, setSelectedFilters] = useState<Refinement[]>([]);

  const { isDesktop, isMobile } = useScreenWidth();

  const mapFilters = () => {
    const newState: Refinement[] = refinementCrumbs
      .filter((crumb: RefinementCrumbs) => crumb.label !== "Pesados")
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
    localStorage.setItem("paymentFlow", "rentalHeavy");
  }, []);

  const onSelectFilter = async (label: string, link: string) => {
    const response = link === "?pageSize=150"
      ? await initialSearchRequest("?N=3592201831")
      : await initialSearchRequest(link);
    const formattedResponse = await response.json();
    setProducts(formattedResponse.products[0]);
    const usedFilters = formattedResponse.refinementCrumbs
      .filter((crumb: RefinementCrumbs) => crumb.label !== "Pesados")
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
    setFilters(newFilters);
    setRefinementCrumbs(formattedResponse.refinementCrumbs);
  };

  const clearFilters = () => null;

  const submitFilters = () => null;

  const searchRequest = (product: string) => {
    const requestBody = {
      category: "3592201831",
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
    if (formattedResponse.error) return;
    setProducts(formattedResponse.products[0]);
    setFilters(formattedResponse.filters);
  }, []);

  const initialSearch = useCallback(async (term: string) => {
    const response = await initialSearchRequest(term);
    const formattedResponse = await response.json();
    if (formattedResponse.error) return;
    setProducts(formattedResponse.products[0]);
    setFilters(formattedResponse.filters);
  }, []);

  const getContent = useCallback(async () => {
    const result = await getImage("buscar_equipamento_pesados");
    setContent(result.banner_search_equipment[0]);
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const searchTerm = params.get("productName");
    const formHomeParams = params.get("localUtility");
    const productSearchCode = process.env.NEXT_PUBLIC_HEAVY_MACHINES;

    const searchParam = queryString
      ? `?N=${productSearchCode}&${queryString.substring(1)}`
      : `?N=${productSearchCode}`;

    if (_.isEmpty(searchTerm)|| !_.isEmpty(formHomeParams)) {
      initialSearch(searchParam);
    } else {
      onSearch(searchTerm ?? `?N=${productSearchCode}`);
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
      <Header onSearch={onSearch} theme="rentalHeavy" />
      <main>
        <Banner
          breadcrumb={isDesktop ? "Home > Buscar máquina" : "Buscar máquina"}
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
            />
          )}
          <ProductList
            products={products}
            itemType="MaquinasPesadas"
            selectedFilters={selectedFilters}
            onRemoveFilter={onSelectFilter}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </Section>
        <ExpertRecommendation />
        <MachinesAndPlatforms />
        <div className="flex justify-center w-full fixed bg-green-900 bottom-0 py-4">
          <div className="flex align-middle items-center justify-between container tablet:flex-col tablet:text-xs tablet:px-6 tablet:text-center">
            <div className="flex align-middle items-center gap-10 text-white ">
              <img
                src={truck.src}
                alt="truck"
                className="tablet:hidden max-h-[38px]"
              />
              <span className="max-w-[520px] tablet:max-w-full font-semibold">
                Fale com um de nossos consultores para ver outras categorias,
                marcas, modelos e acessórios disponíveis para consulta.
              </span>
            </div>
            <TalkToSpecialistModal>
              <Button className="py-2 px-14 tablet:mt-3 w-[260px]">
                <p className="text-sm font-semibold">Fale com um consultor</p>
              </Button>
            </TalkToSpecialistModal>
          </div>
        </div>
      </main>
      <Footer />
      {isMobile && <CartModal />}
    </>
  );
}
