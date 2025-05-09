import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="Milan katira"
                        content="Milan katira portfolio"
                    />
                    <meta name="author" content="" />
                    <link rel="icon" href="/img/favicon.ico" />

                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap"
                        as="style"
                    />
                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700;800;900&display=swap"
                        as="style"
                    />
                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css?family=Playfair+Display:400,500,600,700,800,900&display=swap"
                        as="style"
                    />
                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
                        as="style"
                    />
                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@200;300;400;500;600;700&display=swap"
                        as="style"
                    />

                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
                        rel="stylesheet"
                    />

                    <title>Milan katira </title>

                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="author" href="https://milankatira.vercel.app/" />
                    <meta name="author" content="Milan katira" />
                    <meta
                        property="article:author"
                        content="https://milankatira.vercel.app/"
                    />
                    <meta name="author" content="Milan katira" />
                    <meta
                        name="author_url"
                        content="https://milankatira.vercel.app/"
                    />
                    <link rel="author" href="https://milankatira.vercel.app/" />

                    <meta
                        property="og:article:author"
                        content="https://milankatira.vercel.app/"
                    />
                    <meta
                        property="og:article:author:name"
                        content="Milan katira"
                    />

                    <meta
                        name="keywords"
                        content="milan katira,milan katira portfolio,nextjs,react,typescript,tailwindcss,express,nodejs,mongodb,mysql,javascript,docker,github,Milan katira,kubernetes,solidity developer"
                    />
                    <meta name="robots" content="index, follow" />
                    <link
                        rel="canonical"
                        href={`https://milankatira.vercel.app/`}
                    />
                    <link
                        rel="alternate"
                        hrefLang="en-US"
                        href="https://milankatira.vercel.app"
                    />
                    <meta property="og:title" content="milan katira" />
                    <meta
                        property="og:description"
                        content="milan katira portfolio"
                    />
                    <meta
                        property="og:url"
                        content={`https://milankatira.vercel.app`}
                    />
                    <meta property="og:site_name" content="Milan katira" />
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:creator" content="@milankatira26" />
                    <meta name="next-size-adjust" />
                    <meta name="googlebot" content="index, follow" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
