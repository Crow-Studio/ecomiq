import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModal } from "~/hooks/use-modal-store";

export default function Signout() {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "signoutUser";

  console.log("Signout modal state:", { isOpen, type, isModalOpen });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-center text-2xl">
            Are you absolutely sure you want to sign out?
          </DialogTitle>
          <DialogDescription>
            Thank you! We hope to see you again soon 🤗.
          </DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
