import React, { useEffect, useState } from 'react';

import { Checkbox, Pagination, Breadcrumbs, Rating } from '@mui/material';

import Chart from "../components/charts/Chart";
import Table1 from "../components/Table";

import { columnsInfo } from "../info/columns";

import { Link, useParams } from 'react-router-dom';

import { RiEyeFill, RiCheckboxFill, RiShoppingBag2Line, RiCornerUpLeftLine, RiEditFill, RiDeleteBinFill, RiHome2Fill } from '@remixicon/react';

export default function Single() {
  const { type, id } = useParams();

  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedCategory, setFetchedCategory] = useState("");
  const [fetchedSubcategories, setFetchedSubcategories] = useState([]);
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  useEffect(() => {
    async function fetchData() {

      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3030/api/${type}/${id}`);
        const data = await res.json();

        console.log(data)

        setFetchedData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      // const resCat = await fetch(`http://localhost:3030/api/category/${data.category[0]}`);
      // const dataCat = await resCat.json();

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
                {/* zoom images etc */}
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
                    {/* <span>{fetchedData?.categories[0]}</span> */}
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

                  <div className="review-card">
                    <div className="top">
                      <div className="info">
                        <img src="" alt="" />
                        <div>
                          <span>Miron Mahmud</span>
                          <span>25 minutes ago</span>
                        </div>
                      </div>
                      <div className="action">
                        <div className="rating">

                        </div>

                        <div className="reply">
                          <RiCornerUpLeftLine />
                          <button>Reply</button>
                        </div>
                      </div>

                      <p>COMMENT</p>
                    </div>
                  </div>
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
          type === "user" && 
          <div className="bottom single-bottom user">
            <h1>User Information</h1>

            <div className="top-2">
              
              <div className="left">
          
                <div className="img">
                  <img src={fetchedData.icons} alt="" />
                </div>
                {/* zoom images etc */}
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

              <div>
                <h1>Latest Transactions</h1>
                <Table1 />
              </div>

              
            </div>
          </div>
        }


    </main>
    </>
  )
}
