import { Footer } from "@/components/shared/Footer/Footer";
import { Banner } from "@/components/shared/Banner/Banner";
import { largeOrangeChevronLeft } from "@/assets";
import { useGetCMSAssemblyStructure } from "@/services/hooks/useGetCMSAssemblyStructure";
import { Header } from "@/components/shared/Header/Header";
import { Steppers } from "@/components/Cart/Steppers/Steppers";
import { MachinesAndPlatforms } from "@/components/shared/MachinesAndPlatforms/MachinesAndPlatforms";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { useRouter } from "next/router";
import { generateRandomSequence } from "@/utils/generateRandomSequence";

const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O email é obrigatório"),
  telefone: yup
    .string()
    .matches(/^\(\d{2}\) \d{5} \d{4}$/, "Digite um telefone válido")
    .required("O telefone é obrigatório"),
  concordancia: yup
    .boolean()
    .oneOf([true], "Você deve concordar com os termos"),
  additionalComments: yup.string(),
  cnpj: yup.string().test("cnpj", "Digite um CNPJ válido", function (value) {
    if (value && value.length > 0) {
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);
    }
    return true;
  }),
});

export default function StepThree() {
  const router = useRouter();
  const { banner } = useGetCMSAssemblyStructure();
  const [customInfos, setCustomInfos] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const customInfos = localStorage.getItem("customInfos");
    setCustomInfos(customInfos ? JSON.parse(customInfos) : undefined);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const randomNumber = generateRandomSequence();
    const dataWithRandomNumber = {
      ...data,
      randomNumber: randomNumber,
    };
    localStorage.setItem("customInfos", JSON.stringify(dataWithRandomNumber));

    router.push("/carrinho/orcamento-finalizado");
  };

  return (
    isClient && (
      <>
        <Header theme={localStorage.getItem("paymentFlow") ?? ""} />
        <main className="h-full bg-white w-full font-ibm-font">
          <Banner
            linkList={[
              {
                name: "Home",
                href: "/",
              },
              { name: "Solicitar orçamento", href: "#" },
            ]}
            title={"Solicitar orçamento"}
            backgroundImage={banner?.src}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center "
          >
            <div className="my-8">
              <Steppers
                steps={[
                  {
                    step: 1,
                    text: "Qual o tipo de equipamento você precisa?",
                    active: true,
                    activeMobile: false,
                  },
                  {
                    step: 2,
                    text: "Você pode precisar de alguns dos nossos serviços",
                    active: true,
                    activeMobile: false,
                  },
                  {
                    step: 3,
                    text: "Por favor, confira seus dados",
                    active: true,
                    activeMobile: true,
                  },
                ]}
              />
            </div>
            <div className="flex justify-center items-center flex-col w-full font-ibm-font">
              <div className="container">
                <div
                  className={`flex flex-col gap-4 justify-start bg-beige-50 rounded-lg py-8 px-12 tablet:px-5`}
                >
                  <div className="flex justify-center gap-9 tablet:flex-col">
                    <div className="w-[316px] tablet:w-full">
                      <div className="flex flex-col w-full">
                        <label className="text-sm mb-4 text-green-800">
                          Nome*
                        </label>
                        <input
                          placeholder="Insira seu nome"
                          type="text"
                          {...register("nome")}
                          className={`border-b ${
                            errors.nome ? "border-red-800" : "border-green-800"
                          } text-xs pb-1 focus:outline-none focus:border-blue-500 bg-transparent`}
                        />
                      </div>
                      {errors.nome && (
                        <p className="text-red-800 font-normal text-xs italic mt-1">
                          {errors.nome.message}
                        </p>
                      )}
                    </div>
                    <div className="w-[316px] tablet:w-full">
                      <div className="flex flex-col">
                        <label className="text-sm mb-4 text-green-800">
                          Email*
                        </label>
                        <input
                          placeholder="Insira seu e-mail"
                          type="text"
                          {...register("email")}
                          className={`border-b ${
                            errors.nome ? "border-red-800" : "border-green-800"
                          } text-xs pb-1 focus:outline-none focus:border-blue-500 bg-transparent`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-800 font-normal text-xs italic mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center gap-9 mt-6 tablet:flex-col">
                    <div className="w-[316px] tablet:w-full">
                      <div className="flex flex-col w-full">
                        <label className="text-sm mb-4 text-green-800">
                          CNPJ
                        </label>
                        <InputMask
                          mask="99.999.999/9999-99"
                          placeholder="Insira o CNPJ da empresa"
                          {...register("cnpj")}
                          className={`border-b ${
                            errors.cnpj ? "border-red-800" : "border-green-800"
                          } text-xs pb-1 focus:outline-none focus:border-blue-500 bg-transparent`}
                        />
                      </div>
                      {errors.cnpj && (
                        <p className="text-red-800 font-normal text-xs italic mt-1">
                          {errors.cnpj.message}
                        </p>
                      )}
                    </div>
                    <div className="w-[316px] tablet:w-full">
                      <div className="flex flex-col">
                        <label className="text-sm mb-4 text-green-800">
                          Telefone*
                        </label>
                        <InputMask
                          mask="(99) 99999 9999"
                          placeholder="(00) 00000 0000"
                          type="text"
                          {...register("telefone")}
                          className={`border-b ${
                            errors.nome ? "border-red-800" : "border-green-800"
                          } text-xs pb-1 focus:outline-none focus:border-blue-500 bg-transparent`}
                        />
                      </div>
                      {errors.telefone && (
                        <p className="text-red-800 font-normal text-xs italic mt-1">
                          {errors.telefone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <div className="w-[668px]">
                      <div className="flex flex-col w-full">
                        <label className="text-sm mb-4 text-green-800">
                          Comentários adicionais
                        </label>
                        <input
                          placeholder="Se necessário, insira algum comentário "
                          type="text"
                          {...register("additionalComments")}
                          className={`border-b border-green-800 text-xs pb-1 focus:outline-none focus:border-blue-500 bg-transparent`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <div className="flex flex-col w-[668px]">
                      <label className="flex align-top gap-4 text-sm text-green-800 tablet:text-[10px]">
                        <input
                          type="checkbox"
                          {...register("concordancia")}
                          className="h-4 w-4 mr-2"
                        />
                        Declaro que li e concordo com o Termo de Política de
                        Privacidade e Cookies da Mills e dou consentimento para
                        receber e-mails com informações sobre produtos e
                        serviços e contato comercial.
                      </label>
                      {errors.concordancia && (
                        <p className="text-red-800 font-normal text-xs italic mt-1">
                          {errors.concordancia.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="flex justify-between mt-7 tablet:flex-col-reverse tablet:items-center tablet:gap-5">
                <a
                  className="flex items-center w-[55px]"
                  href="/carrinho/passo-02"
                >
                  <Image
                    src={largeOrangeChevronLeft}
                    height={8}
                    width={12}
                    alt="chevron left"
                    className="tablet:hidden"
                  />
                  <span className="font-semibold text-orange-500 ml-2">
                    Voltar
                  </span>
                </a>
                <Button className="w-[258px]" type="submit">
                  Enviar orçamento
                </Button>
              </div>
            </div>
          </form>

          <MachinesAndPlatforms />
        </main>
        <Footer />
      </>
    )
  );
}
