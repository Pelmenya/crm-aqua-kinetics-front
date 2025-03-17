import { FC } from "react";
import { ProductList } from "./components/product-list/product-list";
import { Page } from "@/shared/ui/components/page/page";

export const CatalogPage: FC = () => {
    return (
        <Page footer={true}>
            <h1>Каталог</h1>
            <ProductList />
        </Page>)
}