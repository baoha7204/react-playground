import { makeFetching } from "../data";
import { getSearchResultsData } from "../data/searchResults";
import use from "../hooks/use";
import { Album, SearchResultsProps } from "../types/core";

const searchResultsFetch = makeFetching<Album[]>();

const SearchResults = ({ query }: SearchResultsProps) => {
  if (query === "") {
    return null;
  }
  const albums = use(
    searchResultsFetch(`/search?q=${query}`, () =>
      getSearchResultsData(`/search?q=${query}`)
    )
  );
  if (albums!.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    );
  }
  return (
    <ul>
      {albums!.map((album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
