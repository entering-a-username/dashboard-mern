import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Dialog, DialogActions, Pagination, Slide } from '@mui/material';

import { columnsInfo } from "../info/columns";

import { RiEyeFill, RiEditFill, RiDeleteBinFill } from '@remixicon/react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

export default function Table1({ type, showBy, showMostPopular }) {
    const columns = columnsInfo[type] || [];

    const [fetchedData, setFetchedData] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3030/api/${type}/?showBy=${showBy}`);
                const data = await res.json();
                
                setFetchedData(data);
                setPage(data.page)
                
            } catch (error) {
              console.error(error);
            }
        }

        fetchData();
    }, []);


    // delete functionality
    async function del(id) {
        try {
            const res = await fetch(`http://localhost:3030/api/${type}/${id}`, {
                method: "DELETE",
            })
            const data = await res.json();

            // reload page
            if (data.success) {
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }

    function handleClose() {
        setOpen(false);
        setSelectedId(null);
    }

    // show most popular
    useEffect(() => {
        async function showMostPopularFunc() {
            const res = await fetch(`http://localhost:3030/api/${type}/?showMostPopular=${showMostPopular}`);
            const data = await res.json();

            setFetchedData(data);
            setPage(data.page);
        }

        showMostPopularFunc();
    }, [showMostPopular]);
    

    // pagination
    async function handleChange(e, value) {
        const res = await fetch(`http://localhost:3030/api/${type}?page=${value}&showBy=${showBy}`);
        const data = await res.json();
        // setIsSnackbarOpen(true);

        if (data) {
            setFetchedData(data);
            setPage(value)
            console.log(page)
        }
    } 

    function formatDate(d) {
        const date = new Date(d);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    console.log(fetchedData)
  return (
    <>
    
        <table className={type}>
            <thead>
                <tr>
                    {
                        columns?.header?.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))
                    }
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    fetchedData.data?.length > 0 && fetchedData.data?.map((item, index) => (
                        <tr key={index}>
                            {
                                columns.fields?.map(column => (
                                    <td key={column}>
                                        {column === "icons" ? (
                                            // <img src={item[column]} />
                                            <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt="" />
                                        ) : column === "subcategories" || column === "categories" || column === "sizes" ? (
                                            item[column]?.map((col, index) => (
                                                <>
                                                    {col} <br />
                                                </>
                                            ))
                                        ) : column === "createdAt" || column === "updatedAt" ? formatDate(item[column]) : (item[column] || (index + 1 + (page - 1) * showBy))}
                                    </td>
                                ))
                            } 

                            <td className='actions'>
                                {(type === "product" || type === "admin" || type === "user") && <div><Link to={`/${type}/${item._id}`}><RiEyeFill /></Link></div>}
                                
                                <div><Link to={`/${type}/${item._id}/edit`}><RiEditFill /></Link></div>
                                
                                <div onClick={() => {
                                    setSelectedId(item._id);
                                    setOpen(true);
                                }}><RiDeleteBinFill /></div>

                                <Dialog className='dialog' onClose={handleClose} open={open} TransitionComponent={Transition}>
                                    <h1>Are you sure you want to delete this {type}?</h1>     
                                    <DialogActions>
                                        <button onClick={handleClose}>No</button>
                                        <button onClick={() => del(selectedId)}>Yes</button>
                                    </DialogActions>          
                                </Dialog>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <Pagination page={page} count={fetchedData?.totalPages} color="primary" className='pagination'
            showFirstButton showLastButton onChange={handleChange} />
    </>
  )
}
