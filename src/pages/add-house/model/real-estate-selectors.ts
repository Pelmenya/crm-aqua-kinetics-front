import { TRootState } from "@/app/store/store";

export const getActiveType = (state: TRootState) => state.realEstate.activeType;
export const getResidents = (state: TRootState) => state.realEstate.residents;
export const getActiveSource = (state: TRootState) => state.realEstate.activeSource;
export const getRealEstateAddress = (state: TRootState) => state.realEstate.address;
export const getRealEstateCoordinates = (state: TRootState) => state.realEstate.coordinates;
export const getWaterIntakePoints = (state: TRootState) => state.realEstate.waterIntakePoints;
export const getWaterIntakePointCount = (point: keyof ReturnType<typeof getWaterIntakePoints>) => 
    (state: TRootState) => state.realEstate.waterIntakePoints[point];
export const getRealEstateState = (state: TRootState) => state.realEstate;