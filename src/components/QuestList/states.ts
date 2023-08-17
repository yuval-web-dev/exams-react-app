import { CloseEnded, OpenEnded } from "../../classes"

export const type: "closed" | "open" = "closed"
export const quests: (CloseEnded | OpenEnded)[] = [];
export const shuffle: boolean = false;
export const selected: { quest: CloseEnded | OpenEnded, idx: number } = { quest: null as any, idx: -1 };
