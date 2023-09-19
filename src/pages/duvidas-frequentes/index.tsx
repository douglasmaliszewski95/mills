import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { RightImgWithLeftText } from "@/components/ProductTypeAndSegment/RightImgWithLeftText";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { getImage } from "@/services/hooks/getImage";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import Image from "next/image";
import chevronRight from "@/assets/chevron-right.svg";
import Button from "@/components/shared/Button/Button";
import { getText } from "@/services/hooks/getText";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import closeIcon from "@/assets/close.svg";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { currentSiteThemeContext } from "@/services/hooks/useCurrentSiteTheme";

export default function Faq() {
  const [content, setContent] = useState<any>();
  const getContent = useCallback(async () => {
    const images = await getImage("duvidas_frequentes");
    const texts = await getText("faq");
    let categories: string[] = [];

    const banner = {
      img: images?.banner_faq_light?.[0].fields.native.links[0].href,
      title: images?.banner_faq_light?.[0].fields.content_title,
      mobileObj:
        images?.banner_faq_light?.[0].mobileObj.fields.native.links[0].href,
    };

    const knowOurProducts = {
      img: images?.know_our_products?.[0].fields.native.links[0].href,
      title: images?.know_our_products?.[0].fields.content_title,
      text: images?.know_our_products?.[0].fields.content_text,
    };

    const questions = texts?.faq_questions?.map((question: any) => {
      return {
        title: question.fields.title,
        text: question.fields.text_field[0],
        categories: question.fields.subtitle,
        href: question.fields.hrefButton,
      };
    });

    questions?.map((item: any) => {
      item.categories.map((category: string) => {
        if (!categories.includes(category)) categories.push(category);
      });
    });
    setContent({
      banner: banner || null,
      knowOurProducts: knowOurProducts || null,
      questions: questions || null,
      categories,
    });
    setFilterQuestions(questions);
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  const [filterQuestions, setFilterQuestions] = useState<any>(
    content?.questions
  );
  const [filterCategories, setFilterCategories] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { isMobile } = useScreenWidth();

  const { currentSiteTheme } = useContext(currentSiteThemeContext);

  const handleQuestion = (question: string) => {
    router.push(question);
  };

  const filterFaqQuestions = (category: string, searchInput: string) => {
    if (category) {
      let categories: string[] = filterCategories;
      if (!filterCategories.includes(category)) {
        categories.push(category);
        setFilterCategories(categories);
      }
      let result: any[] = [];
      filterCategories.map((x: string) => {
        const getQuestions = content?.questions.filter((item: any) =>
          item.categories.includes(x)
        );
        getQuestions.map((item: any) => {
          result.push(item);
        });
      });
      setFilterQuestions(result);
    } else if (searchInput) {
      let result: any[] = [];
      if (filterCategories.length > 0) {
        filterCategories.map((x: string) => {
          const getQuestions = content?.questions.filter((item: any) => item.categories.includes(x) && item.title.includes(searchInput));
          getQuestions.map((item: any) => {
            result.push(item);
          });
        });
      }
      else {
        const getQuestions = content?.questions.filter((item: any) => item.title.includes(searchInput));
        getQuestions.map((item: any) => {
          result.push(item)
        })
      };

      setFilterQuestions(result);
    } else setFilterQuestions(content?.questions);
  };

  const removeFilter = (item: string) => {
    let result: any[] = [];
    let categories: string[] = filterCategories.filter(
      (x: string) => x !== item
    );
    setFilterCategories(categories);
    categories.map((x: string) => {
      const getQuestions = content?.questions.filter((item: any) =>
        item.categories.includes(x)
      );
      getQuestions.map((item: any) => {
        result.push(item);
      });
    });
    setFilterQuestions(result.length > 0 ? result : content?.questions);
  };

  return (
    <>
      <Header />
      <main>
        <Banner
          subTitle={content?.banner.title}
          title={content?.banner.title}
          backgroundImage={
            isMobile ? content?.banner.mobileObj : content?.banner.img
          }
          blur="bg-black/50"
        />
        <section className="flex justify-center bg-gray-50 font-ibm-font">
          <div className="container justify-center py-5">
            <label className="text-green-800 text-lg font-bold tablet:px-3">
              Busque por palavra-chave
            </label>
            <div className="flex justify-between py-3 tablet:flex-col tablet:px-3">
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex.: Plataforma tesoura"
                className="box-border w-[77%] h-[32px] outline-none bg-gray-50 border-green-800 border-b-[1px] text-sm tablet:w-full tablet:mb-5"
              />
              <Button
                type="submit"
                variant="default"
                className="max-w-[265px] w-[20%] tablet:w-full"
                onClick={() => filterFaqQuestions("", inputValue)}
              >
                Buscar
              </Button>
            </div>
            <label className="text-green-800 text-lg font-bold tablet:px-3">
              Busque por categorias
            </label>
            <div className="flex justify-between py-3 tablet:flex-col tablet:px-3">
              {content?.categories?.map((category: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center border-[2px] border-orange-500 py-3 w-[24%] tablet:w-full tablet:mb-2"
                  >
                    <button
                      onClick={() => filterFaqQuestions(category, "")}
                      className="text-orange-500 font-bold"
                    >
                      {category}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="flex justify-center font-ibm-font">
          <div className="container justify-center py-5">
            <div className="flex tablet:mb-5 tablet:px-3">
              <div className="h-fit flex border-[1px] border-orange-500 rounded pl-3 pr-3 py-1 gap-1 justify-between">
                <p className="text-green-800 text-xs">Todas</p>
              </div>
              {filterCategories?.map((category: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="h-fit flex border-[1px] border-orange-500 rounded pl-3 pr-1 py-1 ml-1 gap-1 justify-between"
                  >
                    <p className="text-green-800 text-xs">{category}</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => removeFilter(category)}
                    >
                      <Image width={6} height={6} src={closeIcon} alt="Xis" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="container flex items-center tablet:flex-col tablet:px-4">
              {filterQuestions?.length > 0 ? (
                [0, 1].map((columnIndex) => (
                  <div
                    key={columnIndex}
                    className="max-w-[50%] w-full py-12 h-full tablet:max-w-[100%] tablet:pl-0 tablet:pt-0 tablet:pb-5"
                  >
                    <ul
                      className={
                        columnIndex === 0
                          ? "w-full flex flex-col h-full justify-between pr-5"
                          : "w-full flex flex-col h-full justify-between pl-5"
                      }
                    >
                      {filterQuestions
                        ?.slice(columnIndex * 6, columnIndex * 6 + 6)
                        .map(({ title, href }: any, index: number) => (
                          <li key={index} className="pb-7">
                            <div
                              className="cursor-pointer pb-[3px] font-medium text-lg text-green-800 flex justify-between tablet:text-sm"
                              onClick={() => handleQuestion(href)}
                            >
                              <p>{title}</p>
                              <Image
                                src={chevronRight}
                                height={18}
                                alt="Seta apontada para a direita"
                              />
                            </div>
                            <div className="h-[0.1px] w-full bg-green-800 tablet:mb-7 tablet:mt-2" />
                          </li>
                        ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="container flex justify-center py-5 text-green-800 text-md font-semi-bold">
                  Termo não encontrado
                </p>
              )}
            </div>
          </div>
        </section>
        <ExpertRecommendation />
        <RightImgWithLeftText
          headerText={content?.knowOurProducts.title}
          text={content?.knowOurProducts.text}
          img={content?.knowOurProducts.img}
          bgColor={
            currentSiteTheme === "rentalLight"
              ? "bg-orange-500"
              : "bg-green-800"
          }
          buttonProps={{ text: "Ver modelos", link: "/" }}
        />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}