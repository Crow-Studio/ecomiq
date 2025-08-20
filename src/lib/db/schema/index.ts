import { InferSelectModel } from "drizzle-orm";
export * from "./enums";
export * from "./payments";
export * from "./relations";
export * from "./store";
export * from "./types";
export * from "./user";

import { session, user } from "./user";

/* ------------------- TYPES ------------------- */
export type User = InferSelectModel<typeof user>;
export type Session = InferSelectModel<typeof session>;
