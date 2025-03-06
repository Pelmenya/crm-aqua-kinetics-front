import { type FC } from 'react';

import { Page } from '@/shared/ui/components/page/page';

import BGImage from './bg-image.png';
import Girl from './girl.png';
import { Link } from '@/app/link/link';
import { useAppSelector } from '@/shared/lib/hooks/use-app-selector';
import { getUserState } from '@/entities/user/model/user-selectors';

export const WelcomePage: FC = () => {

    const { user } = useAppSelector(getUserState);

    return (
        <Page back={true}>
            <div className='bg-base-100  flex flex-col justify-between gap-10'>
                <div className='relative w-full'>
                    <img src={BGImage} alt="Background" className='w-full' />
                    <img className="absolute top-15 rounded-3xl left-10 z-1 h-[395px]" src={Girl} alt='Girl' />
                    <svg className='absolute z-2 top-95 left-0 w-full' width="375" height="150" viewBox="0 0 375 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M254.5 50.4999C303.225 50.4999 336.5 52.2559 375 52.2559C425.39 52.2558 425.352 150 375 150C339 150 379.477 150 334.5 150C288 150 327 150 284.5 150C234.239 150 244.5 150 196 150C145.417 150 157.5 150 113.5 150C60.0964 150 32 150 6.41158e-05 150C-54.4999 150 -57.4311 0.699769 0.000108851 0.699772C36.5001 0.699774 56.6766 0.699797 114 0.699796C167.677 0.699797 200.802 50.4999 254.5 50.4999Z" fill="var(--color-base-100)" />
                    </svg>
                    <div className='absolute text-2xl font-bold pl-4 top-102 z-3'>
                        <p className='gradient-text font-bold'>Здравствуйте,</p>
                        <p className='gradient-text'>{user?.first_name}</p>
                        <p className='text-base-content opacity-70 text-sm font-light mt-2'>Рады помочь очистить воду</p>
                    </div>
                </div>
                <div className='w-full relative z-4 flex flex-col px-4 pt-6'>
                    {user?.is_auth ?
                        <Link to='/account' className='btn btn-primary btn-outline'>
                            Войти
                        </Link>
                        :
                        <Link to='/register' className='btn btn-primary'>
                            Стать клиентом
                        </Link>
                    }
                </div>
            </div>
        </Page>
    );
};

