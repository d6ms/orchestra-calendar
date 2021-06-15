import axios from 'axios'
import moment from 'moment'
import cheerio from 'cheerio';


const fetch = async () => {
    const url = '/api/yomiuri/#search_r'
    const params = new URLSearchParams()
    params.append('search1', '202106')
    params.append('search2', 'all')
    const res = await axios.post(url, params)
    const html = res.data
    const $ = cheerio.load(html);
    const concerts = []
    for (let concert of $('.search_result')) {
        concert = cheerio.load(concert)
        const title = concert('h2').text().trim()
        let date = concert('.futura').text()
        date = moment(date, 'YYYY MM.DD')
        let program = concert('.concert_info_detail').text().trim()
        concerts.push({
            title,
            date,
            program
        })
    }
    return concerts
}

export {fetch}