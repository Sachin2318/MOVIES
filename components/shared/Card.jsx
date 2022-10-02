/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";
import CustomLink from "./CustomLink";
import styles from "../../styles/Card.module.css";
import { Placeholder } from "semantic-ui-react";
import Image from "next/image";

const Card = ({ movie }) => {
  if (!movie) return <div></div>;
  const [loading, setLoading] = useState(true);
  const imgRef = useRef();
  const handleLoad = () => setLoading(false);
  useEffect(() => {
    setLoading(true);
    if (imgRef.current) {
      imgRef.current.addEventListener("load", handleLoad);
      imgRef.current.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
        : movie.img;
    }

    return () => {
      imgRef.current?.removeEventListener("load", handleLoad);
    };
  }, [movie, setLoading]);

  return (
    <CustomLink
      href={`films/${movie.id}/${movie.title}`}
      scroll={false}
      noLink={movie.manual}
    >
      <div className={styles["post-entry"]}>
        <a>
          {movie.poster_path && (
            <>
              <Image
                alt="poster"
                objectFit="cover"
                layout="fill"
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                priority
                quality={80}
              />
            </>
          )}
          {!movie.poster_path && movie.manual && (
            <div className={styles["noimage"]}>no poster available</div>
          )}
          {!movie.manual ? (
            <span className={styles.rating}>
              {movie.vote_average * 10}
              <small>/100</small>
            </span>
          ) : (
            <span className={styles.rating} style={{ fontSize: "18px" }}>
              You create this movie so I will rate it 100
              <small>/100</small>
              <p>You cannot click this card</p>
              <small>sorry 🥲!</small>
            </span>
          )}
        </a>
        <div className={styles["post-text"]}>
          <h3>
            <a>{movie.title}</a>
          </h3>
        </div>
      </div>
    </CustomLink>
  );
};

export default Card;
