import '../styles/globals.sass'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import styles from '../styles/app.module.sass'

function MyApp({ Component, pageProps }) {
    return (
        <div className={styles.wrapper}>
            <main>
                <Header />
                <Component {...pageProps} />
            </main>

            <Player />
        </div>
    )
}

export default MyApp