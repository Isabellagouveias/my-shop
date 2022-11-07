import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { AppContainer, Header } from '../styles/pages/app'
import { defaultTheme } from '../styles/theme/default'
import logoSvg from '../assets/logo.svg'
import Image from 'next/future/image'


function App({ Component, pageProps }: AppProps) {
   return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
      <AppContainer>
        <Header>
          <Image src={logoSvg} alt=""/>
        </Header>
        <Component {...pageProps} />
      </AppContainer>
    </ThemeProvider>
   )
}

export default App
