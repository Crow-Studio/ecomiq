import { Store } from "@tanstack/react-store";
import { EcomiqStore } from "~/types/store";

export const ecomiqStore = new Store<EcomiqStore>({
  currentRoute: "Dashboard",
});
