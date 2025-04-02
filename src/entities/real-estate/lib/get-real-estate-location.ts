import { TNullable } from "@/shared/lib/types/t-nullable";
import { ERealEstateComponentLocation } from "../model/real-estate-slice";

export function getRealEstateLocation(location: { pathname: string }): TNullable<ERealEstateComponentLocation> {
    const paths = location.pathname.split('/');
    if (paths.includes(ERealEstateComponentLocation.ACCOUNT)) return ERealEstateComponentLocation.ACCOUNT;
    if (paths.includes(ERealEstateComponentLocation.CHECKOUT)) return ERealEstateComponentLocation.CHECKOUT;
    return null;
}
