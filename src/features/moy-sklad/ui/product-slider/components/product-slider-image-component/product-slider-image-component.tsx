import { useDownloadImageQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { base64ToBlob } from "@/shared/lib/helpers/base64-to-blob";
import { Loading } from "@/shared/ui/components/loading/loading";
import { FC } from "react";

export const ProductSliderImageComponent: FC<{ downloadHref: string }> = ({ downloadHref }) => {
    const { data: imageBase64, isLoading } = useDownloadImageQuery(downloadHref, {
        skip: !downloadHref,
    });

    if (isLoading || !imageBase64) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading color="text-primary" size="loading-xs" type="loading-infinity" />
            </div>);
    }

    const blob = base64ToBlob(imageBase64);
    const imageUrl = URL.createObjectURL(blob);

    return <img className="max-h-58" src={imageUrl} alt="Product" />;
};

