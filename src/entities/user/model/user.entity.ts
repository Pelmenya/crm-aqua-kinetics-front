export type TTGUser = {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  last_name: string;
  language_code: string;
  photo_url: string;
  username: string;
}

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    CLIENT = 'client',
    SERVICE = 'service',
}

export type TUser = TTGUser & {
    email: string;
    phone: string;
    is_auth: boolean;
    role: UserRole;
}

export type TTGChatData = {
  auth_date: string;
  chat_type: string;
  chat_instance: string;
  hash: string;
  signature: string;
  user: TTGUser;
}