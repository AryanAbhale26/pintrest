import React from "react";
import Gallery from "../../components/gallery/Gallery";
import { useParams, useSearchParams } from "react-router";

const SearchPage = () => {
  let [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  return (
    <div>
      <Gallery search={search} />
    </div>
  );
};

export default SearchPage;
