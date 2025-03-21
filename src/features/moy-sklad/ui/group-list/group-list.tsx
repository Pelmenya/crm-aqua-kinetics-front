import { FC } from "react";
import { useGetTopLevelGroupsQuery } from "../../api/moy-sklad-api";
//import { DataJson } from "@/shared/ui/helpers/data-json/data-json";
import { TopLevelGroupCard } from "../top-level-group-card/top-level-group-card";

export const GroupList: FC = () => {
    const { data: groups, error, isLoading } = useGetTopLevelGroupsQuery();

    if (isLoading) return <div>Loading groups...</div>;
    if (error) return <div>Error loading groups</div>;

    return (
        <div className="flex flex-col gap-2 px-4">
            {groups?.map((group) => (
                <TopLevelGroupCard  key={group.id} group={group} />
            ))}
            {/* <DataJson data={groups} /> */}
        </div>
    );
};