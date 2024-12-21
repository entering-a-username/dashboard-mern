import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from "@mui/material/Link";

import Table1 from '../components/Table1';

import { Breadcrumbs, Checkbox, Select, MenuItem, FormControlLabel } from '@mui/material';

import { RiHome2Fill } from '@remixicon/react';

export default function ListSec() {
    const { type } = useParams();

    const [showBy, setShowBy] = useState(5);
    const [showMostPopular, setShowMostPopular] = useState(false);

    function capitalize(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }

    function handleSelect(e) {
        setShowBy(e.target.value);
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
                    <Link sx={{ bgcolor: "#c1c1c1", padding: "4px 8px" }} underline="hover" color="text.primary" aria-current="page" href={`/list/${type}`}> {capitalize(type)} </Link>
                </Breadcrumbs>
            </div>
        </div>


        <div className="bottom">
            <div className="info">
                <h1>All {type === "category" ? "Categories" : type === "subcategory" ? "Sub Categories" : `${type}s`}</h1>
                <button className="add-btn"><Link href={`/${type}/create`}>Add new {type}</Link></button>
                
                <div className="filter">
                    <div className="left">
                        <div className="show-by">
                            <span>Show by</span>
                            <Select value={showBy} label='show-by' onChange={handleSelect}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="right">
                        {
                          (type !== "admin" || type !== "user") ? "" :  <FormControlLabel control={<Checkbox checked={showMostPopular} onChange={() => setShowMostPopular(!showMostPopular)} />} label={`Show Most Popular ${type === "category" ? "Categories" : type === "subcategory" ? "Sub Categories" : type`s`}`} />
                        }
                    </div>
                </div>

                <div className="table">
                    <div>
                    <Table1 type={type} showBy={showBy} showMostPopular={showMostPopular} />
                    </div>
                </div>

            </div>
        </div>
    </main>
    </>
  )
}
