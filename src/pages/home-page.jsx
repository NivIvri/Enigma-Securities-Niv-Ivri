import React, { useEffect, useState } from "react";


export function HomePage() {
  const [bids, setBids] = useState(['']);
  const [asks, setAsks] = useState(['']);

  useEffect(() => {
    return () => {
      ws.send(JSON.stringify(apiCallClose));
    }
  }, [])

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  const apiCallClose = {
    event: "bts:unsubscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if ((json.event = "data")) {
        setBids(json.data.bids.slice(0, 20));
        setAsks(json.data.asks.slice(0, 20));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const firstBids = bids.map((item) => {
    return (
      <div>
        <p className='ask-and-qty'>
          <span>{item[0]}</span>
          <span>{item[1]}</span>
        </p>
      </div>
    );
  });

  const firstAsks = asks.map((item) => {
    console.log(item);
    return (
      <div >
        <p className='ask-and-qty'>
          <span>{item[0]}</span>
          <span>{item[1]}</span>
        </p>
      </div>
    );
  });

  return <div className='home-page'>
    <div className="header">
      <div>Bid price</div>
      <div>Bid Qty</div>
      <div>Ask price</div>
      <div>Ask Qty</div>
    </div>
    <div className="flex">
      <div className="asks">{firstAsks}</div>
      <div className="bids">{firstBids}</div>
    </div>

  </div>;
}

