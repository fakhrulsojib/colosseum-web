export interface Match {
    id: number;
    winner_id: number;
    loser_id: number;
    timestamp: string;
}

export const matchService = {
    async fetchMatches(skip: number = 0, limit: number = 5): Promise<Match[]> {
        try {
            const response = await fetch(`/api/pool/matches/?skip=${skip}&limit=${limit}`);
            if (!response.ok) {
                throw new Error('Failed to fetch matches');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching matches:', error);
            throw error;
        }
    }
};
