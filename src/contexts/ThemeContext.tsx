import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { useCookies } from "react-cookie"

type ThemeContextData = {
    isDark: boolean
    setIsDark: (theme: boolean) => void
}

export const ThemeContext = createContext({} as ThemeContextData)

type ThemeProviderProps = {
    children: ReactNode
}

export function ThemeProvider ({children}: ThemeProviderProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['isDark'])
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        (cookies.isDark === undefined || cookies.isDark === 'false') ? setCookie('isDark', false) : setIsDark(true)
    }, [])

    useEffect(() => {
        document.querySelector("html").setAttribute('data-dark', String(isDark))
        setCookie('isDark', isDark)
    }, [isDark])

    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}