import {create} from "zustand";
import { StatusFilterEnum } from "./enum";

type StatusFilter = StatusFilterEnum.All | StatusFilterEnum.Applied | StatusFilterEnum.Interviewing | StatusFilterEnum.Offer | StatusFilterEnum.Rejected;

interface Store {
    statusFilter: StatusFilter;
    setStatusFilter: (filter: StatusFilter) => void;
}

export const useApplicationFilterStore = create<Store>((set) => ({
    statusFilter: StatusFilterEnum.All,
    setStatusFilter: (filter) => set({statusFilter: filter}),
}));