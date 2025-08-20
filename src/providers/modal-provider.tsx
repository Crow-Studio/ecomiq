import { useModal } from "~/hooks/use-modal-store";
import Signout from "~/modals/signout";

export default function ModalProvider() {
  const { type } = useModal();
  return <>{type === "signoutUser" && <Signout />}</>;
}
