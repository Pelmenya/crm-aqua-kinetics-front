import { type FC } from 'react';

import { Page } from '@/shared/ui/components/page/page';

import BGImage from './bg-image.png';
import Girl from './girl.png';
import { Link } from '@/processes/link/link';

export const WelcomePage: FC = () => {

	return (
		<Page back={true}>
			<div className='bg-base-100 max-w-sm flex flex-col justify-between gap-16'>
				<div className='relative w-full'>
					<img src={BGImage} alt="Background" className='w-full' />
					<img className="absolute top-15 rounded-3xl left-10 z-1 h-[395px]" src={Girl} alt='Girl' />
					<svg className='absolute z-2 top-95 left-0 w-full' width="375" height="285" viewBox="0 0 375 285" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M254.5 50.4999C303.225 50.4999 336.5 52.2559 375 52.2559C425.39 52.2558 425.352 285 375 285C339 285 379.477 285 334.5 285C288 285 327 285 284.5 285C234.239 285 244.5 285 196 285C145.417 285 157.5 285 113.5 285C60.0964 285 32 285 6.41158e-05 285C-54.4999 285 -57.4311 0.699769 0.000108851 0.699772C36.5001 0.699774 56.6766 0.699797 114 0.699796C167.677 0.699797 200.802 50.4999 254.5 50.4999Z" fill="var(--color-base-100)" />
					</svg>
					<div className='absolute text-3xl font-bold pl-4 top-100 z-3'>
						<p className='gradient-text font-bold'>Добро</p>
						<p className='gradient-text'>пожаловать</p>
						<p className='text-base-content opacity-70 text-sm font-light mt-2'>Рады помочь очистить воду</p>
					</div>
				</div>
				<div className='w-full relative z-4 flex flex-col p-4 gap-2'>
					<Link to='/register' className='btn btn-primary'>
						Стать клиентом
					</Link>
					<Link to='/login' className='btn btn-primary btn-outline'>
						Войти
					</Link>
				</div>
			</div>
		</Page>
	);
};

