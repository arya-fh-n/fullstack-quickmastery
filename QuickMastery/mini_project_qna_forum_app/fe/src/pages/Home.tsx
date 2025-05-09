import { useEffect } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import { useForumStore } from "../stores/forums.store";
import ForumItem from "../components/ForumListItem";

function Home() {
  const status = useForumStore((state) => state.status);
  const error = useForumStore((state) => state.error);
  const forums = useForumStore((state) => state.forums);
  const fetchForums = useForumStore((state) => state.fetchForums);
  const clearError = useForumStore((state) => state.clearError);

  useEffect(() => {
    if (status === "idle") {
      fetchForums();
    }
  }, [fetchForums, status]);

  const headerTitle = (
    <div>
      <span className="text-green-500">Q&A</span>
      <span className="text-cyan-500"> Forum</span>
    </div>
  );

  return (
    <div id="forumHomeContainer">
      <TopNavigationBar title={headerTitle} id="forumHomeTopNavigationBar" />
      <main id="forumHomeContent" className="bg-slate-950">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
              <button
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={clearError}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-6 w-6 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="min-h-screen bg-neutral-800 text-white px-6 py-6 rounded-xl">
            <h1 className="text-3xl font-bold mb-6 mx-2">All Forums</h1>
            {status === "loading" && (
              <p className="text-xl mt-4 text-gray-400 flex items-center justify-center">
                Loading...
              </p>
            )}
            <div className="space-y-4">
              {status === "success" &&
                forums.map((forum) => (
                  <ForumItem
                    key={forum.id}
                    id={forum.id}
                    onClick={() => { alert(forum.username) }}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
