import { useState } from "react";
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
  filters,
  products,
  selectedFilters,
} from "@/components/shared/Search/utils";

export default function Search() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { isDesktop, isMobile } = useScreenWidth();

  const onRemoveFilter = (filter: string) => null;

  const onSelectFilter = (filter: string, isChecked: boolean) =>
    isChecked ? onRemoveFilter(filter) : null;

  const clearFilters = () => null;

  const submitFilters = () => null;

  return isFiltersOpen && !isDesktop ? (
    <FilterBar
      filters={filters}
      submitFilters={submitFilters}
      onSelectFilter={onSelectFilter}
      setIsFiltersOpen={setIsFiltersOpen}
      clearFilters={clearFilters}
    />
  ) : (
    <>
      <Header />
      <main>
        <Banner
          breadcrumb={
            isDesktop ? "Home > Buscar equipamento" : "Buscar equipamento"
          }
          title="Encontre a plataforma ideal"
          backgroundImage={banner.src}
        />
        <Section containerClass="flex py-10 gap-5">
          {isDesktop && (
            <FilterBar
              filters={filters}
              onSelectFilter={onSelectFilter}
              clearFilters={clearFilters}
            />
          )}
          <ProductList
            products={products}
            selectedFilters={selectedFilters}
            onRemoveFilter={onRemoveFilter}
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
