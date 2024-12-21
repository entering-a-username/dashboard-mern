import { Breadcrumbs, Checkbox, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';

export default function CatList() {
    const [catData, setCatData] = useState([]);
    const type = "category";
    const [page, setPage] = useState(1);

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

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
  return (
    <>

        <div>
            <Snackbar open={isSnackbarOpen} autoHideDuration={5000} message="Category" action={handleChange} />
            <h5>category list</h5>

            <div>

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
        <table>
            <thead>
                <tr>
                    <th>UID</th>
                    <th>IMAGE</th>
                    <th>CATEGORY</th>
                    <th>COLOR</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
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
                            <td>{item.color}</td>
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

        <div>

            <p>Showing 12 of {catData?.categories?.length} results</p>
            <Pagination page={page} count={catData?.categories?.length} color="primary" className='pagination'
            showFirstButton showLastButton onChange={handleChange} />
        </div>
    </>
  )
}
