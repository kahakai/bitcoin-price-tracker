# Bitcoin Price Tracker
Bitcoin Price Tracker is a microservice that allows to get the current price of Bitcoin based on Binance API.

## Endpoints
- `/price`: Get current mid price of Bitcoin.

## Examples
`/price`
```json
{
    "bidPrice": "31307.44",
    "bidPriceCommission": "3130.7440",
    "totalBidPrice": "34438.1840",
    "askPrice": "31307.45",
    "askPriceCommission": "3130.7450",
    "totalAskPrice": "34438.1950",
    "commission": "0.1",
    "midPrice": "34438.18950"
}
```

## Options
You can specify some options through environment variables.

- `UPDATE_FREQUENCY`: Frequency in seconds to be used for the price updater (default value is 10 seconds).
- `SERVICE_COMMISSION`: Commission in percents between 0 and 99 that the service will take from the price (default value is 0.01 percent).
- `PORT`: HTTP port for the service.

## Launch locally
1. `npm install`
2. `npm run dev` or `npm run build && npm start`

## Launch locally inside Docker container
1. `docker build -t bitcoin-price-tracker .`
2. `docker run --name bitcoin-price-tracker --rm -it -p 3000:3000 bitcoin-price-tracker`

Full run command example: `docker run --name bitcoin-price-tracker --rm -it -p 4000:4000 --env UPDATE_FREQUENCY=5 --env SERVICE_COMMISSION=0.05 --env PORT=4000 bitcoin-price-tracker`

## Installation
1. Deploy to [Fly.io](https://fly.io/) or similar service.
2. Add optional `UPDATE_FREQUENCY` secret (default value is `10`).
3. Add optional `SERVICE_COMMISSION` secret (default value is `0.01`).
4. Add optional `PORT` secret (default value is `3000`).
