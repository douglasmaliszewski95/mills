import { Header } from "@/components/shared/Header/Header";
import { Banner } from "@/components/shared/Banner/Banner";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import { Footer } from "@/components/shared/Footer/Footer";
import { getImage } from "@/services/hooks/getImage";
import parse from "html-react-parser";
import { getText } from "@/services/hooks/getText";
import { SectionText } from "@/components/SectionText";
import { useCallback, useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [content, setContent] = useState<any>();
  const getContent = useCallback(async () => {
    const images = await getImage("politica_de_privacidade");
    const text = await getText("politica_privacidade");

    const banner = {
      img: images?.banner_privacy_policy?.[0].fields.native.links[0].href || "",
      title: images?.banner_privacy_policy?.[0].fields.content_title || "",
    };

    const privacyPolicyText =
      text?.politica_privacidade?.[0].fields.text_field[0] || "";
    const whoWeAre = {
      title: text?.who_we_are?.[0].fields.title || "",
      text: text?.who_we_are?.[0].fields.text_field[0] || "",
    };

    const personalData = {
      title: text?.personal_data?.[0].fields.title || "",
      text: text?.personal_data?.[0].fields.text_field[0] || "",
    };

    const collectedData = {
      title: text?.collected_data?.[0].fields.title || "",
      text: text?.collected_data?.[0].fields.text_field[0] || "",
    };

    const sharedInfo = {
      title: text?.shared_info?.[0].fields.title || "",
      text: text?.shared_info?.[0].fields.text_field[0] || "",
    };

    const storageInfo = {
      title: text?.storage_info?.[0].fields.title || "",
      text: text?.storage_info?.[0].fields.text_field[0] || "",
    };

    const rights = {
      title: text?.rights?.[0].fields.title || "",
      text: text?.rights?.[0].fields.text_field[0] || "",
    };

    const notification = {
      title: text?.notification?.[0].fields.title || "",
      text: text?.notification?.[0].fields.text_field[0] || "",
    };

    const cookiesPolicy = {
      title: text?.cookies_policy?.[0].fields.title || "",
      text: text?.cookies_policy?.[0].fields.text_field[0] || "",
    };

    const cookies = {
      title: text?.cookies?.[0].fields.title || "",
      text: text?.cookies?.[0].fields.text_field[0] || "",
    };

    const cookiesUsage = {
      title: text?.cookies_usage?.[0].fields.title || "",
      text: text?.cookies_usage?.[0].fields.text_field[0] || "",
    };

    const refuseCookies = {
      title: text?.refuse_cookies?.[0].fields.title || "",
      text: text?.refuse_cookies?.[0].fields.text_field[0] || "",
    };

    const setCookies = {
      title: text?.set_cookies?.[0].fields.title || "",
      text: text?.set_cookies?.[0].fields.text_field[0] || "",
    };

    const thirdPartyCookies = {
      title: text?.third_party_cookies?.[0].fields.title || "",
      text: text?.third_party_cookies?.[0].fields.text_field[0] || "",
    };

    const contact = {
      title: text?.contact?.[0].fields.title || "",
      text: text?.contact?.[0].fields.text_field[0] || "",
    };

    const policyChanges = {
      title: text?.policy_changes?.[0].fields.title || "",
      text: text?.policy_changes?.[0].fields.text_field[0] || "",
    };

    let listTexts: any = [];
    listTexts.push(
      whoWeAre,
      personalData,
      collectedData,
      sharedInfo,
      storageInfo,
      rights,
      notification,
      cookiesPolicy,
      cookies,
      cookiesUsage,
      refuseCookies,
      setCookies,
      thirdPartyCookies,
      contact,
      policyChanges
    );
    setContent({
      banner: banner || null,
      privacyPolicyText: privacyPolicyText || null,
      listTexts,
    });
  }, []);

  useEffect(() => {
    getContent();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Banner
          subTitle="Política de Privacidade e Cookies"
          title={content?.banner?.title}
          backgroundImage={content?.banner?.img}
          blur="bg-black/50"
        />
        <section className="flex justify-center tablet:px-4">
          <div className="container py-10">
            <div className="font-ibm-font">
              {content?.privacyPolicyText && parse(content?.privacyPolicyText)}
            </div>
            {content?.listTexts.map((item: any, index: number) => {
              return (
                <SectionText key={index} title={item.title} text={item.text} />
              );
            })}
          </div>
        </section>
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
}
