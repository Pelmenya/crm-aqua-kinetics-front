import { FC } from 'react';
import { useGetProductByIdQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductSlider } from "@/features/moy-sklad/ui/product-slider/product-slider";
import { Page } from "@/shared/ui/components/page/page";
import { useParams } from "react-router-dom";
import { CollapsibleDescription } from '@/shared/ui/components/collapsible-description/collapsible-description';
import { Loading } from '@/shared/ui/components/loading/loading';
import { CatalogHeader } from '@/widgets/catalog-header/catalog-header';
import { ServicesList } from '@/features/moy-sklad/ui/service-list/service-list';
import { Cart } from '@/shared/ui/icons/cart';
import { Counter } from '@/shared/ui/components/counter/counter';
import { addProductToCart, addServiceToProduct, updateProductCount, updateServiceCount } from '@/features/cart/model/cart-slice';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { useCartSynchronization } from '@/shared/lib/hooks/use-сart-synchronization';
import { TService } from '@/features/moy-sklad/model/types/t-service';
import { getCartItemById } from '@/features/cart/model/cart-selectors';

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector(getCartItemById(String(id)));
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';
    const { data: product, error: errorProduct, isLoading: isLoadingProduct } = useGetProductByIdQuery(String(id));

    useCartSynchronization(authKey, id);

    const handleProductIncrement = () => {
        if (id && product) {
            if (!cartItem) {
                dispatch(addProductToCart({ product, count: 1 }));
            } else {
                dispatch(updateProductCount({ productId: id, count: cartItem.count + 1 }));
            }
        }
    };

    const handleProductDecrement = () => {
        if (id && product && cartItem) {
            const newCount = Math.max(cartItem.count - 1, 0);
            dispatch(updateProductCount({ productId: id, count: newCount }));
        }
    };

    const handleIncrement = (serviceId: string) => {
        if (id && product) {
            if (!cartItem) {
                dispatch(addProductToCart({ product, count: 0 }));
            }
            dispatch(updateServiceCount({ productId: id, serviceId, count: (cartItem?.services[serviceId]?.count || 0) + 1 }));
        }
    };

    const handleDecrement = (serviceId: string) => {
        if (id && product && cartItem) {
            const newCount = Math.max((cartItem.services[serviceId]?.count || 0) - 1, 0);
            dispatch(updateServiceCount({ productId: id, serviceId, count: newCount }));
        }
    };

    const handleCheckboxChange = (serviceId: string) => {
        if (id && product) {
            if (!cartItem) {
                dispatch(addProductToCart({ product, count: 0 }));
            }
            if (cartItem?.services[serviceId]) {
                const newChecked = !(cartItem.services[serviceId].checked);
                dispatch(updateServiceCount({ productId: id, serviceId, count: newChecked ? 1 : 0 }));
            } else {
                dispatch(addServiceToProduct({ productId: id, service: { id: serviceId } as TService, count: 1 }));
            }
        }
    };

    if (isLoadingProduct) {
        return (
            <Loading
                className="w-full h-full flex items-center justify-center"
                color="text-primary"
                size="loading-xs"
                type="loading-infinity"
            />
        );
    }

    if (errorProduct) return <div>Error loading product: {id}</div>;

    return (
        <Page footer={true} className="relative">
            <CatalogHeader title='' className='absolute top-0 left-0 text-base-100' />
            {product && (
                <div className='flex flex-col justify-between'>
                    <div>
                        <ProductSlider id={product.id} />
                        <div className="bg-base-100 rounded-t-lg p-4 mt-[-2rem] flex flex-col items-end gap-4">
                            <div className='flex flex-col items-end gap-4'>
                                <h1 className="text-xl opacity-80">{product.name}</h1>
                            </div>
                            {product.description && <CollapsibleDescription description={product.description} />}
                            <div className='flex-grow'>
                                {(cartItem?.count || 0) === 0 ? (
                                    <button className='btn btn-primary' onClick={handleProductIncrement}>
                                        {"Добавить в "}
                                        <Cart />
                                    </button>
                                ) : (
                                    <Counter
                                        count={cartItem?.count || 0}
                                        onIncrement={handleProductIncrement}
                                        onDecrement={handleProductDecrement}
                                        minCount={0}
                                    />
                                )}
                            </div>
                            {product.servicesIds && (
                                <ServicesList
                                    servicesIds={product.servicesIds}
                                    serviceStates={cartItem?.services || {}}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                    onCheckboxChange={handleCheckboxChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Page>
    );
};
