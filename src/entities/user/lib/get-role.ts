import { UserRole } from "../model/user.entity";

export function getRole(role?: UserRole): string {
    switch (role) {
        case UserRole.ADMIN:
            return 'Администратор';
        case UserRole.MANAGER:
            return 'Менеджер';
        case UserRole.CLIENT:
            return 'Клиент';
        case UserRole.SERVICE:
            return 'Служба поддержки';
        default:
            return 'Неизвестная роль';
    }
}