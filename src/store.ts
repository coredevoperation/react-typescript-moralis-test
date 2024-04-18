import { atom } from "jotai";

export const transactionsAtom = atom<object[]>([]);
export const loadingAtom = atom<boolean>(false);