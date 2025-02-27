import { useEffect, FC, ReactNode } from 'react';
import { usePostAuthMutation } from '@/features/auth/api/auth-api';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch';
import { setUser } from '@/entities/user/model/user-slice';
import { Page } from '@/shared/ui/components/page/page';
import { Logo } from '@/shared/ui/components/logo/logo';
import { Loading } from '@/shared/ui/components/loading/loading';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const lp = useLaunchParams();
    const dispatch = useAppDispatch();

    const [postAuth, { data: user, isLoading }] = usePostAuthMutation();

    useEffect(() => {
        if (lp.initDataRaw) {
            postAuth(lp.initDataRaw).unwrap().catch(console.error);
        }
    }, [lp.initDataRaw, postAuth]);

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));
        }
    }, [user, dispatch]);

    return (
        <>
            {isLoading ? (
                <Page back={false}>
                    <div className='w-full h-full relative'>
                        <Logo />
                        <div className='w-full absolute top-100 flex flex-col items-center'>
                            <Loading size='loading-lg' color='text-primary' type='loading-infinity' />
                        </div>
                    </div>
                </Page>
            ) : (
                children
            )}
        </>
    );
};
