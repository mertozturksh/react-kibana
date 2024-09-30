import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ data }) => {
  
  return (
    <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 250 }}>Time</TableCell>
            <TableCell>Document</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ width: 250, whiteSpace: 'nowrap' }}>
                {row.timestamp}
              </TableCell>

              <TableCell sx={{ whiteSpace: 'normal' }}>
                {Object.entries(row).map(([key, value], i) => (
                  <span key={i} style={{ marginRight: '8px', display: 'inline-block' }}>
                    <span className='bg-indigo-100/75' style={{ borderRadius: '4px', padding: '2px 4px', margin: '3px', display: 'inline-block', }}>{key}:</span>
                    <span style={{ marginLeft: '4px', wordWrap: 'break-word' }}>{value}</span>
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
