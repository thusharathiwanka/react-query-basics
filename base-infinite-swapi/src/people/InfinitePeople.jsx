import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};
const alertStyles = {
  position: "fixed",
  top: "5px",
  right: "5px",
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } =
    useInfiniteQuery(
      "sw-people",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || false,
      }
    );

  if (isLoading) return <p style={alertStyles}>Loading...</p>;
  if (isError) return <p style={alertStyles}>Something went wrong</p>;

  // TODO: get data for InfiniteScroll via React Query
  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {isFetching && <p style={alertStyles}>Loading...</p>}
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => (
          <Person
            key={person.name}
            hairColor={person.hair_color}
            eyeColor={person.eye_color}
          />
        ));
      })}
    </InfiniteScroll>
  );
}
