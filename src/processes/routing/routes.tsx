
import { AccountPage } from '@/pages/account-page/account-page';
import { AddHousePage } from '@/pages/add-house/add-house';
import { AddHouseStepOne } from '@/pages/add-house/add-house-step-one/add-house-step-one';
import { AddHouseStepTwo } from '@/pages/add-house/add-house-step-two/add-house-step-two';
import { InitDataPage } from '@/pages/delete_pages/InitDataPage';
import { LaunchParamsPage } from '@/pages/delete_pages/LaunchParamsPage';
import { ThemeParamsPage } from '@/pages/delete_pages/ThemeParamsPage';
import { IndexPage } from '@/pages/index-page/index-page';
import { RegisterPage } from '@/pages/register-page/register-page';
import { WelcomePage } from '@/pages/welcome-page/welcome-page';
import { ComponentType } from 'react';

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
    { path: '/account', Component: AccountPage },
    {
        path: '/add-house', Component: AddHousePage, children: [
            { path: '/add-house/step-1', Component: AddHouseStepOne },
            { path: '/add-house/step-2', Component: AddHouseStepTwo },
        ]
    },
    { path: '/init-data', Component: InitDataPage },
    { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
    { path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
];
