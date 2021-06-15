import {Calendar, momentLocalizer} from 'react-big-calendar'
import {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {pushEvent, selectEvent} from '../stores/ConcertSlice'
import moment from 'moment'
import {fetch as nhkFetch} from '../fetchers/NhkOrchestraFetcher'
import {fetch as yomiuriFetch} from '../fetchers/YomiuriOrchestraFetcher'
import {fetch as tmsFetch} from '../fetchers/TmsOrchestraFetcher'

import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = momentLocalizer(moment)

const ConcertCalendar = () => {
    const events = useSelector(state => state.concert.events)
    const dispatch = useDispatch()

    useEffect(() => {
        const storeConcert = concerts => {
            for (let concert of concerts) {
                dispatch(pushEvent({
                    title: concert.title,
                    start: concert.date.format('YYYY-MM-DD'),
                    end: concert.date.format('YYYY-MM-DD'),
                    allDay: true,
                    resource: concert.program
                }))
            }
        }
        nhkFetch().then(storeConcert).catch(e => console.error(e))
        yomiuriFetch().then(storeConcert).catch(e => console.error(e))
        tmsFetch().then(storeConcert).catch(e => console.error(e))
    }, [])

    const onSelectEvent = (event, e) => {
        dispatch(selectEvent(event))
    }

    return (
        <div style={{padding: '3vw'}}>
            <Calendar
                localizer={localizer}
                views={['month', 'agenda']}
                events={events}
                startAccessor="start"
                endAccessor="end"
                length={10} // TODO 月末日 - 今日の日付
                onSelectEvent={onSelectEvent}
                style={{height: 500}}
            />
        </div>
    )
}

export default ConcertCalendar
