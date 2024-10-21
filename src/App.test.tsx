import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AddExpenseForm from './components/Expense/AddExpenseForm';
import ExpenseList from './components/Expense/ExpenseList';

describe("Tests Expenses", () => {
    test('Create an Expense', () => {
        render(<App />);

        const createExpenseName = screen.getAllByRole("textbox")[0];
        const createExpenseCost = screen.getAllByRole("textbox")[1];
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseName, { target: { value: "New Expense" } });
        fireEvent.change(createExpenseCost, { target: { value: "1000" } });
        fireEvent.click(createExpenseButton);

        const newExpenseName = screen.getByText("New Expense");
        const newExpenseCost = screen.getByText("$1000");

        expect(newExpenseName).toBeInTheDocument;
        expect(newExpenseCost).toBeInTheDocument();
    });

    test('Delete an Expense', () => {
        render(<App />);

        // Create a test expense
        const createExpenseName = screen.getAllByRole("textbox")[0];
        const createExpenseCost = screen.getAllByRole("textbox")[1];
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseName, { target: { value: "New Expense" } });
        fireEvent.change(createExpenseCost, { target: { value: "1000" } });
        fireEvent.click(createExpenseButton);

        // Delete test expense
        const deleteExpenseButton = screen.getAllByText("x", { selector: "button" })[0];
        fireEvent.click(deleteExpenseButton);

        const deletedExpenseName = screen.queryByText("New Epxense");
        const deletedExpenseCost = screen.queryByText("$1000");

        expect(deletedExpenseName).toBeNull();
        expect(deletedExpenseCost).toBeNull();
    });
});

describe("Budget Balance Verification", () => {
    test('Balance Updates After Insert', () => {
        render(<App />);

        // Creates a test Expense
        const createExpenseName = screen.getAllByRole("textbox")[0];
        const createExpenseCost = screen.getAllByRole("textbox")[1];
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseName, { target: { value: "New Expense" } });
        fireEvent.change(createExpenseCost, { target: { value: "1000" } });
        fireEvent.click(createExpenseButton);

        const budget = screen.getByText("Remaining: $0");
        expect(budget).toBeInTheDocument();
    });

    test('Balance Updates After Multiple Insert & Deletion', () => {
        render(<App />);

        // Creates test Expenses
        const createExpenseName = screen.getAllByRole("textbox")[0];
        const createExpenseCost = screen.getAllByRole("textbox")[1];
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseName, { target: { value: "New Expense1" } });
        fireEvent.change(createExpenseCost, { target: { value: "300" } });
        fireEvent.click(createExpenseButton);

        fireEvent.change(createExpenseName, { target: { value: "New Expense2" } });
        fireEvent.change(createExpenseCost, { target: { value: "500" } });
        fireEvent.click(createExpenseButton);

        const budget = screen.getByText("Remaining: $200");
        expect(budget).toBeInTheDocument();

        // Delete test expense2
        const deleteExpenseButton = screen.getAllByText("x", { selector: "button" })[1];
        fireEvent.click(deleteExpenseButton);

        const budget2 = screen.getByText("Remaining: $700");
        expect(budget2).toBeInTheDocument();
    });
});

describe("Budget Button", () => {
    test('Budget Button Edit', () => {
        render(<App />);

        const budgetButtonEdit = screen.getByText("Edit");
        fireEvent.click(budgetButtonEdit);

        const budgetTotal = screen.getByRole("spinbutton");
        fireEvent.change(budgetTotal, { target: { value: "500" } });
        
        const budgetButtonSave = screen.getAllByText("Save")[0];
        fireEvent.click(budgetButtonSave);

        const newBudgetTotal = screen.getByText("Budget: $500");
        expect(newBudgetTotal).toBeInTheDocument();
    });
});