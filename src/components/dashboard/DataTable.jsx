import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 250 }}>Time</TableCell>
            <TableCell>Document</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.slice(0, 2).map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {/* Zamanı gösteren hücre */}
              <TableCell component="th" scope="row" sx={{ width: 250, whiteSpace: 'nowrap' }}>
                {row.id}
              </TableCell>

              <TableCell sx={{ whiteSpace: 'normal' }}>
                {Object.entries(row).map(([key, value], i) => (
                  <span key={i} style={{ marginRight: '16px' }}>
                    <strong className='bg-indigo-50/75 rounded p-1'>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
