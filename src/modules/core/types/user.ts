export interface User {
    id: number;
    email: string;
    full_name?: string;
    avatar_url?: string;
    is_active: boolean;
    is_superuser: boolean;
}
