import { TNullable } from "@/shared/lib/types/t-nullable";
import { TSystemBundle } from "./t-system-bundle";

export type TGroup = {
    id: number;
    parentGroupName: TNullable<string>;
    groupName: TNullable<string>;
    shouldDisplay: boolean;
    systemBundle: TSystemBundle;
    minPrice?: number;
}