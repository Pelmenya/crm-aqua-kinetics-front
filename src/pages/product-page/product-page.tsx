import { FC } from 'react';
import { useGetProductQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductSlider } from "@/features/moy-sklad/ui/product-slider/product-slider";
import { Page } from "@/shared/ui/components/page/page";
import { useParams } from "react-router-dom";
import { CollapsibleDescription } from '@/shared/ui/components/collapsible-description/collapsible-description';
import { Loading } from '@/shared/ui/components/loading/loading';
import { CatalogHeader } from '@/widgets/catalog-header/catalog-header';
import { ServicesList } from '@/features/moy-sklad/ui/service-list/service-list';
import { Cart } from '@/shared/ui/icons/cart';

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, error: errorProduct, isLoading: isLoadingProduct } = useGetProductQuery(id || '');

    if (isLoadingProduct) {
        return (
            <Loading
                className="w-full h-full flex items-center justify-center"
                color="text-primary"
                size="loading-xs"
                type="loading-infinity"
            />);
    }

    if (errorProduct) return <div>Error loading product: {id}</div>;

    return (
        <Page className="relative">
            <CatalogHeader title='' className='absolute top-0 left-0 text-base-100' />
            {product
                ? <div className='flex flex-col justify-between'>
                    <div>
                        <ProductSlider id={product.id} />
                        <div className="bg-base-100 rounded-t-lg p-4 mt-[-2rem] flex flex-col gap-2">
                            <h1 className="text-xl opacity-80 w-full">{product?.name}</h1>
                            {product?.description && <CollapsibleDescription description={product.description} />}
                            {product?.servicesIds && <ServicesList servicesIds={product.servicesIds} />}
                        </div>
                    </div>
                    <div className='px-4 py-4 w-[100vw]'>
                        <button className='btn btn-primary w-full'>
                            {"Добавить в "}
                            <Cart />
                        </button>
                    </div>
                </div>
                : null
            }
        </Page>
    );
};
