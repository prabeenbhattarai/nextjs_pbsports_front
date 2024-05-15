import { createGlobalStyle } from "styled-components";
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from "next-auth/react"; // Import SessionProvider from NextAuth

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,900;1,800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  body {
    padding: 0;
    margin: 0;
    background-color: #000;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> {/* Wrap your component tree with SessionProvider */}
      <>
        <GlobalStyles />
        <NextNProgress color="#1AA211" startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
}
