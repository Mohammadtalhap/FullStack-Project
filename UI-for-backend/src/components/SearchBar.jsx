import { Search, X } from "lucide-react";
import { useState } from "react";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="flex w-full max-w-xl">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          // className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-sky-500"
          className={`peer w-full px-4 focus:pl-11 focus:pr-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-sky-500`}
        />
        <Search
          size={20}
          className="hidden peer-focus:block absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <button className="px-5 border border-l-0 border-gray-300 rounded-r-full cursor-pointer bg-gray-100 hover:bg-gray-200">
        <Search size={20} />
      </button>
    </div>
  );
}

export default SearchBar;
