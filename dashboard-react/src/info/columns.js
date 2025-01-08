export const columnsInfo = {
    category: {
        header: ["ID", "Category", "Image", "Sub Categories", "Color", "Items Amount", "Date Created"],
        fields: ["", "name", "icons", "subcategories", "color", "itemsAmount", "dateCreated"],
    },
    subcategory: {
      header: ["ID", "Sub Category", "Image", "Items Amount", "Date Created"],
      fields: ["", "name", "icons", "itemsAmount", "dateCreated"],
    },
    product: {
      header: ["ID", "Product", "Images", "Description", "Brand", "Price", "Discount", "Category", "Sub Categories", "In Stock", "Sizes", "Rating", "Reviews", "Date Created", "Date Updated"],
      fields: ["", "name", "icons", "description", "brand", "price", "discount", "categories", "subcategories", "countInStock", "sizes", "rating", "numReviews", "createdAt", "updatedAt"],
    },
    user: {
      header: ["ID", "First Name", "Email", "Phone", "City", "State", "Country", "Occupation", "Role"],
      fields: ["", "name", "email", "phoneNumber", "city", "state", "country", "occupation", "role"],
    },
    admin: {
      header: ["ID", "First Name", "Email", "Phone", "City", "State", "Country", "Occupation", "Role"],
      fields: ["", "name", "email", "phoneNumber", "city", "state", "country", "occupation", "role"],
    },
    products: ["ID", "Name", "Price", "Stock"],
    transactions: ["ID", "Amount", "Date", "Status"],
};


// export const columnsConfig = {
//   category: categoryColumns,
//   products: productColumns,
//   users: userColumns,
//   transactions: transactionColumns,
// };
export const categoryColumns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Category", width: 430 },
    { field: "icons", headerName: "Image", width: 400 },
    { field: "subcategories", headerName: "Sub Categories", width: 200 },
    { field: "color", headerName: "Color", width: 150 },
    { field: "dateCreated", headerName: "Date Created", width: 300 },
];


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