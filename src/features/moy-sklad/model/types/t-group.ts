import { TNullable } from "@/shared/lib/types/t-nullable";
import { TSystemBundle } from "./t-system-bundle";

export type TGroup = {
    id: number;
    groupId: string;
    parentGroupName: TNullable<string>;
    groupName: TNullable<string>;
    shouldDisplay: boolean;
    systemBundle: TSystemBundle;
    minPrice?: number;
    bundles?: [];
    products?: [];
    services?: [];
}