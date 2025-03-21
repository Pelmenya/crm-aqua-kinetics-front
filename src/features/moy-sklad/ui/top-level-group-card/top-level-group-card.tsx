import { Base } from "@/shared/ui/components/base/base";
import { FC } from "react";
import { TGroup } from "../../model/types/t-group";
import {
    useDownloadImageQuery,
    useGetBundleImagesQuery
} from "../../api/moy-sklad-api";
import { GroupInfo } from "../group-info/group-info";
import { base64ToBlob } from "@/shared/lib/helpers/base64-to-blob";
import { Loading } from "@/shared/ui/components/loading/loading";


export const TopLevelGroupCard: FC<{ group: TGroup }> =
    ({ group }) => {

        const { data: images, error, isLoading } = useGetBundleImagesQuery(group.systemBundle.id);
        // Всегда вызываем хук для загрузки изображения, но с условием `skip`
        const mainImage = images?.[0];
        const downloadHref = mainImage?.meta.downloadHref || '';
        const { data: imageBase64, isLoading: isImageLoading } = useDownloadImageQuery(downloadHref, {
            skip: !mainImage,
        });
        const imageUrl = imageBase64 ? URL.createObjectURL(base64ToBlob(imageBase64)) : null;
        if (error) return <div>Error loading images</div>;

        return (
            <Base className="px-4 pt-0 pb-0 w-full relative">
                <div className="min-h-[115px] max-h-[115px] flex items-center w-full">
                    <GroupInfo
                        title={group.groupName}
                        description={group.systemBundle.description}
                        minPrice={49900}
                    />
                    <figure>
                        {isImageLoading || isLoading ? (
                            <Loading
                                className="w-[150px] flex items-center justify-center"
                                color="text-primary"
                                size="loading-xs"
                                type="loading-infinity"
                            />
                        ) : imageUrl ? (
                            <img className="max-h-[100px] absolute bottom-0 right-4" src={imageUrl} alt={mainImage?.title || 'Category image'} />
                        ) : (
                            <div className="max-h-[100px] absolute bottom-0 right-4">No Image Available</div>
                        )}
                    </figure>
                </div>
            </Base>)

    } 