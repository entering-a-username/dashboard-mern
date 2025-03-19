import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { RiHome2Fill, RiUpload2Line, RiCloseLine } from '@remixicon/react';
import { Breadcrumbs, Checkbox, Link, Select, MenuItem, FormControlLabel, ListItemText } from '@mui/material';


export default function Create() {
    const { type } = useParams();

    const navigate = useNavigate();
    
    const form = useRef(null);
    const mediaInputRef = useRef(null);

    function capitalize(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }

    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [countries, setCountries] = useState([]);
    const [size, setSize] = useState([]);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const URL = "https://countriesnow.space/api/v0.1/countries/";

        async function getCountry(url) {
            setCountries((await (await fetch(url)).json()).data);
        }

        if (type === "product") {
            getCountry(URL)
        }
    }, [type]);

    const [selectedCountry] = useState("");
    const [isOpenCountry, setIsOpenCountry] = useState(false);

    const [fetchedSubcategories, setFetchedSubcategories] = useState([]);
    const [fetchedCategories, setFetchedCategories] = useState([]);

    // subcategory & category logic
    function handleSelectSub(e) {
        setSubcategory(e.target.value);
    }

    function handleSelectCat(e) {
        setCategory(e.target.value);
    }

    function isChecked(subcat) {
        return subcategory.includes(subcat);
    }
    
    function isChecked2(cat) {
        return category.includes(cat);
    }

    useEffect(() => {
        async function fetchSubCat() {
            const res = await fetch(`http://localhost:3030/api/subcategory?showBy=100`);
            const res1 = await fetch(`http://localhost:3030/api/category?showBy=100`);
            const data1 = await res1.json();
            const data = await res.json();

            const subcats = [];
            const categories = [];
            
            for (let i = 0; i < data.data.length; i++) {
                subcats.push(data.data[i].name);
            }

            for (let i = 0; i < data1.data.length; i++) {
                categories.push(data1.data[i].name);
            }

            setFetchedSubcategories(subcats);
            setFetchedCategories(categories);
        }

        fetchSubCat();
    }, [])
    

    function handleCheckbox(e) {
        const { name, checked } = e.target;
        setSize(prev => checked ? [...prev, name] : prev.filter(item => item !== name));
    }

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setMedia(prev => [...previews, ...prev]);
    }

    function deleteImg(index) {
        setMedia(prev => prev.filter((_, i) => i !== index));
    }

    async function submitData(e) {
        e.preventDefault();

        const fd = new FormData();

        if (mediaInputRef.current.files.length > 0) {
            Array.from(mediaInputRef.current.files).forEach(file => {
                fd.append("files", file);
            })
        }

        if (type === "category") {
            fd.append("name", form.current.name.value);
            fd.append("subcategory", subcategory);
            fd.append("color", form.current.color.value);
        } else if (type === "product") {
            fd.append("name", form.current.name.value);
            fd.append("description", form.current.description.value);
            fd.append("brand", form.current.brand.value);
            fd.append("price", form.current.price.value);
            fd.append("discount", form.current.discount.value);
            fd.append("category", category);
            fd.append("subcategory", subcategory);
            fd.append("countInStock", form.current.stock.value);
            fd.append("sizes", size);
        } else if (type === "subcategory") {
            fd.append("name", form.current.name.value);
        }

        const res = await fetch(`http://localhost:3030/api/${type}/create`, {
            method: "POST",
            body: fd,
        }) 
        const data = await res.json();

        if (data.status === "success") {
            navigate(`/list/${type}`)
        }
    }

  return (
    <>
    <main className='list-page'>
        <div className="top">
            <h1>Create {capitalize(type)}</h1>

            <div className="breadcrumbs">
                <Breadcrumbs aria-label="breadcrumb" className='crumb'>
                    <Link href="/" sx={{ display: 'flex', alignItems: 'center', columnGap: "5px" }} underline="hover" to="/"><RiHome2Fill size={22} /> Dashboard </Link>
                    <Link underline="hover" sx={{ bgcolor: "#c1c1c1", padding: "4px 8px" }}>Create {capitalize(type)}</Link>
                </Breadcrumbs>
            </div>
        </div>


        <div className="bottom">
            <div className="edit">
                <h1>Basic Information</h1>

                { 
                    type === "product" && (
                        <form className="inputs" ref={form}>
                            <div>
                                <label htmlFor="name">PRODUCT NAME</label>
                                <input type="text" name='name' />
                            </div>

                            <div>
                                <label htmlFor="description">DESCRIPTION</label>
                                <textarea name="description"></textarea>
                            </div>

                            <div className="small">
                                <label htmlFor="subcategory">SUBCATEGORY</label>
                                <Select renderValue={(selected) => selected.join(", ")} multiple value={subcategory} label='show-by' onChange={handleSelectSub}>
                                    {
                                        fetchedSubcategories.map((subcat, index) => (
                                            <MenuItem key={index} value={subcat}>
                                                <Checkbox checked={isChecked(subcat)} />
                                                <ListItemText primary={subcat} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>

                            <div className="small">
                                <label htmlFor="category">CATEGORY</label>
                                <Select renderValue={(selected) => selected.join(", ")} multiple value={category} label='show-by' onChange={handleSelectCat}>
                                    {
                                        fetchedCategories.map((cat, index) => (
                                            <MenuItem key={index} value={cat}>
                                                <Checkbox checked={isChecked2(cat)} />
                                                <ListItemText primary={cat} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>

                            <div className="small">
                                <label htmlFor="price">PRICE</label>
                                <input type="text" name="price" />
                            </div>

                            <div className="small">
                                <label htmlFor="stock">PRODUCT STOCK</label>
                                <input type="text" name="stock" />
                            </div>

                            <div className="small">
                                <label htmlFor="brand">BRAND</label>
                                <input type="text" name="brand" />
                            </div>

                            <div className="small">
                                <label htmlFor="discount">DISCOUNT</label>
                                <input type="text" name="discount" />
                            </div>

                            <div className="checkbox">
                                <label htmlFor="">Sizes</label>
                                <div className="checks">
                                    {
                                        sizes.map((size, index) => (
                                            <FormControlLabel key={index} control={<Checkbox onChange={handleCheckbox} name={size} />} label={size}></FormControlLabel>
                                        ))
                                    }
                                </div>
                            </div>
                        </form>
                    )
                }

                {
                    type === "category" && (
                        <form ref={form} className="inputs">
                            <div>
                                <label htmlFor="name">CATEGORY NAME</label>
                                <input type="text" name='name' />
                            </div>

                            <div className="small">
                                <label htmlFor="category">SUBCATEGORY</label>
                                <Select renderValue={(selected) => selected.join(", ")} multiple value={subcategory} label='show-by' onChange={handleSelectSub}>
                                    {
                                        fetchedSubcategories.map((subcat, index) => (
                                            <MenuItem key={index} value={subcat}>
                                                <Checkbox checked={isChecked(subcat)} />
                                                <ListItemText primary={subcat} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>

                            <div>
                                <label htmlFor="color">COLOR</label>
                                <input type="text" name='color' />
                            </div>

                        </form>
                    )
                }

                {
                    type === "subcategory" && (
                        <form ref={form} className="inputs">
                            <div>
                                <label htmlFor="name">SUBCATEGORY NAME</label>
                                <input type="text" name='name' />
                            </div>
                        </form>
                    )
                }

                {
                    type === "banner" && (
                        <form ref={form} className="inputs"></form>
                    )
                }

            </div>
        </div>

        <div className="media">
            <h1>Upload Image</h1>
            <div className="upload-div">
                {
                    media.map((src, index) => (
                        <div key={index} className="image-preview">
                            <img src={src} alt="preview" />
                            <RiCloseLine onClick={() => deleteImg(index)} size={12} />
                        </div>
                    ))
                }
                <form encType='multipart/form-data' className='upload-div-div'>
                    <RiUpload2Line size={35} color="grey" />
                    <span>Upload Image</span>
                    <input ref={mediaInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" type="file" name="file" id="files" />
                </form>
            </div>
            <button type="submit" onClick={submitData}>Save Changes</button>
        </div>
    </main>
    </>
  )
}
