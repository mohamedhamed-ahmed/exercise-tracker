import React from 'react';

import { DataGrid } from '@mui/x-data-grid';



const Table = ({ rows , columns, showCheckboxSelection ,  editRowsModel}) => {
  return (<DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      editRowsMode={!!editRowsModel}
      checkboxSelection={!!showCheckboxSelection}
      disableSelectionOnClick
  />);
};

export default Table;
