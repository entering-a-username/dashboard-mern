import React from 'react'
import { useParams } from 'react-router-dom';
import { RiHome2Fill } from '@remixicon/react';
// import { Link } from 'react-router-dom';
import { Breadcrumbs, Checkbox, Link, Select, MenuItem, FormControlLabel } from '@mui/material';



export default function View() {
    const { type } = useParams();

    function capitalize(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }
  return (
    <>
    <main className='list-page'>
        <div className="top">
            <h1>{capitalize(type)} List</h1>

            <div className="breadcrumbs">
                <Breadcrumbs aria-label="breadcrumb" className='crumb'>
                    <Link href="/" sx={{ display: 'flex', alignItems: 'center', columnGap: "5px" }} underline="hover" to="/"><RiHome2Fill size={22} /> Dashboard </Link>
                    <Link underline="hover" to="/"> Lists </Link>
                    <Link href={`/list/${type}`} underline="hover" color="text.primary" aria-current="page" > {capitalize(type)} </Link>
                    <Link underline="hover" sx={{ bgcolor: "grey", padding: "4px 8px" }}>{capitalize(type)} View</Link>
                </Breadcrumbs>
            </div>
        </div>


        <div className="bottom">
            <div className="info">
                <h1>All {type === "category" ? "Categories" : `${type}s`}</h1>

                <div className="filter">
                    <div className="left">
                        <div className="show-by">
                            <span>Show by</span>
                           
                        </div>
                    </div>

                    <div className="right">
                        <FormControlLabel control={<Checkbox />} label={`Show Best Selling ${type === "category" ? "Categories" : `${type}s`}`} />
                    </div>
                </div>



            </div>
        </div>


    </main>
    </>
  )
}
