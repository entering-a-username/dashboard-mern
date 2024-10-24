export const productColumns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="capitalize">
            {params.row.category}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "description",
      width: 430,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.rating > 3 ? "active" : "passive"}`}>
            {params.row.rating}
          </div>
        );
      },
    },
    {
      field: "supply",
      headerName: "Supply",
      width: 160,
    },
    {
      field: "createdAt",
      headerName: "Date Added",
      width: 160,
    }
];
  
export const userColumns = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "name",
    headerName: "Name",
    width: 130,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 130,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "country",
    headerName: "Country",
    width: 90,
  },
  {
    field: "city",
    headerName: "City",
    width: 160,
  },
  {
    field: "transactions",
    headerName: "Transactions",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          {params.row.transactions.length}
        </div>
      );
    }
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.role === "user" ? "passive" : "active"}`}>
          {params.row.role}
        </div>
      );
    },
  },
  
  // stats??
  {
    field: "createdAt",
    headerName: "Date Joined",
    width: 160,
  }
];

export const transactionColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {field: "userId", headerName: "User Id", width: 230,},
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "products",
    headerName: "# of Products",
    width: 180,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 150,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`
  },
]

// export const userRows = [
//     {
//       id: 1,
//       username: "Snow",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       status: "active",
//       email: "1snow@gmail.com",
//       age: 35,
//     },
//     {
//       id: 2,
//       username: "Jamie Lannister",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "2snow@gmail.com",
//       status: "passive",
//       age: 42,
//     },
//     {
//       id: 3,
//       username: "Lannister",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "3snow@gmail.com",
//       status: "pending",
//       age: 45,
//     },
//     {
//       id: 4,
//       username: "Stark",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "4snow@gmail.com",
//       status: "active",
//       age: 16,
//     },
//     {
//       id: 5,
//       username: "Targaryen",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "5snow@gmail.com",
//       status: "passive",
//       age: 22,
//     },
//     {
//       id: 6,
//       username: "Melisandre",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "6snow@gmail.com",
//       status: "active",
//       age: 15,
//     },
//     {
//       id: 7,
//       username: "Clifford",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "7snow@gmail.com",
//       status: "passive",
//       age: 44,
//     },
//     {
//       id: 8,
//       username: "Frances",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "8snow@gmail.com",
//       status: "active",
//       age: 36,
//     },
//     {
//       id: 9,
//       username: "Roxie",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "snow@gmail.com",
//       status: "pending",
//       age: 65,
//     },
//     {
//       id: 10,
//       username: "Roxie",
//       img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: "snow@gmail.com",
//       status: "active",
//       age: 65,
//     },
// ];