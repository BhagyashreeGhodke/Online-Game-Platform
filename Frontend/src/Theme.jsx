 
import { useEffect, useState } from 'react'
import { ThemeProvider } from './components/Theme/theme.js'
import ThemeBtn from './components/Theme/ThemeBtn'


function Theme() {
  
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = ()=>{
    setThemeMode("light")
  }
  
  const darkTheme = () => {
    setThemeMode("dark")
  }

  useEffect( () => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
    
      
         
        <div className="flex justify-end mt-9 mr-9">
            <ThemeBtn />
        </div>
    
      

    </ThemeProvider>
  )
}

export default Theme
