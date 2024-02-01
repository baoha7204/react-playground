import { useState } from "react";
import ArtistPage from "../pages/ArtistPage";
import "../styles/style1.css";

const SuspenseEx1 = () => {
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

export default SuspenseEx1;
