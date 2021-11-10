import storageService from './storage.service'
import { utilService } from './util.service';
import axios from 'axios'
let orderBookCacheAsk = []
let orderBookCacheBids = []
export const orderBookService = {
    getOrderBook
}
async function getOrderBook(keySerch = 'btcusd') {
    if (!keySerch) return []
   let orderBookCacheAsk = storageService.loadFromStorage([keySerch + 'asks'])
    let orderBookCacheBids = storageService.loadFromStorage([keySerch + 'bids'])

    if (orderBookCacheBids && orderBookCacheAsk) {
        console.log('No need to fetch, retrieving from Cache');
        return ([orderBookCacheAsk,orderBookCacheBids])
    }
    try {
        const res = await axios.get(`https://www.bitstamp.net/api/v2/order_book/${keySerch}/`)
        const asks = res.data.asks
        const bids = res.data.bids
        await storageService.saveToStorage([keySerch + 'asks'], asks)
        await storageService.saveToStorage([keySerch + 'bids'], bids)
        return [asks, bids]
    }
    catch (err) {
        console.log('Cannwot reach server:', err);
    }
}
