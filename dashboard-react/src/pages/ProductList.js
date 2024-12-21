import { Breadcrumbs, Checkbox, MenuItem, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import MenuItem from '@mui/material/MenuItem';
import Select from "@mui/material/Select";
import Snackbar from '@mui/material/Snackbar';
// 24 video   
// uploads is 25 VIDEO
export default function CatList() {
    const [catData, setCatData] = useState([]);
    const type = "product";
    const [page, setPage] = useState(1);

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    const [product, setProduct] = useState(null);
// img add 24 video 19:00, 55:00
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:3030/api/${type}?page=${page}`);
            const data = await res.json();

            console.log(data)

            if (data) {
                setCatData(data);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        let tmp = [];
        for (let i = 0; i < imgFiles.length; i++) {
            tmp.push(URL.createObjectURL(imgFiles[i]))
        }

        const objectURLs = tmp;
        setPreviews(objectURLs);

        // free memory
        for (let i = 0; i < objectURLs.length; i++) {
            return () => {
                URL.revokeObjectURL(objectURLs[i])
            }
        }
    }, [imgFiles])

    useEffect(() => {
        window.scrollTo(0, 0);
        // fetchData(product);
    })

    const fd = new FormData();
    // fd.append('name', formfields.name)
    async function onChangeFile(e, APIEndpoint) {
        try {
            // 26 video
            const imgArr = [];
            const files = e.target.files;
            setPreviews(e.target.files[0])
            // setImgFiles(e.target.files[0])
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                imgArr.push(file);
                fd.append("images", file);
            }

            // setFiles(imgArr);

            // postData(APIEndpoint, fd).then(res => {
            //     console.log(res)
            // })
        } catch (err) {
            console.error(err);
        }
    }

    async function handleChange(e, value) {
        const res = await fetch(`http://localhost:3030/api/${type}?page=${value}`);
        const data = await res.json();

        console.log(data)

        setIsSnackbarOpen(true);

        if (data) {
            setCatData(data);
            setPage(value)
        }
    }

    function handleChangeProduct(e) {
        setProduct(e.target.value);
    }
    function handleChangeIsFeatured(e) {
        setIsFeatured(e.target.value);
    }

    // function deleteProduc(id) {
    //     // setProgress(40)
    //     deleteData().then(
    //         context.setprpgress(100)
    //         setalerybox(open true,error true, msg rdeleted)
    //     )
    // }
  return (
    <>
{/* make a request in img src */}
{/* 28 video is same for category */}
{/* <img src={`localhost:3030/uploads/${item.images[0]}`} alt="" /> */}
        <div>
            <Snackbar open={isSnackbarOpen} autoHideDuration={5000} message="Product" action={handleChange} />
            <h5>category list</h5>

            <div>
                {/* products forms is 27 video */}

                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                      MUI
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/material-ui/getting-started/installation/"
                    >
                      Core
                    </Link>
                    {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
                </Breadcrumbs>

                <Link to="/category/new"><button>Add Category</button></Link>
            </div>
        </div>


        <div className="filter">


        </div>
        <table>
            <thead>
                <tr>
                    <th>UID</th>
                    <th>IMAGE</th>
                    <th>PRODUCT</th>
                    <th>DESCRIPTION</th>
                    <th>BRAND</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>IN STOCK</th>
                    <th>RATING REVIEWS</th>
                    <th>IS FEATURED</th>
                    <th>DATE CREATED</th>
                    <th>ACTIONS</th>
                </tr> 
            </thead>
            <tbody>
                {/* img src={process.env.baseuRL /oi tem.iamges[0]} */}

                {
                    catData?.categories?.length !== 0 && catData?.categories?.map((item, index) => (
                        <tr>
                            <td>
                                <div>
                                    <Checkbox>{index + 1}</Checkbox>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="img-wrapper">
                                        <div>
                                            {/* <img src={item.images[0]} alt="" />
                                             */}
                                             <img src="https://picsum.photos/200/300" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>{item.description}</td>
                            <td>{item.brand}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.countInStock}</td>
                            <td>{item.rating} by {item.numReviews} users</td>
                            <td>{item.isFeatured}</td>
                            <td>{item.dateCreated}</td>
                            <td>
                                <div className="actions">
                                    <button className="success">edit</button>
                                    <button>delete</button>

                                    {/* dialog */}
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

{/* new form */}
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <h6>is featured</h6>
                    <Select value={isFeatured} onChange={handleChangeIsFeatured}
                    displayEmpty inputProps={{ 'aria-label': 'Without label' }}>

                        <MenuItem value="">
                            <em>none</em>
                        </MenuItem>
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                    </Select>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="imagesUpload">
                <h5>upload media and published</h5>

                {
                    previews.length !== 0 && imgFiles?.map((img, index) => {
                        return (
                            <div className="upload">
                                <img src={img} alt="" />
                            </div>
                        )
                    })
                }
            
                <div className="uploadBox">
                    <div className="upload">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="uploadBox">
                    <div className="upload">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="uploadBox">
                    <div className="upload">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="uploadBox">
                    <div className="upload">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="uploadBox">
                    <div className="upload">
                        <img src="" alt="" />
                    </div>
                </div>
                    {/* 25 video 10:00 styling */}
                <div className="uploadBox">
                    <input type="file" multiple onChange={(e) => onChangeFile(e, '/api/product/upload')} name="images" id="" />
                    <div className="info">
                        {/*  img uploadtext with icon*/}
                    </div>
                </div>

                

                <button type="button"></button>
            </div>
        </div>

        <div>
                <h3>uolaoded media and published</h3>
            <p>Showing 12 of {catData?.categories?.length} results</p>
            <Pagination page={page} count={catData?.categories?.length} color="primary" className='pagination'
            showFirstButton showLastButton onChange={handleChange} />
        </div>
    </>
  )
}
