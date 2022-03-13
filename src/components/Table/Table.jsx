import React from 'react';
import { TableContainer, DataGridWrapper } from './Table.styles';

const Table = ({
  rows,
  columns,
  rowsPerPage = 10,
  rowsPerPagOptions = [10],
}) => {
  return (
    <TableContainer>
      <DataGridWrapper
        rows={rows}
        columns={columns}
    
        disableSelectionOnClick
        disableColumnSelector
        disableColumnMenu
      />
    </TableContainer>
  );
};

export default Table;
