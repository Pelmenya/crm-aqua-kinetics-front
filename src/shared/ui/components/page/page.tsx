import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { Footer } from '@/widgets/footer/ui/footer';

export function Page({ children, back = true, footer = false }: PropsWithChildren<{
    /**
     * True if it is allowed to go back from this page.
     */
    back?: boolean;
    footer?:boolean;
}>) {
    const navigate = useNavigate();

    useEffect(() => {
        if (back) {
            backButton.show();
            return backButton.onClick(() => {
                navigate(-1);
            });
        }
        backButton.hide();
    }, [back]);

    return (
        <div className='bg-base-100 w-[100vw] min-h-[100vh] min-h-[100vh] max-w-sm relative'>
            {children}
            {footer ? <Footer /> : null}
        </div>
    );
}