import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/app/routing/routes';
import { useEffect } from 'react';
import { AuthProvider } from '@/app/providers/auth-provider/auth-provider';
import { CartProvider } from '@/app/providers/cart-provider/cart-provider';

export function App() {
    const lp = useLaunchParams();
    const isDark = useSignal(miniApp.isDark);

    useEffect(() => {
        const theme = isDark === true ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }, [isDark]);

    return (
        <AppRoot
            appearance={isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            <HashRouter>
                <AuthProvider>
                    <CartProvider>
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.path} path={route.path} element={<route.Component />}>
                                    {route.children && route.children.map((child) => (
                                        <Route key={child.path} path={child.path} element={<child.Component />} />
                                    ))}
                                </Route>
                            ))}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </CartProvider>
                </AuthProvider>
            </HashRouter>
        </AppRoot>
    );
}
