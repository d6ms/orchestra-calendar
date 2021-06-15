import axios from 'axios'
import moment from 'moment'
import cheerio from 'cheerio';


const fetch = async () => {
    const url = '/api/tms/?ym=202106&tab=2#concert-search2'
    const params = new URLSearchParams()
    let res
    try {
        res = await axios.get(url)
    } catch(err) {
        res = err.response
    }
    const html = res.data
    const $ = cheerio.load(html);
    const concerts = []
    for (let concert of $('.entry-section')) {
        concert = cheerio.load(concert)
        const title = concert('h3').text().trim()
        let date = concert('.entry-date').text()
        date = date.match(/\d+年\d+月\d+日/)[0]
        date = moment(date, 'YYYY年MM月DD日')
        let program = concert('.entry-detail').text().trim()
        concerts.push({
            title,
            date,
            program
        })
    }
    return concerts
}

export {fetch}