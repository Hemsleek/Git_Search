import axios from "axios";
import { useState } from "react";
import "./App.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleUserSearch = async (e) => {
    e.preventDefault();

    const searchQuery = e.target.query.value;
    const searchUrl = `${baseUrl}/search/users?q=${searchQuery}`;
    setIsFetching(true);

    try {
      const { data } = await axios(searchUrl);
      console.log(data);
      setSearchResult(data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleUserSearch}>
        <input
          type="search"
          name="query"
          placeholder="search"
          className="searchInput"
        />
      </form>
      <div className="display">
        <span className="text-center ">Display</span>
        {isFetching ? (
          <span className="text-center font-bold text-lg">
            Fetching users...
          </span>
        ) : (
          <div className="Users flex flex-col gap-y-5">
            {searchResult.map((user) => (
              <div key={user.id} className="user flex items-center ">
                <img
                  src={user.avatar_url}
                  alt="user-avatar"
                  className="w-20 h-20 rounded-full"
                />
                <span className="ml-3 font-extrabold text-lg">
                  {user.login}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
