import { makeFetching } from "../data";
import { getAlbumsData } from "../data/albums";
import use from "../hooks/use";
import { Album, AlbumsProps } from "../types/core";

const albumsFetch = makeFetching<Album[]>();

export default function Albums({ artistId }: AlbumsProps) {
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
