import * as Dialog from "@radix-ui/react-dialog";
import checkCircle from "@/assets/check-circle.svg";
import Image from "next/image";
import { ConfirmModalProps } from "./types";

export const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { title } = props;

  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="py-9 px-3 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white focus:outline-none">
          <div className="flex items-center gap-4 flex-col">
            <Image src={checkCircle} alt="green right check" />
            <Dialog.Title className="text-green-800 text-sm font-semibold text-center">
              {title ?? null}
            </Dialog.Title>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
