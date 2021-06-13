import { configureStore } from '@reduxjs/toolkit'
import concertReducer from './ConcertSlice'

export default configureStore({
    reducer: {
        concert: concertReducer
    }
})