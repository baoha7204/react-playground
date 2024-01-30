import { getAlbumsData, makeFetching } from "../data/data";
import { Album, MyPromise } from "../types/core";

const albumsFetch = makeFetching<Album[]>();

export default function Albums({ artistId }: { artistId: string }) {
  const albums = use<Album[]>(
    albumsFetch("the-beatles", () => getAlbumsData(`/${artistId}/albums`))
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

// This is a workaround for a bug to get the demo running.
// TODO: replace with real implementation when the bug is fixed.
function use<T>(promise: MyPromise<T>) {
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      (result) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}
