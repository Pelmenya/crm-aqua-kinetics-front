import { TNullable } from "@/shared/lib/types/t-nullable";
import { TRealEstateComponentLocation } from "../model/real-estate-slice";

export function getRealEstateLocation(location: { pathname: string }): TNullable<TRealEstateComponentLocation> {
    const paths = location.pathname.split('/');
    if (paths.includes(TRealEstateComponentLocation.ACCOUNT)) return TRealEstateComponentLocation.ACCOUNT;
    if (paths.includes(TRealEstateComponentLocation.CHECKOUT)) return TRealEstateComponentLocation.CHECKOUT;
    return null;
}
