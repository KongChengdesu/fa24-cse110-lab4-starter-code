import { API_BASE_URL } from '../constants/constants';

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);

    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to fetch budget');
    } else {
        let budget = response.json().then((jsonResponse) => {
            return parseFloat(jsonResponse.data);
        });
        return budget;
    }
};

export const updateBudget = async (budget: number): Promise<number> => {

    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: budget }),
    });

    console.log(response);

    if (!response.ok) {
        throw new Error('Failed to update budget');
    } else {
        let updatedBudget = response.json().then((jsonResponse) => {
            return parseFloat(jsonResponse.data);
        });
        return updatedBudget;
    }

};
