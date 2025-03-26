import { FC } from "react";
import { TProduct } from "../../model/types/t-product";
import { Base } from "@/shared/ui/components/base/base";
import { useDownloadImageQuery, useGetProductImagesQuery } from "../../api/moy-sklad-api";
import { base64ToBlob } from "@/shared/lib/helpers/base64-to-blob";
import { Loading } from "@/shared/ui/components/loading/loading";
import { useNavigate } from "react-router-dom";

export const ProductCard: FC<{ product: TProduct }> = ({ product }) => {
    const navigate = useNavigate();
  
    
    const { data: images, error, isLoading } = useGetProductImagesQuery(product.id);
    const mainImage = images?.[0];
    const downloadHref = mainImage?.meta.downloadHref || '';
    const { data: imageBase64, isLoading: isImageLoading } = useDownloadImageQuery(downloadHref, {
        skip: !mainImage,
    });
    const imageUrl = imageBase64 ? URL.createObjectURL(base64ToBlob(imageBase64)) : null;

    if (error) return <div>Error loading images</div>;

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <Base 
            onClick={handleClick}
            key={product.id} 
            className="flex flex-col items-center justify-between px-4 h-[230px] min-h-[230px]"
        >
            <figure className="flex items-center justify-center rounded-sm h-[122px] w-[124px]">
                {isImageLoading || isLoading ? (
                    <Loading
                        className="w-[150px] flex items-center justify-center"
                        color="text-primary"
                        size="loading-xs"
                        type="loading-infinity"
                    />
                ) : imageUrl ? (
                    <img
                        className="h-[96px] w-[96px]"
                        src={imageUrl}
                        alt={mainImage?.title || 'Category image'}
                    />
                ) : (
                    <div className="text-sm w-full text-center">No Image Available</div>
                )}
            </figure>
            <div className="mt-auto flex flex-col">
                <h3 className="font-semibold text-min line-clamp-2">{product.name}</h3>
                <p className="text-ex-min line-clamp-2">{product.description}</p>
                <p className="text-sm font-bold tracking-tight text-primary">{(78000).toLocaleString() + '₽'}</p>
            </div>
        </Base>
    );
};
