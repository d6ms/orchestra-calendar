import {createSlice} from '@reduxjs/toolkit'

export const concertSlice = createSlice({
    name: 'concert',
    initialState: {
        value: 0,
        events: [],
        selectedEvent: null
    },
    reducers: {
        pushEvent: (state, action) => {
            state.events.push(action.payload)
        },
        selectEvent: (state, action) => {
            state.selectedEvent = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {pushEvent, selectEvent} = concertSlice.actions

export default concertSlice.reducer