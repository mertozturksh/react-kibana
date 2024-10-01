import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const columns = [
  { id: 'timespan', label: 'Timespan', minWidth: '230' },
  { id: 'document', label: 'Document', minWidth: '250' },
];

const DataTable = ({ data }) => {

  return (
    <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '80vh', overflow: 'auto', zIndex: '0' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ width: 230, whiteSpace: 'nowrap' }}>
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
