import { getImage } from "@/services/hooks/getImage";
import { useEffect, useState } from "react";
import { getText } from "@/services/hooks/getText";
import {
  FormattedResponseProps,
  SegmentsProps,
} from "@/types/responseCMSTypes";

export const useGetCMSShared = () => {
  const [allPlatformsWeHave, setAllPlatformsWeHave] = useState<
    FormattedResponseProps | any
  >();
  const [talkToSpecialist, setTalkToSpecialist] = useState<
    FormattedResponseProps | any
  >();

  const [frequentQuestions, setFrequentQuestions] = useState<
    FormattedResponseProps | any
  >();
  const [platformsForAllBrazil, setPlatformsForAllBrazil] = useState<
    FormattedResponseProps | any
  >();
  const [machinesForAllBrazil, setMachinesForAllBrazil] = useState<
    FormattedResponseProps | any
  >();
  const [footerData, setFooterData] = useState<FormattedResponseProps | any>();
  const [footerList, setFooterList] = useState<FormattedResponseProps | any>();
  // const [equipmentFormList, setEquipmentFormList] = useState<
  //   FormattedResponseProps | any
  // >();

  const handleGetContent = async () => {
    try {
      const [shared, texts]: any = await Promise.all([
        getImage("shared"),
        getText("shared"),
      ]);      
      const frequentlyAskedQuestions = texts["frequently-asked-questions"];

      const descriptionsToKeep = [
        "plataforma elevatoria articulada",
        "plataforma elevatoria telescopica",
        "plataforma elevatoria tesoura",
      ];

      const filteredList = shared.segments?.filter((item: SegmentsProps) =>
        descriptionsToKeep.includes(item.description)
      );

      let filterQuestions: any[] = [];
      for (let i = 0; i < frequentlyAskedQuestions?.[0].fields.subtitle?.length; i++) {
        if (filterQuestions.length === 6) break;
        else {
          filterQuestions.push({
            question: frequentlyAskedQuestions?.[0].fields.subtitle[i],
            href: frequentlyAskedQuestions?.[0].fields.hrefButton[i],
          });
        }
      }

      setTalkToSpecialist({
        headerText: shared?.falecomespecialista?.[0]?.fields?.content_title,
        buttonText: "Fale com um especialista",
        bgImage:
          shared?.falecomespecialista?.[0]?.fields?.native?.links[0]?.href,
        bgImageMobile:
          shared?.falecomespecialista?.[0]?.mobileObj?.fields?.native?.links[0]
            ?.href,
      });

      setAllPlatformsWeHave({
        headerText:
          "Conheça cada tipo de plataforma e descubra a ideal para o seu projeto",
        cards: filteredList
          ?.map((card: SegmentsProps) => {
            return {
              image: card.fields.native.links[0].href,
              headerText: card.fields.content_title,
              order: card.fields.content_order,
              imageMobile: card?.mobileObj.fields.native.links[0].href,
              buttonText: "Ver modelos",
              link: card.fields.href_attribute,
            };
          })
          .sort((a: any, b: any) => a.order - b.order),
      });

      setFrequentQuestions({
        title: texts?.frequently_asked_questions_info?.[0].fields.title,
        text: texts?.frequently_asked_questions_info?.[0].fields.text_field,
        href:
          texts?.frequently_asked_questions_info?.[0].fields?.hrefButton ?? "#",
        questions_fields: filterQuestions,
      });

      setPlatformsForAllBrazil({
        title: texts?.platforms_for_all_brazil?.find(
          (x: any) => x.fields.title !== null
        ).fields.title,
        sections: [
          texts?.rent_platforms_sudeste?.[0],
          texts?.rent_platforms_nordeste?.[0],
          texts?.rent_platforms_norte?.[0],
          texts?.rent_platforms_sul?.[0],
          texts?.rent_platforms_centro_oeste?.[0],
        ],
        mobileSections: [
          texts?.mobile_rent_platforms_sudeste?.[0],
          texts?.mobile_rent_platforms_nordeste?.[0],
          texts?.mobile_rent_platforms_norte?.[0],
          texts?.mobile_rent_platforms_sul?.[0],
          texts?.mobile_rent_platforms_centro_oeste?.[0],
        ],
        listItems: texts?.rent_platforms_highlights?.[0]
      });

      setMachinesForAllBrazil({
        title: texts?.heavy_machines_all_brazil?.find(
          (x: any) => x.fields.title !== null
        ).fields.title,
        sections: [
          texts?.rent_heavy_machinery_sudeste?.[0],
          texts?.rent_heavy_machinery_nordeste?.[0],
          texts?.rent_heavy_machinery_norte?.[0],
          texts?.rent_heavy_machinery_sul?.[0],
          texts?.rent_heavy_machinery_centro_oeste?.[0],
        ],
        mobileSections: [
          texts?.mobile_rent_platforms_sudeste?.[0],
          texts?.mobile_rent_platforms_nordeste?.[0],
          texts?.mobile_rent_platforms_norte?.[0],
          texts?.mobile_rent_platforms_sul?.[0],
          texts?.mobile_rent_platforms_centro_oeste?.[0],
        ],
        listItems: texts?.rent_heavy_machinery_highlights?.[0]
      });

      setFooterData({
        central: {
          title: texts?.footer_infos?.[0].fields.subtitle[0],
          text: texts?.footer_infos?.[0].fields.text_field[0],
        },
        horario: {
          title: texts?.footer_infos?.[0].fields.subtitle[1],
          text: texts?.footer_infos?.[0].fields.text_field[1],
        },
        links: texts?.footer_buttons_text?.[0].fields.subtitle.map((item: string, index: number) => {
          return {
            title: item,
            link: texts?.footer_buttons_text?.[0].fields.hrefButton[index]
          }
        }),
        mobileLinks: texts?.footer_buttons_text_mobile?.[0].fields.subtitle.map((item: string, index: number) => {
          return {
            title: item,
            link: texts?.footer_buttons_text?.[0].fields.hrefButton[index]
          }
        })
      });

      const conhecaMills = texts?.footer_conheca_mills_mobile
        ?.sort(
          (a: any, b: any) => a.fields.content_order - b.fields.content_order
        )
        .map((item: any) => {
          return {
            title: item.fields.title,
            open: false,
            submenu: item.fields.text_field.map(
              (submenu: string, index: number) => {
                return {
                  title: submenu,
                  url: item.fields.hrefButton[index],
                };
              }
            ),
          };
        });

      const unidadesMills = texts?.footer_unidades_mobile
        ?.sort(
          (a: any, b: any) => a.fields.content_order - b.fields.content_order
        )
        .map((item: any) => {
          return {
            title: item.fields.title,
            open: false,
            submenu: item.fields.text_field.map(
              (submenu: string, index: number) => {
                return {
                  title: submenu,
                  url: item.fields.hrefButton[index],
                };
              }
            ),
          };
        });

      const mobileMenu = [{
        title: conhecaMills[0].title,
        open: conhecaMills[0].open,
        submenu: conhecaMills[0].submenu
      }, {
        title: unidadesMills[0].title,
        open: unidadesMills[0].open,
        submenu: unidadesMills[0].submenu
      }];

      setFooterList({
        menu: texts?.footer_dropdown
          ?.sort(
            (a: any, b: any) => a.fields.content_order - b.fields.content_order
          )
          .map((item: any) => {
            return {
              title: item.fields.title,
              open: false,
              submenu: item.fields.text_field.map(
                (submenu: string, index: number) => {
                  return {
                    title: submenu,
                    url: item.fields.hrefButton[index],
                  };
                }
              ),
            };
          }),
        heavyMenu: texts?.footer_dropdown_pesados
          ?.sort(
            (a: any, b: any) => a.fields.content_order - b.fields.content_order
          )
          .map((item: any) => {
            return {
              title: item.fields.title,
              open: false,
              submenu: item.fields.text_field.map(
                (submenu: string, index: number) => {
                  return {
                    title: submenu,
                    url: item.fields.hrefButton[index],
                  };
                }
              ),
            };
          }),
        mobileMenu
      });

      // setEquipmentFormList(
      //   home?.form_rent?.[0].fields.text_field?.map((item: any) => item)
      // );
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Trate o erro conforme necessário (por exemplo, mostrar uma mensagem de erro ao usuário)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleGetContent();
    };

    fetchData();
  }, []);

  return {
    allPlatformsWeHave,
    talkToSpecialist,
    frequentQuestions,
    platformsForAllBrazil,
    machinesForAllBrazil,
    footerData,
    footerList,
    // equipmentFormList,
  };
};
