import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import '../styles/index.css'
import UserProvider from "../context/userContext";
import Gun from "gun";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
export default MyApp;
