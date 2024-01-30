import { Suspense } from "react";
import Loading from "../components/Loading";
import { ArtistProps } from "../types/core";
import Albums from "../components/Albums";

const ArtistPage = ({ artist }: ArtistProps) => {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
};

export default ArtistPage;
