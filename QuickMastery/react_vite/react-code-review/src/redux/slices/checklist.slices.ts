import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryData } from '../../types/checklist.types';

interface ChecklistState {
  categories: CategoryData;
  notes: string;
}

const initialCategories: CategoryData = {
  "TypeScript Fundamentals": [
    { text: "Proper type definitions for props, state, and functions", checked: false },
    { text: "Avoid using 'any' type where possible", checked: false },
    { text: "Consistent use of interfaces vs types", checked: false },
    { text: "Type assertions are minimized and used appropriately", checked: false },
    { text: "Generic types are used effectively where needed", checked: false }
  ],
  "React Best Practices": [
    { text: "Components follow single responsibility principle", checked: false },
    { text: "Props are properly destructured", checked: false },
    { text: "React hooks follow rules (only called at top level)", checked: false },
    { text: "Dependencies arrays in useEffect are complete and accurate", checked: false },
    { text: "useMemo/useCallback used appropriately for expensive operations", checked: false },
    { text: "Key props used correctly in lists", checked: false }
  ],
  "Code Organization": [
    { text: "Component file structure is consistent with project standards", checked: false },
    { text: "Logic is separated appropriately (business logic vs UI)", checked: false },
    { text: "Custom hooks used to extract reusable logic", checked: false },
    { text: "Consistent naming conventions followed", checked: false }
  ],
  "Performance": [
    { text: "No unnecessary re-renders (check memo usage)", checked: false },
    { text: "Large lists are virtualized if needed", checked: false },
    { text: "Assets are optimized (images, etc.)", checked: false },
    { text: "Code splitting implemented where beneficial", checked: false }
  ],
  "Error Handling": [
    { text: "Error boundaries implemented where appropriate", checked: false },
    { text: "Form validation handles edge cases", checked: false },
    { text: "API calls have proper error handling", checked: false },
    { text: "User-facing error messages are helpful", checked: false }
  ],
  "Accessibility": [
    { text: "Semantic HTML elements used appropriately", checked: false },
    { text: "All interactive elements are keyboard accessible", checked: false },
    { text: "ARIA attributes used correctly where needed", checked: false },
    { text: "Color contrast meets WCAG standards", checked: false },
    { text: "Images have appropriate alt text", checked: false }
  ],
  "Testing": [
    { text: "Component tests cover essential functionality", checked: false },
    { text: "Mocks used appropriately for external dependencies", checked: false },
    { text: "Edge cases are tested", checked: false },
    { text: "Tests are readable and maintainable", checked: false }
  ],
  "Documentation": [
    { text: "Complex logic has explanatory comments", checked: false },
    { text: "Functions and components have JSDoc comments", checked: false },
    { text: "Props are documented clearly", checked: false },
    { text: "README is updated if needed", checked: false }
  ]
};

const initialState: ChecklistState = {
  categories: initialCategories,
  notes: "",
};

export const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    toggleItem: (
      state, 
      action: PayloadAction<{ category: string; index: number }>
    ) => {
      const { category, index } = action.payload;
      state.categories[category][index].checked = !state.categories[category][index].checked;
    },
    updateNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    resetChecklist: (state) => {
      Object.keys(state.categories).forEach(category => {
        state.categories[category].forEach(item => {
          item.checked = false;
        });
      });
      state.notes = "";
    },
  },
});

export const { toggleItem, updateNotes, resetChecklist } = checklistSlice.actions;

export default checklistSlice.reducer;