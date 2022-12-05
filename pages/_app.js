import "../styles/index.css";
import Nav from "../components/Navigation/Nav";
import { store } from "../features/store";
import { Provider } from "react-redux";
import Footer from "../components/Footer/Footer";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
          <Nav />
          <Component {...pageProps} />
          <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
