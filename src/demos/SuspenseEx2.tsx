import React, { useDeferredValue, useState } from "react";
import SearchPage from "../pages/SearchPage";
import "../styles/style1.css";

const SuspenseEx2 = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <SearchPage
        query={{ q: query, deferredQuery }}
        changeHandler={changeHandler}
      />
    </>
  );
};

export default SuspenseEx2;
