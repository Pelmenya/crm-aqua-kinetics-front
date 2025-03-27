import { FC } from 'react';
import { useGetProductQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductSlider } from "@/features/moy-sklad/ui/product-slider/product-slider";
import { Page } from "@/shared/ui/components/page/page";
import { useParams } from "react-router-dom";
import { CollapsibleDescription } from '@/shared/ui/components/collapsible-description/collapsible-description';
import { Loading } from '@/shared/ui/components/loading/loading';
import { CatalogHeader } from '@/widgets/catalog-header/catalog-header';
import { ServicesList } from '@/features/moy-sklad/ui/service-list/service-list';

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
        <Page className="pb-16 relative">
            <CatalogHeader title='' className='absolute top-0 left-0 text-base-100'/>
            
            {product
                ? <>
                    <ProductSlider id={product.id} />
                    <div className="bg-base-100 rounded-t-lg p-4 mt-[-2rem] flex flex-col gap-2">
                        <h1 className="text-xl opacity-80 w-full">{product?.name}</h1>
                        {product?.description && <CollapsibleDescription description={product.description} />}
                        {product?.servicesIds && <ServicesList servicesIds={product.servicesIds} />}
                    </div>
                </>
                : null
            }
        </Page>
    );
};
