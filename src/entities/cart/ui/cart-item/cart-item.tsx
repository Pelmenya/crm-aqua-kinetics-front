import { FC } from "react";
import { Base } from "@/shared/ui/components/base/base";
import { base64ToBlob } from "@/shared/lib/helpers/base64-to-blob";
import { Loading } from "@/shared/ui/components/loading/loading";
import { useNavigate } from "react-router-dom";
import { useDownloadImageQuery, useGetProductImagesQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductInfo } from "./components/product-info";
import { TCartItem } from "../../model/cart-slice";
import { ServicesList } from "./components/services-list";

export const CartItem: FC<{ item: TCartItem }> = ({ item }) => {
    const { product, count, services } = item;
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
        <Base className="p-4 w-full relative" onClick={handleClick}>
            <div className="flex items-start gap-4 w-full">
                <figure className="bg-base-300 w-[80px] h-[80px] min-w-[80px] flex items-center justify-center rounded-sm indicator">
                    {isImageLoading || isLoading ? (
                        <Loading
                            className="w-[150px] flex items-center justify-center"
                            color="text-primary"
                            size="loading-xs"
                            type="loading-infinity"
                        />
                    ) : imageUrl ? (
                        <img className="h-[60px] w-[60px]" src={imageUrl} alt={mainImage?.title || 'Product image'} />
                    ) : (
                        <div className="h-[60px] w-[60px] text-sm">No Image Available</div>
                    )}
                    {count > 0 && <p className="indicator-item badge badge-xs badge-warning">{count}</p>}
                </figure>
                <div className="flex flex-col gap-1">
                    <ProductInfo
                        title={product.name}
                    />
                    <ServicesList services={services}/>
                </div>
            </div>
        </Base>)
};
