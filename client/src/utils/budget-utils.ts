import { API_BASE_URL } from '../constants/constants';

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);

    if (!response.ok) {
        throw new Error('Failed to fetch budget');
    } else {
        let budget = response.json().then((jsonResponse) => {
            return parseFloat(jsonResponse.data);
        });
        return budget;
    }
};