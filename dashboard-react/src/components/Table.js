import React from 'react';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Table1(props) {
    const rows = props.data;
    
  return (
    <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Product</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.trackingNumber}</TableCell>
                <TableCell className="tableCell">
                  <div className="cell-wrapper">
                    {row.items[0].name.slice(0, 20)}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.customer.email}</TableCell>
                <TableCell className="tableCell">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="tableCell">${row.items[0].price} x{row.items[0].quantity}</TableCell>
                <TableCell className="tableCell">Card</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  )
}
