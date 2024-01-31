import React from "react";

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

export type ArtistPageProps = {
  artist: Artist;
};

export type SearchPageProps = {
  query: {
    q: string;
    deferredQuery: string;
  };
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AlbumsProps = {
  artistId: string;
};

export type SearchResultsProps = {
  query: string;
};
