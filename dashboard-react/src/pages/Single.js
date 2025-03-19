import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Rating } from '@mui/material';

import Chart from "../components/charts/Chart";

import { RiCheckboxFill, RiShoppingBag2Line, RiCornerUpLeftLine, RiHome2Fill } from '@remixicon/react';

export default function Single() {
  const { type, id } = useParams();

  const [fetchedData, setFetchedData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  const events = [
    { status: "Delivered", description: "Delivered, in/at mailbox", timestamp: new Date(new Date(fetchedData.expectedArrival).getTime() + 10 * 24 * 45 * 58 * 250).toLocaleString() },
    { status: "Out for delivery", description: "Out for delivery", timestamp: new Date(new Date(fetchedData.expectedArrival).getTime() + 10 * 24 * 45 * 58 * 100).toLocaleString() },
    { status: "In transit", description: "Arrived at post office", timestamp: new Date(new Date(fetchedData.expectedArrival).getTime() + 1 * 24 * 55 * 58 * 100).toLocaleString() },
    { status: "Shipped", description: "Shipped", timestamp: new Date(new Date(fetchedData.createdAt).getTime() + 1 * 24 * 45 * 58 * 800).toLocaleString() },
    { status: "Processing", description: "Order confirmed, awaiting shipment", timestamp: new Date(fetchedData.createdAt).toLocaleString() },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3030/api/${type}/${id}`);
        const data = await res.json();

        if (type === "product") {
          const res1 = await fetch(`http://localhost:3030/api/review/${id}`);
          const data1 = await res1.json();

          setReviews(data1.data);
        }

        if (type === "order") {
          setFetchedData(data.data);
          setLoading(false);
          return;
        }

        setFetchedData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [type, id]);

  
  function formatDate(d) {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function calculatePerc(ratings, total) {
    const percentages = {};
    for (const [star, count] of Object.entries(ratings)) {
      percentages[star] = (count / total) * 100;
    }

    return percentages;
  }

  const ratings = {5: 65, 4: 15, 3: 5, 2: 7, 1: 8};
  const percentages = calculatePerc(ratings, 100);

  if (loading) {
    return (
      <div className='list-page'>
        <div className="loading">Loading...</div>
      </div> 
    )
  }

  if (!fetchedData) {
    return (
      <main className="list-page">
        <div className="error-message">Failed to load data.</div>
      </main>
    );
  }

  return (
    <>
    
    <main className='list-page'>
        <div className="top">
            <h1>View { capitalize(type) }</h1>

            <div className="breadcrumbs">
                <Breadcrumbs aria-label="breadcrumb" className='crumb'>
                    <Link href="/" sx={{ display: 'flex', alignItems: 'center', columnGap: "5px" }} underline="hover" to="/"><RiHome2Fill size={22} /> Dashboard </Link>
                    <Link underline="hover" to="/product"> Products </Link>
                    <Link href={`/list/${type}`} underline="hover" color="text.primary" aria-current="page" > View { capitalize(type) } </Link>
                </Breadcrumbs>
            </div>
        </div>


        {
        type === "product" && <div className="bottom single-bottom">
            <div className="top-2">
              <div className="left">
                <h1>{ capitalize(type) } Gallery</h1>
                <div className="img">
                  <img src={fetchedData.icons} alt="" />
                </div>
              </div>

              <div className="right">
                <h1>{ capitalize(type) } Details</h1>

                <span className="title">{fetchedData.name}</span>

                <div className="icon">
                  <RiShoppingBag2Line />
                  <div className="info">
                    <span>Brand</span>
                    <span>{fetchedData.brand}</span>
                  </div>
                </div>

                <div className="icon">
                  <RiShoppingBag2Line />
                  <div className="info">
                    <span>Price</span>
                    <span>{fetchedData.price} ({fetchedData?.discount}% Discount)</span>
                  </div>
                </div>

                <div className="icon">
                  <RiShoppingBag2Line />
                  <div className="info">
                    <span>Category</span>
                    <span>{fetchedData?.categories[0]}</span>
                  </div>
                </div>

                <div className="icon">
                  <RiShoppingBag2Line />
                  <div className="info">
                    <span>Colors</span>
                    <div className="tags">
                      {fetchedData?.colors?.map(color => (
                        <div className="tag">{color}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="icon">
                  <RiShoppingBag2Line />
                  <div className="info">
                    <span>Sizes Available</span>
                    <div className="tags">
                      {fetchedData?.sizes?.map(size => (
                        <div className="tag">{size}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="icon">
                  <RiShoppingBag2Line />
                  <div className="info">
                    <span>In Stock</span>
                    <span>{fetchedData.countInStock}</span>
                  </div>
                </div>

                <div className="icon">
                  <RiCheckboxFill />
                  <div className="info">
                    <span>Published</span>
                    <span>{formatDate(fetchedData.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-2">
                <div className="description">
                  <h1>Product Description</h1>
                  <p>{fetchedData.description}</p>
                </div>

                <div className="ratings">
                  <div>
                    <h1>Rating Analytics</h1>
                    <div>
                      <Rating value={Math.ceil(fetchedData.rating)} />
                      <span>{fetchedData.numReviews} reviews</span>
                    </div>
                  </div>

                  <div className="rating">

                    {
                      Object.entries(ratings).map(([star, count], index) => (
                        <div key={star}>
                          <span>{index + 1} star</span>
                          <div className="bar" style={{'--bar-width': `${percentages[star]}%`}}></div>
                          <span>({count})</span>
                        </div>
                      ))
                    }
                  </div>
                </div>


                <div className="dashboard">

                </div>

                <div className="reviews">
                {
                          reviews?.slice(-5).map((review, index) => (
                            <div className="card" key={index}>
                              <div>
                                <img src={review.icon} alt="" />
                                <h1>{review.name}</h1>
                                <span>{new Date(review.createdAt).toLocaleDateString('en-US', {
                                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                                })}</span>
                              </div>
                            
                              <div>
                                <Rating value={review.rating} className='top' readOnly name="read-only" />
                                <p>{review.body}</p>
                              </div>

                              <div className="reply">
                                <RiCornerUpLeftLine />
                                <button>Reply</button>
                              </div>
                            </div>
                          ))
                        }
                </div>

                <form className="review-reply">
                  <h1>Reply</h1>
                  <textarea name="" id="" placeholder='Type your reply...'>

                  </textarea>

                  <button type="submit">Reply</button>
                  
                </form>
            </div>
        </div>
        }

        {
          fetchedData.length !== 0 && type === "user" && 
          <div className="bottom single-bottom user">
            <h1>User Information</h1>

            <div className="top-2">
              
              <div className="left">
           
                <div className="img">
                  <img src={fetchedData.icon} alt="" />
                </div>
              </div>

              <div className="right">
                
                <span className="title">{fetchedData.name}</span>
                <div className="icon">
                  <span>Email: {fetchedData.email}</span>
                </div>

                <div className="icon">
                  <span>Phone Number: {fetchedData.phoneNumber}</span>
                </div>

                <div className="icon">
                  <span>{fetchedData.city}, {fetchedData.country}</span>
                </div>

                <div className="icon">
                  <span>Occupation: {fetchedData.occupation}</span>
                </div>

                <div className="icon">
                  <span>Role: {fetchedData.role}</span>
                </div>

                <div className="icon">
                  <span>{fetchedData.transactions?.length} Transactions</span>
                </div>
                <div className="icon">
                  <span>Joined {formatDate(fetchedData.createdAt)}</span>
                </div>
  
              </div>
            </div>

            <div className="bottom-2">

              <div>
                <Chart aspect={3 / 1} title="User Spending (last 6 months)" />
              </div>
            </div>
          </div>
        }

        {
          type === "order" &&
          <section className="bottom single-bottom order">
            <div className="card">
                <h2>#{fetchedData.trackingNumber} Status: {fetchedData.status}</h2>
                {fetchedData.status !== "delivered" && <h4>Expected arrival {new Date(fetchedData.expectedArrival).toLocaleDateString()}</h4>}
                {fetchedData.status === "delivered" && <h5 style={{color: "green"}}>The order has been delivered successfully</h5>}


                <div className="timeline">
                    {events.map((e, index) => (
                        <div key={index}>
                            <div className="line">
                                <div className="circle"></div>
                                <div className="info">
                                    <h3>{`${e.status} - ${e.description}`}</h3>
                                    <span>{e.timestamp}</span>
                                </div>
                            </div>
                            {index < events.length - 1  && (
                                <div className="dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                  
                <div className="shipment-info">
                    <h1>Shipment Information</h1>
                    <div>
                        <span><b>Package:</b> 1</span>
                        <span><b>Status:</b> {fetchedData.status}</span>
                        <span><b>Destination:</b> {fetchedData?.address.country} </span>
                        <span><b>Carrier:</b> DHL</span>
                        <span><b>Type of shipment:</b> Van move</span>
                        <span><b>Weight:</b> 500g</span>
                        <span><b>Shipment mode:</b> Land shipping</span>
                        <span><b>Carrier reference No:</b> 123hjk</span>
                        <span><b>Product:</b> Clothes</span>
                        <span><b>Qty: </b>{fetchedData?.items.length - 2}</span>
                        <span><b>Payment mode:</b> Card</span>
                        {fetchedData.deliveryMethod === "flat" && <span><b>Expected delivery date:</b> {new Date(fetchedData.expectedArrival).toLocaleDateString()}</span>}
                        {fetchedData.deliveryMethod !== "flat" && <span><b>Pick-up date:</b> {new Date(fetchedData.expectedArrival).toLocaleDateString()}</span>}
                        {fetchedData.deliveryMethod !== "flat" && <span><b>Pick-up time:</b> 14:00 PM</span>}
                    </div>
                </div>

                <div className="customer">
                    <h1>Customer Information</h1>
                    <div>
                        <span><b>Contact information:</b> <br /> {fetchedData.customer.name} <br /> {fetchedData.customer.email} <br /> {fetchedData.customer.phone} </span>
                        <span><b>Payment method:</b> <br /> Card - ${fetchedData.amount}</span>
                        <span><b>Shipping address:</b> <br /> {fetchedData.address.line2 + ", " + fetchedData.address.city} <br /> {fetchedData.address.country} ({fetchedData.address.postal_code}) </span>
                        <span><b>Billing address:</b> <br /> {fetchedData.customer.name}'s card</span>
                    </div>
                </div>

                <div className="items">
                    <h1>Items</h1>

                    <div>
                        {fetchedData.items.slice(0,-2).map((item, index) => (
                            <div key={index}>{item.name} ------- ${item.price} x{item.quantity}</div>
                        ))}
                    </div>
                </div>
            </div>
          </section>
        }
    </main>
    </>
  )
}
