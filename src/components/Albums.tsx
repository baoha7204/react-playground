import { getAlbumsData, makeFetching } from "../data/data";
import use from "../hooks/use";
import { Album } from "../types/core";

const albumsFetch = makeFetching<Album[]>();

export default function Albums({ artistId }: { artistId: string }) {
  const albums = use<Album[]>(
    albumsFetch(`/${artistId}/albums`, () =>
      getAlbumsData(`/${artistId}/albums`)
    )
  );
  return (
    <ul>
      {albums!.map((album: Album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
