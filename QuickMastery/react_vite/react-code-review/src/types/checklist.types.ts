// Define interfaces for our data structures
export interface ChecklistItem {
  text: string;
  checked: boolean;
}

export interface CategoryData {
  [category: string]: ChecklistItem[];
}
