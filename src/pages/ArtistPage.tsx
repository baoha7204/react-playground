import { Suspense } from "react";
import Loading from "../components/Loading";
import { ArtistProps } from "../types/core";
import Albums from "../components/Albums";
import Biography from "../components/Biography";
import Panel from "../components/Panel";

const ArtistPage = ({ artist }: ArtistProps) => {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
};

export default ArtistPage;
