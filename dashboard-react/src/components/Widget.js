import React from 'react';
import { RiGroupLine, RiOrderPlayLine, RiArrowUpSLine, RiArrowDownSLine, RiWallet2Line, RiScalesLine } from "@remixicon/react";

export default function Widgets({ type }) {

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (<RiGroupLine size={16} color='crimson'  />),
        bg: "rgba(255, 0, 0, .2)",
        arrow: (<RiArrowUpSLine color="green" size={14} />),
        amount: 100,
        percentage: 60,
      }
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "See all orders",
        icon: (<RiOrderPlayLine size={16} color='goldenrod' />),
        bg: "rgba(218, 165, 32, .2)",
        arrow: (<RiArrowUpSLine color="green" size={14} />),
        amount: 20,
        percentage: 47,
      }
      break;

    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "See all earnings",
        icon: (<RiWallet2Line size={16} color='green' />),
        bg: "rgba(0, 128, 0, .2)",
        arrow: (<RiArrowDownSLine color="red" size={14} />),
        amount: 67,
        percentage: 10,
      }
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See balance",
        icon: (<RiScalesLine size={16} color='purple' />),
        bg: "rgba(128, 0, 128, .2)",
        arrow: (<RiArrowUpSLine color="green" size={14} />),
        amount: 42,
        percentage: 15,
      }
      break;
    default:
  }

  return (
    <div className="widget">

        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{data.isMoney && "$"} {data.amount}</span>
          <a href="#" className="link">{data.link}</a>
        </div>

        <div className="right">
          <div className="percentage">
            {data.arrow}
            {data.percentage}%</div>

            <div style={{backgroundColor: data.bg}} className="icon">{data.icon}</div>
        </div>
    </div>
  )
}
