import { useForumStore } from "../stores/forums.store";
import { formatDistanceToNow } from "date-fns";

interface ForumListItem {
  id: string;
  onClick: () => void;
}

const ForumItem = ({ id, onClick }: ForumListItem) => {
  const { forums, status } = useForumStore();
  const forum = forums.find((f) => f.id === id);

  if (status !== "success" || !forum) {
    return null;
  }

  const isAnswered = forum.isAnswered;
  const timeAgo = (timeStamp: string): string => {
    return formatDistanceToNow(new Date(timeStamp), {
      addSuffix: true,
    });
  }

  return (
    <button
      className="bg-neutral-900 p-4 rounded-xl flex items-center w-full text-left"
      onClick={onClick}
    >
      <div className="my-2 mx-2 w-full">
        <div className="flex center justify-between items-center">
          <h2 className="text-xl font-bold">{forum.title}</h2>
          {isAnswered ? (
            <div className="flex">
              <p className="text-green-500">Answered</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 ms-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="flex">
              <p className="text-blue-500">Open to answers</p>
              <svg
                className="h-6 w-6 text-blue-500 ms-2 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <circle cx="12" cy="16" r="1" fill="currentColor"></circle>{" "}
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          )}
        </div>
        <p className="text-gray-400 text-justify mt-2 line-clamp-2">
          {forum.content}
        </p>
        <div className="flex justify-between">
          <p className="text-gray-400 text-left mt-7">
            Posted by {forum.username}
          </p>
          <p className="text-gray-400 text-right mt-7">{timeAgo(forum.createdAt)}</p>
        </div>
      </div>
    </button>
  );
};
export default ForumItem;
