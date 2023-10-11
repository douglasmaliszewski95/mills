import { ImageCMS } from "@/types";
import { Section } from "../Section/Section";
import { TrainingsProps } from "./types";
import { getImageSrc } from "@/utils/images";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TrainingDialog from "./Modal/Modal";

export const Trainings: React.FC<TrainingsProps> = (props) => {
  const router = useRouter();
  const { cards } = props;
  const [customServices, setCustomServices] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [flux, setFlux] = useState("" as any);

  useEffect(() => {
    const customServices = localStorage.getItem("customServices");
    setCustomServices(customServices ? JSON.parse(customServices) : undefined);
  }, []);

  useEffect(() => {
    if (customServices === undefined) {
      const newCustomServices = {
        shipping: {
          checked: false,
          state: "",
          city: "",
        },
        operationTraining: { checked: false, quantity: 0 },
        ipafTraining: { checked: false, quantity: 0 },
        loadingUnloadingOperationQuantity: { checked: false, quantity: 0 },
        seatBeltTraining: { checked: false, quantity: 0 },
        accessoriesAndImplements: {
          checked: false,
          backhoeLoader: [],
          smallLoader: [],
        },
      };
      setCustomServices(newCustomServices);
      return localStorage.setItem(
        "customServices",
        JSON.stringify(newCustomServices)
      );
    }
  }, [customServices]);

  const handleAddOrChangeCustomServices = async (
    name: string,
    value: any,
    property: string,
    href: string
  ) => {
    if (customServices.hasOwnProperty(name)) {
      const updatedCustomServices = {
        ...customServices,
        [name]: {
          ...customServices[name],
          [property]: value,
        },
      };

      setCustomServices(updatedCustomServices);
      localStorage.setItem(
        "customServices",
        JSON.stringify(updatedCustomServices)
      );
    }
    router.push(href);
  };

  const addTrainings = (title: string | null) => {
    if (title === "Uso do cinto de segurança e inspeção")
      return cleanBag("seatBeltTraining");

    if (title === "Carga e Descarga de plataformas")
      return cleanBag("loadingUnloadingOperationQuantity");
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const cleanBag = (item: string) => {
    const itemList = JSON.parse((localStorage.getItem("items") ?? "[]") as any);
    const findRentalLight = itemList.find(
      (item: any) => item.paymentFlow === "rentalLight"
    );
    if (itemList.length === 0) {
      return handleAddOrChangeCustomServices(
        item,
        true,
        "checked",
        "/treinamento/passo-1"
      );
    }
    if (findRentalLight) {
      return handleAddOrChangeCustomServices(
        item,
        true,
        "checked",
        "/carrinho/passo-01"
      );
    }
    if (!findRentalLight) {
      setIsDialogOpen(true);
      setFlux(item);
    }
  };

  const goToNextPage = () => {
    if (flux === "seatBeltTraining") {
      localStorage.setItem("items", JSON.stringify([]));
      return handleAddOrChangeCustomServices(
        "seatBeltTraining",
        true,
        "checked",
        "/treinamento/passo-1"
      );
    }
    if (flux === "loadingUnloadingOperationQuantity") {
      localStorage.setItem("items", JSON.stringify([]));
      return handleAddOrChangeCustomServices(
        "loadingUnloadingOperationQuantity",
        true,
        "checked",
        "/treinamento/passo-1"
      );
    }
  };

  return (
    <>
      <TrainingDialog
        open={isDialogOpen}
        handleClose={() => handleClose()}
        handleFinalize={() => goToNextPage()}
      />
      <Section containerClass="pt-8 pb-12 tablet:px-4 tablet:pt-6 tablet:pb-8">
        <h5 className="text-2xl tablet:text-base tablet:pr-10 text-green-800 font-semibold mb-6">
          Outros treinamentos oferecidos pelas Mills:
        </h5>
        <div className="flex flex-col gap-6">
          {cards?.map((image: ImageCMS) => (
            <div
              key={image?.description}
              className="w-full border-[1px] border-opacity-40 border-green-800 gap-12 tablet:gap-6 rounded-xl flex tablet:flex-col"
            >
              <img
                src={getImageSrc(image?.fields)}
                alt={image?.fields?.alt_attribute ?? ""}
                className="basis-1/2 tablet:basis-0 tablet:rounded-t-xl"
              />
              <div className="basis-1/2 tablet:basis-0 flex flex-col justify-center tablet:px-4">
                <h6 className="text-lg tablet:text-sm text-green-800 font-semibold mb-4">
                  {image?.fields?.content_title}
                </h6>
                <p className="text-sm tablet:text-xs text-green-800 mb-6">
                  {image?.fields?.content_subtitle}
                </p>
                <p className="text-green-800 mb-8 tablet:mb-6 tablet:text-sm">
                  <b>{image?.fields?.content_text?.split(":")?.[0]}:</b>
                  {image?.fields?.content_text?.split(":")?.[1]}
                </p>
                <Button
                  className="max-w-[50%] tablet:max-w-full tablet:mb-6"
                  onClick={() =>
                    addTrainings(image?.fields?.content_title ?? "")
                  }
                >
                  <p className="font-semibold text-sm">Incluir no orçamento</p>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};
