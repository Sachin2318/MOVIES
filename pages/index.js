import Link from "next/link";
import MainLayout from "../components/shared/MainLayout";
import withPrivateRoute from "../hoc/withPrivateRoute";
import { useSession } from "next-auth/react";
function Home() {
  const session = useSession();
  return (
    <MainLayout>
      <div className="first_interact">
        {!(session.status === "authenticated") ? (
          <>
            <h1>You can check any movie information here.</h1>
            <h3>
              Please sign-in to use more options like add comments and create
              your own movies etc.
            </h3>
            <Link href={"/auth/sign-in"}>
              <button type="submit" className="sign_in_btn">
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <>
            <h1>You can check any movie information here.</h1>
            <h3>Go and check out other pages. There is nothing here </h3>
          </>
        )}
      </div>
    </MainLayout>
  );
}
export default withPrivateRoute(Home);
