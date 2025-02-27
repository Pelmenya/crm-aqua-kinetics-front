import { useEffect, type FC } from 'react';

import { Link } from '@/processes/link/link';
import { Page } from '@/shared/ui/components/page/page';
import { Logo } from '@/shared/ui/components/logo/logo';
import { usePostAuthMutation } from '@/features/auth/api/auth-api';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { DataJson } from '@/shared/ui/helpers/data-json/data-json';
import { Loading } from '@/shared/ui/components/loading/loading';
import { setUser } from '@/entities/user/model/user-slice';


export const IndexPage: FC = () => {
    const lp = useLaunchParams();
    const dispatch = useAppDispatch();

    const [postAuth, { data: user, isLoading }] = usePostAuthMutation();

    useEffect(() => {
        if (lp.initDataRaw) {
            postAuth(lp.initDataRaw).unwrap();
        }
    }, [lp.initDataRaw, postAuth]);

    useEffect(() => {
        if(user) {
            dispatch(setUser(user));
        }
    }, [user])
    return (
        <Page back={false}>
            {isLoading ?
                <div className='w-full h-full relative'>
                    <Logo />
                    <div className='w-full absolute top-100 flex flex-col items-center'>
                        <Loading size='loading-lg' color='text-primary' type='loading-infinity' />
                    </div>
                </div>
                :
                <Link to="/welcome-page">
                    <Logo />
                </Link>
            }
            {user ? <DataJson data={user} /> : null}
        </Page>
    );
};
