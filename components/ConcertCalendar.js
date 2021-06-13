import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useSelector, useDispatch } from 'react-redux'
import { pushEvent } from '../stores/ConcertSlice'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = momentLocalizer(moment)

const onSelectEvent = (event, e) => {
    // TODO store event
    console.log(event)
}

const ConcertCalendar = () => {
    const events = useSelector(state => state.concert.events)
    const dispatch = useDispatch()
    return (
        <div style={{padding: '5vw'}}>
            <button className="btn btn-primary" onClick={() => dispatch(pushEvent({
                title: 'test event',
                start: moment('2021/6/15'),
                end: moment('2021/6/15'),
                allDay: true
            }))}>add  event</button>
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
