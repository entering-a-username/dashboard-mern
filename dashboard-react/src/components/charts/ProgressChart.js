import React from 'react';

export default function ProgressChart() {
  const data = [
    {
      id: 1,
      name: "Jeans",
      percentValues: 70,
    },
    {
      id: 2,
      name: "Shirts",
      percentValues: 40,
    },
    {
      id: 3,
      name: "Belts",
      percentValues: 60,
    },
    {
      id: 4,
      name: "Caps",
      percentValues: 80,
    },
    {
      id: 5,
      name: "Others",
      percentValues: 20,
    },
  ];

  return (
    <div className="progress-bar">
      <div className="info">
        <h4 className="title">Most Sold Items</h4>
      </div>

      <div className="list">
        {data?.map(bar => {
          return (
            <div className="progress-bar-item" key={bar.id}>
              <div className="info">
                <p className="info-name">{bar.name}</p>
                <p className="info-value">
                  {bar.percentValues}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${bar.percentValues}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
