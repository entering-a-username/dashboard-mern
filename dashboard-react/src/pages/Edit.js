import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { RiHome2Fill, RiUpload2Line, RiCloseLine } from '@remixicon/react';
import { Breadcrumbs, Checkbox, Link, Select, MenuItem, ListItemText, FormControlLabel } from '@mui/material';

export default function Edit() {
    const { type, id } = useParams();
    const navigate = useNavigate();

    function capitalize(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }
    
    const form = useRef(null);
    const [fetchedData, setFetchedData] = useState(null);

    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [fetchedSubcategories, setFetchedSubcategories] = useState([]);
    const [size, setSize] = useState([]);
    
    const [media, setMedia] = useState([]);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [inStock, setInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [brand, setBrand] = useState("");

    useEffect(() => {
        async function fetchData() {
            if (type === "category") {
                const res = await fetch(`http://localhost:3030/api/category/${id}`);
                const data = await res.json();

                setFetchedData(data);
                console.log(data)
                setName(fetchedData?.name);
                setMedia(fetchedData?.icons);
            } else if (type === "product") {
                const res = await fetch(`http://localhost:3030/api/product/${id}`);
                const data = await res.json();
                
                setFetchedData(data);
                setMedia(fetchedData?.icons);
                setName(fetchedData?.name);
                setInStock(fetchedData?.countInStock);
                setDescription(fetchedData?.description);
                setDiscount(fetchedData?.discount);
                setReviews(fetchedData?.numReviews);
                setPrice(fetchedData?.price);
                setRating(fetchedData?.rating);
                setSize(fetchedData?.sizes);

            } else if (type === "subcategory") {
                const res = await fetch(`http://localhost:3030/api/subcategory/${id}`);
                const data = await res.json();
                
                setFetchedData(data); 
                setName(fetchedData?.name);
                setMedia(fetchedData?.icons)
            }
        }
        fetchData();
    }, []);

    // subcategory logic
    function handleSelectSub(e) {
        setSubcategory(e.target.value);
    }

    function isChecked(cat) {
        return category.includes(cat);
    }

    function isChecked2(subcat) {
        return subcategory.includes(subcat);
    }
    
    useEffect(() => {
        async function fetchSubcat() {
            const res = await fetch(`http://localhost:3030/api/subcategory`);
            const data = await res.json();

            const subcats = [];

            for (let i = 0; i < data.data.length; i++) {
                subcats.push(data.data[i].name)
            }
            setFetchedSubcategories(subcats);
        }
        fetchSubcat();
    }, [])

    const mediaInputRef = useRef(null);

    function handleSelectCat(e) {
        setCategory(e.target.value);
    }

    function handleCheckbox(e) {
        const { name, checked } = e.target;
        setSize(prev => checked ? [...prev, name] : prev.filter(item => item !== name));
    }

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    function isCheckedSize() {
        if (size) {
            for (let i = 0; i < sizes.length; i++) {
                for (let j = 0; j < size.length; i++) {
                    if (sizes[i] === size[j]) {

                    }
                }
            }
        }
    }

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

        const res = await fetch(`http://localhost:3030/api/${type}/${id}`, {
            method: "PUT",
            body: fd,
        }) 

        const data = await res.json();
        if (data.success) {
            navigate(`/list/${type}`);
        }
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
                    <Link underline="hover" sx={{ bgcolor: "#c1c1c1", padding: "4px 8px" }}>Edit</Link>
                </Breadcrumbs>
            </div>
        </div>


        <div className="bottom">
            <div className="edit">
                <h1>Basic Information</h1>

                {
                    type === "product" && fetchedData && (
                        <form className="inputs" ref={form}>
                            <div>
                                <label htmlFor="name">PRODUCT NAME</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} placeholder={fetchedData.name} name='name' />
                            </div>

                            <div>
                                <label htmlFor="description">DESCRIPTION</label>
                                <textarea name="description" onChange={(e) => setDescription(e.target.value)} placeholder={fetchedData.description}></textarea>
                            </div>

                            <div className="small">
                                <label htmlFor="category">CATEGORY</label>
                                <Select renderValue={(selected) => selected.join(", ")} multiple value={category} label='show-by' onChange={handleSelectCat}>
                                    {
                                        fetchedSubcategories.map((cat, index) => (
                                            <MenuItem key={index} value={cat}>
                                                <Checkbox checked={isChecked(cat)} />
                                                <ListItemText primary={cat} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>

                            <div className="small">
                                <label htmlFor="category">SUBCATEGORY</label>
                                <Select renderValue={(selected) => selected.join(", ")} multiple value={subcategory} label='show-by' onChange={handleSelectSub}>
                                    {
                                        fetchedSubcategories.map((subcat, index) => (
                                            <MenuItem key={index} value={subcat}>
                                                <Checkbox checked={isChecked2(subcat)} />
                                                <ListItemText primary={subcat} />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>

                            <div className="small">
                                <label htmlFor="price">PRICE</label>
                                <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder={fetchedData.price} name='price' />
                            </div>

                            <div className="small">
                                <label htmlFor="stock">PRODUCT STOCK</label>
                                <input type="text" onChange={(e) => setInStock(e.target.value)} placeholder={fetchedData.countInStock} name='stock' />
                            </div>

                            <div className="small">
                                <label htmlFor="brand">BRAND</label>
                                <input type="text" onChange={(e) => setBrand(e.target.value)} placeholder={fetchedData.brand} name='brand' />
                            </div>

                            <div className="small">
                                <label htmlFor="discount">DISCOUNT</label>
                                <input type="text" onChange={(e) => setDiscount(e.target.value)} placeholder={fetchedData.discount} name='discount' />
                            </div>

                            <div className="checkbox">
                                <label htmlFor="">Sizes</label>
                                <div className="checks">
                                    {
                                        sizes.map((size, index) => (
                                            <FormControlLabel key={index} control={<Checkbox checked={isCheckedSize} onChange={handleCheckbox} name={size} />} label={size}></FormControlLabel>
                                        ))
                                    }
                                </div>
                            </div>
                        </form>
                    )
                }

                {
                    type === "category" && fetchedData && (
                        <form className="inputs" ref={form}>
                            <div>
                                <label htmlFor="name">CATEGORY NAME</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} placeholder={fetchedData.name} name='name' />
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
                                <input type="text" onChange={(e) => setColor(e.target.value)} placeholder={fetchedData.color} name='color' />
                            </div>
                        </form>
                    )
                }

                {
                    type === "subcategory" && fetchedData && (
                        <form ref={form} className="inputs">
                            <div>
                                <label htmlFor="name">SUBCATEGORY NAME</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} placeholder={fetchedData.name} name='name' />
                            </div>
                        </form>
                    )
                }

            </div>
        </div>

        <div className="media">
            <h1>Upload Image</h1>
            <div className="upload-div">
                {
                    media?.length != 0 && media?.map((icon, index) => (
                        <div key={index}><img src={icon} alt="" />
                            <RiCloseLine onClick={() => deleteImg(index)} size={12} /></div>
                    ))
                }
                <div className='upload-div-div'>
                    <RiUpload2Line size={35} color="grey" />
                    <span>Upload Image</span>
                    <input ref={mediaInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" type="file" name="file" id="files" />
                </div>
            </div>
            <button type="submit" onClick={submitData}>Save Changes</button>
        </div>
    </main>
    </>
  )
}
