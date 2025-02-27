
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
}

export const routes: Route[] = [
    { path: '/', Component: IndexPage },
    { path: '/welcome-page', Component: WelcomePage },
    { path: '/register', Component: RegisterPage, title: 'Init Data'},
    { path: '/init-data', Component: InitDataPage },
    { path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
    { path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
];
