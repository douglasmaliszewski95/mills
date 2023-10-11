import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export const MobileToggle = ({ markerInfo, isOpen, onClose }: any) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow  p-6 pr-12 fixed top-[50%] left-[50%] max-h-[750px] w-[90vw] max-w-[1013px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-green-800 font-semibold">
            {markerInfo?.unitInfo?.name}
          </Dialog.Title>
          <div>
            <p className="text-green-800 text-xs">
              {markerInfo?.unitInfo?.address}
            </p>
            <a
              href={`${markerInfo?.unitInfo?.href}`}
              className="text-orange-500 text-xs underline mt-5"
            >
              Saiba mais sobre esta unidade
            </a>

            {markerInfo?.freeDelivery && (
              <div className="flex justify-center  mt-4 border border-green-800 rounded-sm max-w-[161px] text-xs uppercase p-1">
                <p>Frete Mills Disponível</p>
              </div>
            )}
          </div>

          <Dialog.Close asChild>
            <button
              className="focus:shadow-violet7 focus:outline-none absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center"
              aria-label="Close"
              onClick={onClose}
            >
              <p className="text-xs text-orange-500">X</p>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
