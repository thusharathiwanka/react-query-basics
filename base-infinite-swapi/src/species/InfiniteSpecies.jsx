import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};
const alertStyles = {
  position: "fixed",
  top: "5px",
  right: "5px",
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery(
      "sw-species",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || false,
      }
    );

  if (isLoading) return <p style={alertStyles}>Loading...</p>;
  if (isError) return <p style={alertStyles}>Something went wrong</p>;

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {isFetching && <p style={alertStyles}>Loading...</p>}
      {data.pages.map((pageData) => {
        return pageData.results.map((species) => (
          <Species
            key={species.name}
            averageLifespan={species.average_lifespan}
            language={species.language}
            name={species.name}
          />
        ));
      })}
    </InfiniteScroll>
  );
}
