import { TRootState } from "@/app/store/store";

export const getRealEstateAddress = (state: TRootState) => state.realEstate.address;
export const getRealEstateCoordinates = (state: TRootState) => state.realEstate.coordinates;
export const getWaterIntakePoints = (state: TRootState) => state.realEstate.waterIntakePoints;
export const getWaterIntakePointCount = (point: keyof ReturnType<typeof getWaterIntakePoints>) => 
    (state: TRootState) => state.realEstate.waterIntakePoints[point];