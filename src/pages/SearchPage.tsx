import { Suspense } from "react";
import Loading from "../components/Loading";
import SearchResults from "../components/SearchResults";
import { SearchPageProps } from "../types/core";

const SearchPage = ({ query, changeHandler }: SearchPageProps) => {
  const isStale = query.q !== query.deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query.q} onChange={changeHandler} />
      </label>
      <Suspense fallback={<Loading />}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={query.deferredQuery} />
        </div>
      </Suspense>
    </>
  );
};

export default SearchPage;
