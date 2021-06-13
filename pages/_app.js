import '../styles/globals.css'
import Head from 'next/head'
import store from '../stores/store'
import {Provider} from 'react-redux'

function OrchestraCalendarApp({Component, pageProps}) {
    return (
        <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
                      crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
                        crossOrigin="anonymous"/>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </div>
    )
}

export default OrchestraCalendarApp
