import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux.hooks";
import {
  selectCategories,
  selectNotes,
  selectProgress,
} from "../redux/selectors/checklist.selectors";
import {
  toggleItem,
  updateNotes,
  resetChecklist,
} from "../redux/slices/checklist.slices";

export default function CodeReviewChecklist() {
  const categories = useAppSelector(selectCategories);
  const notes = useAppSelector(selectNotes);
  const { totalItems, checkedItems, percentage } =
    useAppSelector(selectProgress);
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCheckboxChange = (category: string, index: number): void => {
    dispatch(toggleItem({ category, index }));
  };

  const handleNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    dispatch(updateNotes(e.target.value));
  };

  const handleReset = (): void => {
    dispatch(resetChecklist());
  };

  const reviewProgress =
    percentage > 0 ? "Code review in progress..." : "Ready to start review";

  const reviewStatus =
    percentage === 100 ? "✅ Code review complete!" : reviewProgress;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        React TypeScript Code Review Checklist
      </h1>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">
            {percentage}% ({checkedItems}/{totalItems})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Categories accordion */}
      <div className="mb-6">
        {Object.keys(categories).map((category) => (
          <div key={category} className="mb-2 border rounded">
            <button
              className="w-full p-3 text-left font-medium bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
              onClick={() =>
                setActiveCategory(activeCategory === category ? null : category)
              }
            >
              <span>{category}</span>
              <span className="text-sm text-gray-600">
                {categories[category].filter((item) => item.checked).length}/
                {categories[category].length}
              </span>
            </button>

            {activeCategory === category && (
              <div className="p-3 bg-white">
                {categories[category].map((item, index) => (
                  <div key={item.text} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(category, index)}
                      className="mr-2 h-4 w-4"
                    />
                    <label
                      className={
                        item.checked ? "line-through text-gray-500" : ""
                      }
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notes section */}
      <div className="mb-6">
        <label className="block mb-2 font-medium" htmlFor="reviewNotes">
          Review Notes:
        </label>
        <textarea
          id="reviewNotes"
          className="w-full p-2 border rounded h-32"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add any additional notes, feedback, or action items here..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Reset Checklist
        </button>
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">{reviewStatus}</p>
        </div>
      </div>
    </div>
  );
}
