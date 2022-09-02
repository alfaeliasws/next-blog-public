import Head from 'next/head'
import App from 'next/app'
import nProgress from 'nprogress'
import Router from 'next/router'
import '../styles/globals.css'

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const MyApp = ({ Component, props }) => {

    return (
        <div className="MyApp">
            <Head>
                <title>Alfaelias' Blog</title>
            </Head>
            <Head>
                <meta name="description" content="Welcome to my Personal Blog" />
            </Head>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500;600;700&family=Source+Sans+Pro:wght@200;300;400;600;700&display=swap" rel="stylesheet" />
            </Head>
            <Component {...props} />
        </div>
    );
};

MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
};

export default App;
