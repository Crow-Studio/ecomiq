import { InferSelectModel } from "drizzle-orm";
import { store } from "./store";
import { session, user } from "./user";

/* ------------------- TYPES ------------------- */
export type User = InferSelectModel<typeof user>;
export type Session = InferSelectModel<typeof session>;
export type Store = InferSelectModel<typeof store>;
