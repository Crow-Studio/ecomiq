export type ModalType = "signoutUser";

// export interface ModalData {}

export interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export interface EcomiqStore {
  currentRoute: string;
}
