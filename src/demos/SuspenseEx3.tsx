import { Suspense } from "react";
import Loading from "../components/Loading";
import Router from "../components/Router";
import "../styles/style1.css";

const SuspenseEx3 = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router />
    </Suspense>
  );
};

export default SuspenseEx3;
