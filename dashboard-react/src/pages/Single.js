import React, { useEffect, useState } from 'react';

import { Checkbox, Pagination, Breadcrumbs, Rating } from '@mui/material';

import { columnsInfo } from "../info/columns";

import { Link, useParams } from 'react-router-dom';

import { RiEyeFill, RiCheckboxFill, RiShoppingBag2Line, RiCornerUpLeftLine, RiEditFill, RiDeleteBinFill, RiHome2Fill } from '@remixicon/react';

export default function Single() {
  const { type, id } = useParams();

  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedCategory, setFetchedCategory] = useState("");
  const [fetchedSubcategories, setFetchedSubcategories] = useState([]);

  function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3030/api/${type}/${id}`);
      const data = await res.json();

      console.log(data)

      setFetchedData(data);

      // const resCat = await fetch(`http://localhost:3030/api/category/${data.category[0]}`);
      // const dataCat = await resCat.json();

    }

    fetchData();
  }, []);

  
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


        <div className="bottom single-bottom">
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

                <span className="title">{fetchedData.name} Formal suits for men weeding slim fit 3 piece dress</span>

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


    </main>
    </>
    // <div className="single">
      
    //   <div className="single-container">
        
    //     <div className="top">

    //       <div className="left">
    //         <h1 className="title">Information</h1>
    //         <div className="item">
    //           <img src="https://picsum.photos/200/300" alt="" />
    //           <div className="details">
    //             <h1 className="item-title">Jane Doe</h1>
    //             <div className="detail-item">
    //               <span className="item-key">Email:</span>
    //               <span className='item-value'>janedoe@gmial.com</span>
    //             </div>

    //             <div className="detail-item">
    //               <span className="item-key">Phone:</span>
    //               <span className='item-value'>+123456789</span>
    //             </div>

    //             <div className="detail-item">
    //               <span className="item-key">Country:</span>
    //               <span className='item-value'>Norway</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="right">
    //         <Chart aspect={3 / 1} title="User Spending (last 6 months)" />
    //       </div>
    //     </div>

    //     <div className="bottom">
    //       <h1 className="title">Last Transactions</h1>
    //       <div className="list">
    //         <Table1 />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
