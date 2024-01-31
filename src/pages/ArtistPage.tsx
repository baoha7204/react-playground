import { Suspense } from "react";
import Loading from "../components/Loading";
import { ArtistProps } from "../types/core";
import Albums from "../components/Albums";
import Biography from "../components/Biography";
import Panel from "../components/Panel";
import AlbumsGlimmer from "../components/AlbumsGlimmer";

const ArtistPage = ({ artist }: ArtistProps) => {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Suspense fallback={<AlbumsGlimmer />}>
          <Panel>
            <Albums artistId={artist.id} />
          </Panel>
        </Suspense>
      </Suspense>
    </>
  );
};

export default ArtistPage;
