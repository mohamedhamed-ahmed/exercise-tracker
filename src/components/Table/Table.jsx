import React from 'react';
import { TableContainer, DataGridWrapper } from './Table.styles';

const Table = ({ rows, columns }) => {
  return (
    <TableContainer>
      <DataGridWrapper
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        disableColumnSelector
      />
    </TableContainer>
  );
};

export default Table;
