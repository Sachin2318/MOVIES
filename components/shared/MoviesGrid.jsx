import React from "react";
import Card from "./Card";


export const CardsGrid = ({ results }) => {
  return (
    <>
      <div className="grid">
        {results?.length > 0 ? (
          results.map((movie, i) => <Card key={i} movie={movie} />)
        ) : (
          <h1 style={{ gridColumn: "span 2", textAlign: "center" }}>
            Please change your search criteria and try again
          </h1>
        )}
      </div>
    </>
  );
};

export default CardsGrid;