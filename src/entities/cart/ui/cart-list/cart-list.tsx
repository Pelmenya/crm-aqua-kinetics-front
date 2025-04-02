import { FC } from 'react';
import { TCartState } from '../../model/cart-slice';
import { CartItem } from '../cart-item/cart-item';

export const CartList: FC<TCartState> = ({ items }) => {

    return (
        <ul className='flex flex-col px-4 gap-2'>
            {
                Object.keys(items).map((item) =>
                    <li key={item} >
                        <CartItem item={items[item]} />
                    </li>)
            }
        </ul>)
}