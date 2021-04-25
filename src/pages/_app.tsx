import { ThemeProvider } from '../contexts/ThemeContext'
import { PlayerContextProvider } from '../contexts/PlayerContext'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import styles from '../styles/app.module.sass'
import '../styles/globals.sass'

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <PlayerContextProvider>
                <div className={styles.wrapper}>
                    <main>
                        <Header />
                        <Component {...pageProps} />
                    </main>

                    <Player />
                </div>
            </PlayerContextProvider>
        </ThemeProvider>

    )
}

export default MyApp