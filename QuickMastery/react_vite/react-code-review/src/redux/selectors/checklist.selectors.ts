import { RootState } from "../store";

export const selectCategories = (state: RootState) => state.checklist.categories;
export const selectNotes = (state: RootState) => state.checklist.notes;

export const selectProgress = (state: RootState) => {
  const categories = state.checklist.categories;
  const totalItems = Object.values(categories).reduce((sum, items) => sum + items.length, 0);
  const checkedItems = Object.values(categories).reduce(
    (sum, items) => sum + items.filter(item => item.checked).length, 0
  );
  
  return {
    totalItems,
    checkedItems,
    percentage: checkedItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100)
  };
};
