import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import useWindowDimensions from "../../hook/useWindowDimensions";
const Header = () => {
  const session = useSession();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const handleLogoutIn = (e) => {
    e.preventDefault();
    if (session.status === "authenticated") {
      signOut();
    } else {
      router.push("/auth/sign-in");
    }
  };
  return (
    <header className="header">
      <div className="header-inner">
        <Link href={session.status === "authenticated" ? "/films" : "/"}>
          <div className="logo">
            <div className="sc-1a90075d-0 fTdWBK allPath">
              <svg
                width="27"
                height="28.91"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 934.3 998.82"
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_5" data-name="Layer 5">
                    <path
                      fill="#3d7eff"
                      d="M934.3,499.32a534,534,0,0,0-12.76-116.43c-1.59-7.7-3.34-15.21-5.29-22.42l-.18-.36c-.26-1-.75-2.61-1.44-4.68a514.2,514.2,0,0,0-52.08-122.25,238.84,238.84,0,0,0-12-21.17,471.45,471.45,0,0,0-137-137.16C642.12,27.4,557.88,0,467.65,0V.13C464,.05,460.36,0,456.69,0H31.59c-8.43,0-11.3,11.13-4.12,15.26L499,286.21,12,567.63A23.82,23.82,0,0,0,0,588.45V998.82l.31-.18H460.46q3.6,0,7.19-.12v.12c111.45,0,213.77-41.81,294-111.57A466.39,466.39,0,0,0,798,852.34a487.88,487.88,0,0,0,81.88-118.71C914.59,663.76,934.3,584,934.3,499.32ZM506.19,696.4V502.13l169.67-97.26V599.14Zm-5.38-398.26L512,304.63l158.54,91L500.82,492.9l-140.3-80.36-29.7-17ZM325.61,599.28V404.61L356,422l139.46,80V696.68Z"
                    ></path>
                  </g>
                  <g id="Layer_2-2" data-name="Layer 2">
                    <g id="Layer_3" data-name="Layer 3">
                      <path
                        fill="#3d7eff"
                        d="M91.19,289.74a6.55,6.55,0,0,0,6.47-6.46V240.19a6.44,6.44,0,0,0-6.47-6.46H48.11a6.43,6.43,0,0,0-6.46,6.46v43.09a6.43,6.43,0,0,0,6.46,6.46Z"
                      ></path>
                    </g>
                    <g id="Layer_4" data-name="Layer 4">
                      <path
                        fill="#3d7eff"
                        d="M138.77,274.66V339.1a7,7,0,0,0,7,7h64.44a7.14,7.14,0,0,0,7-7V274.66a7,7,0,0,0-7-7H145.77A7,7,0,0,0,138.77,274.66Z"
                      ></path>
                    </g>
                    <rect
                      fill="#3d7eff"
                      x="129.97"
                      y="188.85"
                      width="38.42"
                      height="38.42"
                      rx="4.49"
                    ></rect>
                  </g>
                </g>
              </svg>
            </div>
            <div className="title">DIFX</div>
          </div>
        </Link>
        <div className="other-headers">
          <Link href={"/films/create"}>
            <div className="browse_back">
              <h3 className="d_flex_center">
                <img src="/file-plus.svg" alt="create" />
                <p>Create </p>
              </h3>
            </div>
          </Link>
          <Link href={"/films"}>
            <div className="browse_back">
              <h3 className="d_flex_center">
                <img src="/arrow-left-circle.svg" alt="back" />
                <p> Browse </p>
              </h3>
            </div>
          </Link>
          {width > 420 ? (
            <button className="logout" onClick={handleLogoutIn}>
              <div className="d_flex_center">
                {session.status === "authenticated" ? (
                  <>
                    <img src="/log-out.svg" alt="logout" />
                    <p>Sign Out</p>
                  </>
                ) : (
                  <>
                    <img src="/log-in.svg" alt="login" />
                    <p>Sign In</p>
                  </>
                )}
              </div>
            </button>
          ) : session.status === "authenticated" ? (
            <img src="/log-out.svg" alt="logout" onClick={handleLogoutIn}/>
          ) : (
            <img src="/log-in.svg" alt="login" onClick={handleLogoutIn}/>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
