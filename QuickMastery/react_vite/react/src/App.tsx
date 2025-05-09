import { useReducer, useState, useRef } from "react";
import "./App.css";

interface Course {
  name: string;
  link: string;
}

interface CourseAction {
  type: string;
  payload: Course;
}

const initialState: Course[] = [];

const courseReducer = (state: Course[], action: CourseAction) => {
  switch (action.type) {
    case "ADD_COURSE":
      return [...state, action.payload];
    case "REMOVE_COURSE":
      return state.filter((course) => course.name !== action.payload.name);
    default:
      throw new Error();
  }
};

function App() {
  const [courses, dispatch] = useReducer(courseReducer, initialState);
  const [courseName, setCourseName] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const courseLinkInputRef = useRef<HTMLInputElement>(null);

  const handleAddCourse = () => {
    if (courseName.trim() && courseLink) {
      dispatch({
        type: "ADD_COURSE",
        payload: {
          name: courseName.trim(),
          link: courseLink,
        },
      });
      setCourseName("");
      setCourseLink("");
      courseLinkInputRef.current?.focus();
    }
  };

  const handleRemoveCourse = (courseName: string) => {
    dispatch({
      type: "REMOVE_COURSE",
      payload: {
        name: courseName,
        link: "",
      },
    });
  };

  const handleCourseLinkInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && courseName.trim()) {
      handleAddCourse();
    }
  };

  return (
    <div className="m-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">QuickMastery</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleAddCourse}
        >
          Add Course
        </button>
      </div>
      <div className="my-4">
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="rounded-lg p-2 w-full"
          placeholder="Course Name"
          ref={courseLinkInputRef}
        />
        <input
          type="text"
          value={courseLink}
          onChange={(e) => setCourseLink(e.target.value)}
          className="rounded-lg p-2 w-full mt-2"
          placeholder="Course Link"
          onKeyUp={handleCourseLinkInputKeyPress}
        />
      </div>
      <ul>
        {courses.map((course) => (
          <li
            key={course.name}
            className="p-2 my-2 bg-gray-200 rounded-lg flex justify-between"
          >
            <span>{course.name}</span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => handleRemoveCourse(course.name)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

