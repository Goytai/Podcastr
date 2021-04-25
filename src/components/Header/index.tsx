import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import { useTheme } from '../../contexts/ThemeContext'

import styles from './styles.module.sass'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    const {isDark, setIsDark} = useTheme()

    function toggleTheme () {
        setIsDark(!isDark)
    }

    return (
        <header className={styles.headerContainer}>
            <img src={ !isDark ? "/logo.svg" : "/logo-dark.svg"} alt="Podcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
            <img
                src={ !isDark ? "/moon.svg" : "/sun.svg"}
                className={styles.toggleTheme}
                onClick={toggleTheme}
                alt="Podcastr"
            />
        </header>
    )
}