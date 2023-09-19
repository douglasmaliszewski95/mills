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
  const [footerList, setFooterList] = useState<FormattedResponseProps | any>();
  const [equipmentFormList, setEquipmentFormList] = useState<
    FormattedResponseProps | any
  >();

  const handleGetContent = async () => {
    try {
      const shared: any = await getImage("shared");
      const texts: any = await getText("shared");
      const home: any = await getText("home_leves");
      const frequentlyAskedQuestions = await getText("faq");

      const descriptionsToKeep = [
        "plataforma elevatoria articulada",
        "plataforma elevatoria telescopica",
        "plataforma elevatoria tesoura",
      ];

      const filteredList = shared.segments?.filter((item: SegmentsProps) =>
        descriptionsToKeep.includes(item.description)
      );

      let filterQuestions: any[] = [];
      for (let i = 0; i < frequentlyAskedQuestions?.faq_questions.length; i++) {
        if (filterQuestions.length === 6)
          break;
        else {
          filterQuestions.push({
            question: frequentlyAskedQuestions?.faq_questions[i].fields.title,
            href: frequentlyAskedQuestions?.faq_questions[i].fields.hrefButton,
          });
        }
      };

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
            };
          })
          .sort((a: any, b: any) => a.order - b.order),
      });

      setFrequentQuestions({
        title: texts?.frequently_asked_questions_info?.[0].fields.title,
        text: texts?.frequently_asked_questions_info?.[0].fields.text_field,
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
        // collapseList:
        //   texts?.platforms_for_all_brazil?.[0]?.fields.content_text_json?.collapseList?.map(
        //     (item: any) => {
        //       return { ...item, open: false };
        //     }
        //   ),
        // otherList:
        //   texts?.platforms_for_all_brazil?.[0]?.fields.content_text_json?.platformsList?.map(
        //     (item: any) => {
        //       return { ...item, open: false };
        //     }
        //   ),
      });
      setMachinesForAllBrazil({
        title: texts?.heavy_machines_all_brazil?.find(
          (x: any) => x.fields.title !== null
        ).fields.title,
        sections: [
          texts?.rent_platforms_sudeste?.[0],
          texts?.rent_platforms_nordeste?.[0],
          texts?.rent_platforms_norte?.[0],
          texts?.rent_platforms_sul?.[0],
          texts?.rent_platforms_centro_oeste?.[0],
        ],
      });

      setFooterList(
        texts?.footer_dropdown
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
          })
      );

      setEquipmentFormList(
        home?.form_rent?.[0].fields.text_field?.map((item: any) => item)
      );
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
    footerList,
    equipmentFormList,
  };
};
