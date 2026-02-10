import type { User } from '../types/user';

const userCache = new Map<string, User>();

export const userService = {
    async fetchUsersBatch(ids: string[]): Promise<User[]> {
        const uniqueIds = Array.from(new Set(ids));
        const uncachedIds = uniqueIds.filter(id => !userCache.has(id));

        if (uncachedIds.length > 0) {
            try {
                const response = await fetch('/api/v1/users/batch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(uncachedIds),
                });

                if (response.ok) {
                    const users: User[] = await response.json();
                    users.forEach(user => {
                        userCache.set(String(user.id), user);
                    });
                } else {
                    console.error('Failed to fetch users batch');
                }
            } catch (error) {
                console.error('Error fetching users batch:', error);
            }
        }

        return uniqueIds
            .map(id => userCache.get(id))
            .filter((user): user is User => !!user);
    },

    getUser(id: string): User | undefined {
        return userCache.get(id);
    }
};
