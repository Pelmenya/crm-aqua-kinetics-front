import { TNullable } from "@/shared/lib/types/t-nullable";
import { EUserComponentLocation } from "../model/e-user-component-location";

export function getUserLocation(location: { pathname: string }): TNullable<EUserComponentLocation> {
    const paths = location.pathname.split('/');
    if (paths.includes(EUserComponentLocation.ACCOUNT)) return EUserComponentLocation.ACCOUNT;
    if (paths.includes(EUserComponentLocation.CHECKOUT)) return EUserComponentLocation.CHECKOUT;
    return null;
}