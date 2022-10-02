import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Head>
      <Header />
      <main className="main-child" style={props.style}>
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
