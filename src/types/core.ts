export type Artist = {
  id: string;
  name: string;
};

export type Album = {
  id: number;
  title: string;
  year: number;
};

export type Bio = {
  content: string;
};

export interface MyPromise<T> extends Promise<T> {
  status?: "pending" | "fulfilled" | "rejected";
  value?: T;
  reason?: string;
}

export type ArtistProps = {
  artist: Artist;
};

export type AlbumsProps = {
  artistId: string;
};
