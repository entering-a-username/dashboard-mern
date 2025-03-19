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
    banner: {
      header: ["ID", "Banner"],
      fields: ["", "icons"],
    },
    order: {
      header: ["Tracking Number", "Items", "Price", "Customer", "Shipping Address", "Shipping Method", "Delivery Method", "Date Ordered", "Date Delivered", "Status"],
      fields: ["trackingNumber", "items", "amount", "customer", "address", "shippingMethod", "deliveryMethod", "createdAt", "expectedArrival", "status"],
    },
    products: ["ID", "Name", "Price", "Stock"],
    transactions: ["ID", "Amount", "Date", "Status"],

};