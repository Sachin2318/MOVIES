import React from "react";
import MainLayout from "../../components/shared/MainLayout";
import Link from "next/link";
const AuthError = () => {
  return (
    <MainLayout>
      <div className="first_interact">
        <h1 style={{ color: "#E53E3E" }}>
          Hey, you are not authorized to access this page. But you can use my
          credentials to sign-in.
        </h1>
        <h3>Email: shubham@difx.io</h3>
        <h3>Password:12345</h3>
        <p>
          {" "}
          I used{" "}
          <a
            href="https://next-auth.js.org/"
            target={"_blank"}
            rel="noreferrer"
          >
            https://next-auth.js.org/
          </a>{" "}
          this next auth for making a <strong>dummy sign-in jwt token</strong>{" "}
          and stored in cookies that why credentials are hardcoded.
        </p>
        <p><b>{"I'm using this token to check user is authenticated or not."}</b></p>
        <Link href={"/auth/sign-in"}>
          <button type="submit" className="sign_in_btn">
            Sign In
          </button>
        </Link>
      </div>
    </MainLayout>
  );
};
export default AuthError;
