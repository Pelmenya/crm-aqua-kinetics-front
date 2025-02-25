export type User = {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  last_name: string;
  language_code: string;
  photo_url: string;
  username: string;
}

export type TTGChatData = {
  auth_date: string;
  chat_type: string;
  chat_instance: string;
  hash: string;
  signature: string;
  user: User;
}