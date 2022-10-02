import React, { useState } from "react";
import styles from "../../styles/movie.id.module.css";
import MainLayout from "../../components/shared/MainLayout";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import("../../components/shared/Comments"));
import cookies from "next-cookies";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { useRouter } from "next/router";

const currencyFormat = (num) => {
  return `$ ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};
export const redirectBackTo = (redirectBackToRoute) => {
  return `/login?redirectBackTo=${redirectBackToRoute}`;
};

const MovieInfo = ({ movie, isAuthenticated }) => {
  const [show, setShow] = useState(false);
  const { width } = useWindowDimensions();
  const router = useRouter();
  // console.log(isAuthenticated); style={{ height: width <= 430 ? "100vh" : "" }}
  return (
    <MainLayout>
      <div className={styles.main}>
        <>
          <div className={styles.poster}>
            {movie?.poster_path && (
              <img
                alt="poster"
                src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
              />
            )}
            {!movie?.poster_path && (
              <div className={styles.noimage}>
                {movie ? "no poster available" : "Loading ..."}
              </div>
            )}
          </div>
          <div className={styles.info}>
            <div className={styles.title + " " + styles.wide}>
              {movie?.title}
            </div>
            <div className={styles.desc + " " + styles.wide}>
              <p className={styles.tagline}>{movie?.tagline}</p>

              <span>{movie?.overview}</span>
            </div>
            <div className={styles.genres + " " + styles.wide}>
              Genre{movie?.genres.length > 1 ? "s" : ""}
              <ul>
                {movie?.genres &&
                  movie?.genres.map((g) => (
                    <li className="li-geners" key={g.id}>
                      {g.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              Release date
              <span>{movie?.release_date}</span>
            </div>
            <div>
              {/* adding s for more than one director */}
              Director{movie?.director?.length > 1 ? "s" : ""}
              <span>
                {movie?.director?.map((d, i) => (
                  <span key={d.name}>
                    {d.name}
                    {i + 1 != movie.director.length ? "," : ""}
                  </span>
                ))}
              </span>
            </div>
            <div>
              Votes average
              <span>
                {movie?.vote_average} /10{" "}
                <small>(votes:{movie?.vote_count} )</small>{" "}
              </span>
            </div>
            {false ? (
              <div>
                Imdb rating
                <span>{omdbData.imdbRating} /10</span>
              </div>
            ) : (
              <div></div>
            )}
            {movie?.budget && movie?.budget != 0 ? (
              <div>
                budget<span>{currencyFormat(movie.budget)}</span>
              </div>
            ) : null}
            {movie?.revenue && movie?.revenue != 0 ? (
              <div>
                Box office<span>{currencyFormat(movie.revenue)}</span>
              </div>
            ) : null}
          </div>
        </>
      </div>
      {/* <hr className={styles.hrstyle} /> */}
      <div className={styles.comment_head_wrapper}>
        <h3>Wanted to Add Comments </h3>
        <p
          onClick={() => {
            isAuthenticated
              ? setShow((prev) => !prev)
              : router.push({
                  pathname: "/auth/sign-in",
                  query: { destination: router.asPath },
                });
          }}
        >
          Click Here!
        </p>
      </div>
      <p style={{ color: "#e91e63" }}>
        {" "}
        Please Note ! Comments are stored in useState so if you click on click
        here again then state will come to its intitial state
      </p>
      {show ? <Comments /> : null}
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const authCookie = cookies(context);
  let cookiesName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
  const token = authCookie[cookiesName];
  const id = context.query.slug[0];
  const endpoint = ` https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
  const movie = await (await fetch(endpoint)).json();
  return { props: { movie, isAuthenticated: token?.length > 0 } };
}

export default MovieInfo;
