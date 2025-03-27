import { FC } from 'react';
import { useGetProductQuery, useGetServiceQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductSlider } from "@/features/moy-sklad/ui/product-slider/product-slider";
import { Page } from "@/shared/ui/components/page/page";
import { useParams } from "react-router-dom";
import { CollapsibleDescription } from '@/shared/ui/components/collapsible-description/collapsible-description';
import { Base } from '@/shared/ui/components/base/base';

export const ProductServiceCard: FC<{ id: string }> = ({ id }) => {
    const { data: service } = useGetServiceQuery(id || '');
    return (
        <label htmlFor={id} className='text-min'>
            <Base className='px-4 gap-4 flex justify-start'>
                <input id={id} type="checkbox" className="checkbox checkbox-sm" />
                {service?.name}
            </Base>
        </label>
    )

}

export const ProductServicesList: FC<{ servicesIds: string[] }> = ({ servicesIds }) => {
    return <div className='grid grid-cols-1 gap-2'>
        {servicesIds.map(id =>
            <ProductServiceCard key={id} id={id} />)
        }
    </div>
}

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, error: errorProduct, isLoading: isLoadingProduct } = useGetProductQuery(id || '');

    if (isLoadingProduct) {
        return <div>Грузим</div>;
    }

    if (errorProduct) return <div>Сломалось</div>;

    return (
        <Page className="pb-16">
            {product
                ? <>
                    <ProductSlider id={product.id} />
                    <div className="bg-base-100 rounded-t-lg p-4 mt-[-2rem] flex flex-col gap-2">
                        <h1 className="text-xl opacity-80 w-full">{product?.name}</h1>
                        {product?.description && <CollapsibleDescription description={product.description} />}
                        {product?.servicesIds && <ProductServicesList servicesIds={product.servicesIds} />}
                    </div>
                </>
                : null
            }
        </Page>
    );
};
