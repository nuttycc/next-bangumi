'use client'

import { useState } from "react";

function nameCard({ title }) {
  return (
    <div>
      <div className="full-title" styles="display:block;">
        {title}
      </div>
    </div>
  );
}

function AniCard({ title, src }) {
  return (
    <div className="card-box" title={title}>
      <img
        className="card-img"
        src={src}
        alt={title}
        width="120"
        height="150"
      />
      <span className="card-title">{title}</span>
    </div>
  );
}

export function AniCalender() {
  const [calendarList, setCalendarList] = useState([]);

  const myHeaders = new Headers({
    Host: "api.bgm.tv",
    Connection: "keep-alive"
  });

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("https://api.bgm.tv/calendar", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const calendar = data.map((obj, id) => {
        const itemsList = obj.items.map((item) => {
          return (
            <div key={item.id}>
              <AniCard
                title={item["name_cn"] || item["name"]}
                src={item.images.common}
              />
            </div>
          );
        });

        return (
          <div className="weekday-box">
            <div className="weekday-title">{obj.weekday.cn}</div>
            <div key={id} className="weekday-cards">
              {itemsList}
            </div>
            {/* <div className="weekday-tail">&gt;</div> */}
          </div>
        );
      });

      setCalendarList(calendar);
    })
    .catch((err) => console.error(err));

  return (
    <div>
      {calendarList}
    </div>
  );
}