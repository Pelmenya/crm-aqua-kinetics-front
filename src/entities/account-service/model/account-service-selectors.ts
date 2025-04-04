import { TAppState } from "@/app/store/store";

export const getAccountServiceState = (state: TAppState) => state.accountService;
export const getAccountServiceAddress = (state: TAppState) => getAccountServiceState(state).address;
export const getAccountServiceCoordinates = (state: TAppState) => getAccountServiceState(state).coordinates;
