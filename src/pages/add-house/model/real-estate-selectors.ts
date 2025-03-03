import { TRootState } from "@/app/store/store";

export const getRealEstateAddress = (state: TRootState) => state.realEstate.address;
export const getRealEstateCoordinates = (state: TRootState) => state.realEstate.coordinates;
