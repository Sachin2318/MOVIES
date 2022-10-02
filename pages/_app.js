import '../styles/globals.css'
import 'fomantic-ui-css/semantic.min.css';
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps }) {

  return (<SessionProvider session={pageProps.session}><Component {...pageProps} /></SessionProvider>)
}

export default MyApp
