import {  GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from  '@mui/icons-material/Delete';
import EditIcon from  '@mui/icons-material/Edit';

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 2,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    flex: 2,
  },
  {
    field: 'user',
    headerName: 'User',
    flex: 1,
    valueGetter: (params) => params?.row?.user?.name,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    type: 'actions',
    flex: 2,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label='Delete'
        onClick={console.log(params.id)}
      />,
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={console.log(params.id)}
      />,
    ],
  },
];
