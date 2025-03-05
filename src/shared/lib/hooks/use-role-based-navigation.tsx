import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/entities/user/model/user.entity';
import { useAppSelector } from './use-app-selector';
import { getUserState } from '@/entities/user/model/user-selectors';

export const useRoleBasedNavigation = (basePath: string) => {
    const { user } = useAppSelector(getUserState);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            switch (user.role) {
                case UserRole.ADMIN:
                    navigate(`${basePath}/admin`);
                    break;
                case UserRole.MANAGER:
                    navigate(`${basePath}/manager`);
                    break;
                case UserRole.CLIENT:
                    navigate(`${basePath}/client`);
                    break;
                case UserRole.SERVICE:
                    navigate(`${basePath}/service`);
                    break;
                default:
                    navigate('/register-page'); // или на другую страницу для неавторизованных пользователей
                    break;
            }
        }
    }, [user, navigate, basePath]);
};
