import { useGetProductQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductSlider } from "@/features/moy-sklad/ui/product-slider/product-slider";
import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";
import { useParams } from "react-router-dom";

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, error: errorProduct, isLoading: isLoadingProduct } = useGetProductQuery(id || '');

    if (isLoadingProduct) {
        return <div>Грузим</div>
    }

    if (errorProduct) return <div>Сломалось</div>

    console.log()
    return (
        <Page className="pb-16">
            {product && <ProductSlider id={product.id} />}
            <div className="bg-base-100 rounded-t-lg p-4 mt-[-2rem]">
                <h1 className="text-xl w-[60%]">{product?.name}</h1>
            </div>
            
        </Page>
    )
}