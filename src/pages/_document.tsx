import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta property="og:locale" content="pt_BR">

                    <meta property="og:url" content="https://nlw5.vercel.app/">

                    <meta property="og:title" content="O melhor para você ouvir, sempre">
                    <meta property="og:site_name" content="Podcastr">
                    
                    <meta property="og:image" content="https://raw.githubusercontent.com/Goytai/NLW5/01a75a2c4e3a5202dd7c58e35a83c97559855ba3/.github/banner.svg">
                    <meta property="og:image:type" content="image/jpeg">
                    <meta property="og:image:width" content="800"> /** PIXELS **/
                    <meta property="og:image:height" content="600">
                    
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />

                    <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
