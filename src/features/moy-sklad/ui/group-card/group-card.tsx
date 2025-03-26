import { base64ToBlob } from "@/shared/lib/helpers/base64-to-blob";
import { useDownloadImageQuery, useGetBundleImagesQuery } from "../../api/moy-sklad-api";
import { Base } from "@/shared/ui/components/base/base";
import { GroupInfo } from "../group-info/group-info";
import { Loading } from "@/shared/ui/components/loading/loading";
import { FC } from "react";
import { TGroup } from "../../model/types/t-group";
import { useNavigate } from "react-router-dom";

export const GroupCard: FC<{ group: TGroup }> =
    ({ group }) => {

        const navigate = useNavigate();

        const { data: images, error, isLoading } = useGetBundleImagesQuery(group.systemBundle.id);
        // Всегда вызываем хук для загрузки изображения, но с условием `skip`
        const mainImage = images?.[0];
        const downloadHref = mainImage?.meta.downloadHref || '';
        const { data: imageBase64, isLoading: isImageLoading } = useDownloadImageQuery(downloadHref, {
            skip: !mainImage,
        });
        const imageUrl = imageBase64 ? URL.createObjectURL(base64ToBlob(imageBase64)) : null;
        if (error) return <div>Error loading images</div>;

        const handleClick = () => {
            console.log(group.id)
            navigate(`/sub-catalog/${group.id}`);
        };
        return (
            <Base className="px-4 pt-0 pb-0 w-full relative" onClick={handleClick}>
                <div className="min-h-[115px] max-h-[115px] flex items-center gap-4 w-full">
                    <figure className="bg-base-300 w-[80px] h-[80px] flex items-center justify-center rounded-sm">
                        {isImageLoading || isLoading ? (
                            <Loading
                                className="w-[150px] flex items-center justify-center"
                                color="text-primary"
                                size="loading-xs"
                                type="loading-infinity"
                            />
                        ) : imageUrl ? (
                            <img className="h-[60px] w-[60px]" src={imageUrl} alt={mainImage?.title || 'Category image'} />
                        ) : (
                            <div className="h-[60px] w-[60px] text-sm">No Image Available</div>
                        )}
                    </figure>
                    <GroupInfo
                        title={group.groupName}
                        description={group.systemBundle.description}
                        minPrice={49900}
                        cardType="sub"
                    />
                </div>
            </Base>)
    }    
