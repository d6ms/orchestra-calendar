import {useSelector} from 'react-redux'
import moment from "moment"

const ConcertView = () => {
    const event = useSelector(state => state.concert.selectedEvent)

    if (event) {
        return (
            <div style={{padding: '3vw 3vw 3vw 0'}}>
                <h2>{event.title}</h2>
                <p>{moment(event.start).format('YYYY年MM月DD日')}</p>
                <pre>
                    {event.resource}
                </pre>
            </div>
        )
    } else {
        return (<div />)
    }
}

export default ConcertView
