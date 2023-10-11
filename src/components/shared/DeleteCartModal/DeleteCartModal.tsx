import { Close } from "@/assets/Close";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { DeleteCartModalProps } from "./types";

export const DeleteCartModal: React.FC<DeleteCartModalProps> = ({
  onConfirm,
  onClose,
}) => {
  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/60 fixed inset-0" />
        <AlertDialog.Content className="flex flex-col text-center gap-6 items-center fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="w-full flex justify-end">
            <div className="cursor-pointer" onClick={onClose}>
              <Close color="#004042" />
            </div>
          </div>
          <AlertDialog.Title className="text-green-800 text-lg font-semibold max-w-[260px]">
            Deseja continuar com esse produto ou serviço?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-green-800 text-xs font-semibold">
            Será necessário esvaziar o carrinho atual
          </AlertDialog.Description>
          <AlertDialog.Action asChild>
            <button
              onClick={onConfirm}
              className="max-w-[260px] w-full py-2 text-white bg-green-800 items-center justify-center rounded-full font-semibold"
            >
              Prosseguir
            </button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
