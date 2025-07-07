import { createTheme,ThemeProvider } from "@mui/material";

import {ReactNode,createContext, useContext,useState,useMemo}  from 'react';


const ThemeContext = createContext({
    toggleTheme: ()=>{},
    currentTheme: createTheme(),
});

export const useTheme = ()=>useContext(ThemeContext);

export const ThemeProviderWrapper: React.FC<{children:ReactNode}> = ({children})=>{
    const [isDarktheme,setIsDarkTheme] = useState<boolean>(false);
    const theme = useMemo(()=>{
        return createTheme({
          palette: {
            mode: isDarktheme ? "dark" : "light",
            primary: {
              main: isDarktheme ? "#2f2f2f" : "#d9d9d9",
            },
            background:{
                default:isDarktheme ? "#d9d9d9" : "#2f2f2f",
            },
            text:{
                primary:isDarktheme ? "#ffffff" : "#000000",
            }
          },
        });
    },[isDarktheme]);

    const toggleTheme =()=>{
        setIsDarkTheme(!isDarktheme);
    };

    return(
        <ThemeContext.Provider value={{toggleTheme,currentTheme:theme}}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}