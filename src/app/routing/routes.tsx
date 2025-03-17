
import { AccountPage } from '@/pages/account-page/account-page';
import { AddHousePage } from '@/pages/add-house/add-house-page';
import { AddHouseStepOne } from '@/features/real-estate/ui/add-house-step-one/add-house-step-one';
import { AddHouseStepThree } from '@/features/real-estate/ui/add-house-step-three/add-house-step-three';
import { AddHouseStepTwo } from '@/features/real-estate/ui/add-house-step-two/add-house-step-two';
import { InitDataPage } from '@/pages/delete_pages/InitDataPage';
import { LaunchParamsPage } from '@/pages/delete_pages/LaunchParamsPage';
import { ThemeParamsPage } from '@/pages/delete_pages/ThemeParamsPage';
import { IndexPage } from '@/pages/index-page/index-page';
import { RegisterPage } from '@/pages/register-page/register-page';
import { WelcomePage } from '@/pages/welcome-page/welcome-page';
import { ComponentType } from 'react';
import { RealEstatePage } from '@/pages/real-estate-page/real-estate-page';
import { AccountClient } from '@/pages/account-page/components/account-client/account-client';
import { AccountService } from '@/entities/account-service/ui/account-service/account-service';
import { ServiceCalendarPage } from '@/pages/calendar-page/calendar-page';
import { ServiceLocationPage } from '@/pages/service-location-page/service-location-page';
import { ServiceProfilePage } from '@/pages/service-profile-page/service-profile-page';
import { CatalogPage } from '@/pages/catalog-page/catalog-page';

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
    children?: Route[]; // Добавлено свойство для вложенных маршрутов
}

export const routes: Route[] = [
    { path: '/', Component: IndexPage },
    { path: '/welcome-page', Component: WelcomePage },
    { path: '/register', Component: RegisterPage },
    {
        path: '/account',
        Component: AccountPage,
        children: [
            /*      { path: '/account/admin', Component: <></> },
                    { path: '/account/manager', Component: <></> },
             */
            { path: '/account/client', Component: AccountClient },
            { path: '/account/service', Component: AccountService },
        ]
    },
    { path: '/catalog', Component: CatalogPage },
    {
        path: '/service-calendar',
        Component: ServiceCalendarPage,
    },
    {
        path: '/service-location',
        Component: ServiceLocationPage,
    },
    {
        path: '/service-profile',
        Component: ServiceProfilePage,
    },
    {
        path: '/add-house', Component: AddHousePage, children: [
            { path: '/add-house/step-1', Component: AddHouseStepOne },
            { path: '/add-house/step-2', Component: AddHouseStepTwo },
            { path: '/add-house/step-3', Component: AddHouseStepThree },
        ]
    },
    { path: '/real-estate-page/:id', Component: RealEstatePage },
    { path: '/init-data', Component: InitDataPage },
    { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
    { path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
];
