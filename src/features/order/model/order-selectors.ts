import { TRootState } from "@/app/store/store";

export const getRealEstateId = (state: TRootState) => state.order.selectedRealEstateId;