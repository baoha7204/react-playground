import { useState } from "react";
import ArtistPage from "../pages/ArtistPage";

const SuspenseEx = () => {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <ArtistPage
        artist={{
          id: "the-beatles",
          name: "The Beatles",
        }}
      />
    );
  }
  return (
    <button onClick={() => setShow(true)}>Open The Beatles artist page</button>
  );
};

export default SuspenseEx;
