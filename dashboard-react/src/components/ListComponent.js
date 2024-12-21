import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useStateContext } from '../ContextProvider';

import { Checkbox } from '@mui/material';

export default function ListComponent({ type, columns }) {
    const { palette } = useStateContext();

    const [fetchedData, setFetchedData] = useState([]);
    const [flashMessage, setFlashMessage] = useState("");
    const [deleted, setDeleted] = useState(false);
    
    useEffect(() => {
      async function fetchAPI() {
        let data;
        if (type === "product") {
          const res = await fetch("http://localhost:3050/api/products");
          data = await res.json();
          data = data.slice(1).map((item, index) => {
            item.price = `${Math.ceil(item.price)} $`;
            item.createdAt = new Date(item.createdAt).toLocaleDateString();
            
            return ({
              ...item,
              id: index + 1,
            })
          })
  
          setFetchedData(data);
        } else if (type === "user") {
          const res = await fetch("http://localhost:3050/api/users");
          data = await res.json();
  
          data = data.slice(1).map((user, index) => {
            user.createdAt = new Date(user.createdAt).toLocaleDateString();
            
            return ({
              ...user,
              id: index + 1,
            })
          })
  
          setFetchedData(data);
        } else if (type === "admin") {
          const res = await fetch("http://localhost:3050/api/admins");
          data = await res.json();
  
          data = data.slice(1).map((user, index) => {
            user.createdAt = new Date(user.createdAt).toLocaleDateString();
            
            return ({
              ...user,
              id: index + 1,
            })
          })
          
          setFetchedData(data);
        } else if (type === "transaction") {
          const res = await fetch(`http://localhost:3050/api/transactions`);
          data = await res.json();
          console.log(data.transactions)
  
          data = data.transactions.map((user, index) => {
            return ({
              ...user,
              id: index + 1,
            })
          })
          console.log(data)
          setFetchedData(data);
        }
      }
      fetchAPI();
    }, [])
  
      async function del(id) {
        const res = await fetch(`http://localhost:3050/api/${type}/${id}`);
        const data = await res.json();
        // flash message
        if (data.deleted) {
          setDeleted(true);
          setFlashMessage(`${type} deleted successfully`);
  
          setTimeout(() => {
            setFlashMessage("");
          }, 4000);
  
          setFetchedData(fetchedData.filter((item) => item.id !== id));
        } else {
          setDeleted(false);
          setFlashMessage(`Couldn't delete ${type}`);
          setTimeout(() => {
            setFlashMessage("");
          }, 4000);
        }
      }
    
      const actionColumn = [ 
        {
          field: "action",
          headerName: "Action",
          width: 130,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <div
                  className="deleteButton"
                  onClick={() => {
                    console.log(params)
                    del(params.id)
                  }}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];
  return (
    <>
    
    <div className="datatable">

      <div className="datatableTitle">
        Add new {type}
        <Link to={`/${type}s/new`} className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={fetchedData}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />


      <table>
        <thead>
            <tr>
                {
                    columns.map((column, index) => (
                        <th>{column}</th>
                    ))
                }
            </tr>
        </thead>

        <tbody>
            {
                fetchedData?.length !== 0 && fetchedData?.map((item, index) => (
                    <tr>

                        <td>
                            <div><Checkbox>{index + 1}</Checkbox></div>
                        </td>

                        <td>
                            <div className="img-wrapper">
                                <div><img src="https://picsum.photos/200/300" alt="" /></div>
                            </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item?.color}</td>


                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
    </>
  )
}
