import Image from "next/image";
import cartModalIcon from "@/assets/cart-modal-icon.svg";
import { CartModalProps } from "./types";
import whatsappIcon from "@/assets/whatsapp.svg";

export const CartModal: React.FC<CartModalProps> = (props) => {
  const { cartLength = 0 } = props;

  const handleClickCart = () => null;

  const handleWhatsappClick = () => null;

  return (
    <div className="fixed z-50 right-[18px] bottom-[18px] flex flex-col gap-3">
      <button
        className="bg-orange-500 w-[50px] h-[50px] rounded-full relative"
        onClick={handleClickCart}
      >
        <img
          width={30}
          height={30}
          className="absolute bottom-[7px] left-[7px] w-[30px] h-[30px]"
          src={cartModalIcon}
          alt="Carrinho de supermercado"
        />
        <div className="absolute w-[19px] h-[19px] bg-white rounded-full grid flex justify-center items-center text-orange-500 text-xs right-[9px] top-[9px]">
          {cartLength}
        </div>
      </button>
      <button
        className="bg-green-300 w-[50px] h-[50px] rounded-full relative"
        onClick={handleWhatsappClick}
      >
        <img
          src={whatsappIcon}
          alt="Logo do whatsapp"
          className="absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]"
        />
      </button>
    </div>
  );
};
