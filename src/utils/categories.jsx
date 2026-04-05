"use client";

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Bonus",
  "Investment",
  "Gift",
  "Other Income",
];

export const EXPENSE_CATEGORIES = [
  "Rent",
  "Groceries",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Healthcare",
  "Dining",
  "Education",
  "Insurance",
  "Other Expense",
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const getCategoryColor = (category) => {
  const colors = {
    Salary: "hsl(var(--chart-1))",
    Freelance: "hsl(var(--chart-2))",
    Bonus: "hsl(var(--chart-3))",
    Investment: "hsl(var(--chart-4))",
    Rent: "hsl(var(--chart-1))",
    Groceries: "hsl(var(--chart-2))",
    Transportation: "hsl(var(--chart-3))",
    Entertainment: "hsl(var(--chart-4))",
    Utilities: "hsl(var(--chart-5))",
    Shopping: "hsl(var(--chart-1))",
    Healthcare: "hsl(var(--chart-2))",
    Dining: "hsl(var(--chart-3))",
    Education: "hsl(var(--chart-4))",
    Insurance: "hsl(var(--chart-5))",
  };

  return colors[category] || "hsl(var(--chart-1))";
};
