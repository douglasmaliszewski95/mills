import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const TrainingDialog = ({ open, handleClose, handleFinalize }: any) => (
  <AlertDialog.Root open={open}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0 font-ibm-font" />
      <AlertDialog.Content className="flex flex-col items-center data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[385px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="w-[292px] mt-2 text-mauve12 m-0 text-[18px] font-semibold text-green-800 text-center">
          Deseja continuar com esse produto ou serviço?
        </AlertDialog.Title>
        <AlertDialog.Description className="font-semibold text-green-800 text-center mt-4 mb-5 text-[13px] leading-normal">
          Será necessário esvaziar o carrinho atual
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button
              onClick={handleClose}
              className="absolute top-3 right-0 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              X
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild className="w-[251px]">
            <button
              className="w-[251px] py-3 bg-green-800 rounded-full text-white text-sm"
              onClick={handleFinalize}
            >
              Prosseguir
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default TrainingDialog;
