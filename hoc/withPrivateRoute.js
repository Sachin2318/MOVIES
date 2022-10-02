import cookies from "next-cookies";
import Router from "next/router";

const checkUserAuthentication = (authCookie) => {
  const _cookies = Object.keys(authCookie)
  console.log(_cookies)
  let cookiesName=  process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token": "next-auth.session-token"
  let checkCookie = _cookies.reduce((acc, curr) => {
    if (curr.includes(cookiesName)) {
      acc = authCookie[curr]
    }
    return acc
  }, "")
  return {
    auth: !(checkCookie === undefined || checkCookie === null || checkCookie.length <= 0)
  };
};

const withPrivateRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
  hocComponent.getInitialProps = async (context) => {
    const authCookie = cookies(context);
    const userAuth = await checkUserAuthentication(authCookie)
    // Are you an authorized user or not?
    if (userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: "/films"
        });
        context.res?.end();
      } else {
        Router.replace("/films");
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};

export default withPrivateRoute;
