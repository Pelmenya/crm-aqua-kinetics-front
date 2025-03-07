import { TAppState } from "@/app/store/store";

export const getLocationState = (state: TAppState) => state.accountService;
export const getLocationAddress = (state: TAppState) => getLocationState(state).address;
export const getLocationRadiusKm = (state: TAppState) => getLocationState(state).radiusKm;
export const getLocationCoordinates = (state: TAppState) => getLocationState(state).coordinates;
