import MoviesGrid from "../../components/shared/MoviesGrid";
import MainLayout from "../../components/shared/MainLayout";
import Pagination from "../../components/shared/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function FilmPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const query = router.query;
  useEffect(() => {
    window.scrollTo(0, 0);
    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${query.page ?? 1}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (query.page == 1 || query.page == undefined || query.page == null) {
          let localData = localStorage.getItem("created");
          let parsedAry = JSON.parse(localData) ?? [];
          let ary = [...parsedAry, ...data.results];
          console.log(ary);
          setItems(ary);
        } else {
          setItems(data.results);
        }
      });
  }, [query.page]);
  return (
    <MainLayout>
      <MoviesGrid results={items} />
      <Pagination totalPages={500} />
    </MainLayout>
  );
}

export default FilmPage;
