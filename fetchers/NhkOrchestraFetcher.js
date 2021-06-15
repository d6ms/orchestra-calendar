import axios from 'axios'
import moment from 'moment'
import cheerio from 'cheerio';


const fetch = async () => {
    const url = '/api/nhk/index_2021_06.html'
    const res = await axios.get(url)
    const html = res.data
    const $ = cheerio.load(html);
    const concerts = []
    for (let concert of $('.concert_data')) {
        concert = cheerio.load(concert)
        const title = concert('h3').text()
        let date = concert('.date').text()
        date = date.match(/\d+年\d+月\d+日/)[0]
        date = moment(date, 'YYYY年MM月DD日')
        const program = []
        for (let track of concert('.tracklist > li')) {
            program.push(track.children[0].data)
        }
        concerts.push({
            title,
            date,
            program: program.join('\n')
        })
    }
    return concerts
}

export {fetch}