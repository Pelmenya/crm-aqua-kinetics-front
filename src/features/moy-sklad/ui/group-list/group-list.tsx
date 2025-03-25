import { FC } from "react";
import { TopLevelGroupCard } from "../top-level-group-card/top-level-group-card";
import { Loading } from "@/shared/ui/components/loading/loading";
import { GroupCard } from "../group-card/group-card";
import { TGroup } from "../../model/types/t-group";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const GroupList: FC<{ 
    cardType: 'top' | 'sub';
    groups: TGroup[];
    error: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
    
}> = ({ cardType, groups, error, isLoading }) => {

    if (isLoading) return (
        <Loading
            className="w-full h-full flex items-center justify-center"
            color="text-primary"
            size="loading-xs"
            type="loading-infinity"
        />);
    if (error) return <div>Error loading groups</div>;

    return (
        <div className="flex flex-col gap-2 px-4">
            {groups?.map((group) => (
                cardType === "top"
                    ? <TopLevelGroupCard key={group.id} group={group} />
                    : cardType === "sub" ? <GroupCard key={group.id} group={group} />
                        : null
            ))}
            {/* <DataJson data={groups} /> */}
        </div>
    );
};