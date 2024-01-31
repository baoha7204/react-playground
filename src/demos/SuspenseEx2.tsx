import React, { Suspense, useState } from "react";
import Loading from "../components/Loading";
import SearchResults from "../components/SearchResults";

const SuspenseEx2 = () => {
  const [query, setQuery] = useState("");
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={changeHandler} />
      </label>
      <Suspense fallback={<Loading />}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
};

export default SuspenseEx2;
