import { Store } from "@tanstack/react-store";
import type { } from "@redux-devtools/extension";
import { ModalStore } from "~/types/store";

export const modal_store = new Store<ModalStore>({
  type: null,
  isOpen: false,
  onOpen: (type) => ({ isOpen: true, type }),
  onClose: () => ({ type: null, isOpen: false }),
});
