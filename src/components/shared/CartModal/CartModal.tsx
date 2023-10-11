import Image from "next/image";
import cartModalIcon from "@/assets/cart-modal-icon.svg";
import { CartModalProps } from "./types";
import whatsappIcon from "@/assets/whatsapp.svg";
import phone from "@/assets/phone-ico.svg";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Item } from "@/components/Category/AboutRental/types";
import { WhatsappFormModal } from "@/components/WhatsappForm/WhatsappForm";
import { PhoneFormModal } from "@/components/PhoneForm/PhoneForm";
import { currentSiteThemeContext, watchCart } from "@/services/hooks/useCurrentSiteTheme";

export const CartModal: React.FC<CartModalProps> = (props) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [showFone, setShowFone] = useState<boolean>(false);
  const cartLength = items.length;

  const { currentSiteTheme } = useContext(currentSiteThemeContext);

  const { watch } = useContext(watchCart);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    setItems(storedItems ? JSON.parse(storedItems) : []);
  }, [watch]);

  const handleClickCart = () => {
    const url =
      currentSiteTheme === "rentalLight"
        ? "/carrinho/passo-01"
        : "/maquinas-pesadas/carrinho/passo-01";
    router.push(url);
  };

  return (
    <div className="fixed z-50 right-[18px] bottom-[158px] flex flex-col gap-3">
      <button
        className="bg-orange-500 w-[50px] h-[50px] rounded-full relative self-end"
        onClick={handleClickCart}
        onMouseOver={() => setShowFone(false)}
      >
        <Image
          width={30}
          height={30}
          className="absolute bottom-[7px] left-[7px]"
          src={cartModalIcon}
          alt="Carrinho de supermercado"
        />
        <div className="absolute w-[19px] h-[19px] bg-white rounded-full grid flex justify-center items-center text-orange-500 text-xs right-[9px] top-[9px]">
          {cartLength}
        </div>
      </button>
      <div className="flex">
        <PhoneFormModal>
          {showFone && (
            <button
              className="bg-green-800 w-[50px] h-[50px] rounded-full relative mr-3"
              onMouseLeave={() => setShowFone(false)}
            >
              <Image
                src={phone}
                className="absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]"
                alt="phone"
              />
            </button>
          )}
        </PhoneFormModal>
        <WhatsappFormModal>
          <button
            className="bg-green-300 w-[50px] h-[50px] rounded-full relative"
            onMouseOver={() => setShowFone(true)}
          >
            <Image
              src={whatsappIcon}
              alt="Logo do whatsapp"
              className="absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]"
            />
          </button>
        </WhatsappFormModal>
      </div>
    </div>
  );
};
