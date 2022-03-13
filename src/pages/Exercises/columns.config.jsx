import { GridActionsCellItem } from '@mui/x-data-grid';
import { DeleteIconWrapper, EditIconWrapper } from './columns.config.styles';

const columns = [
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
    field: 'date',
    headerName: 'Date',
    flex: 2,
    valueGetter: (params) => params?.row?.date?.split('T')[0],
  },
  {
    field: 'user',
    headerName: 'User',
    flex: 1,
    valueGetter: (params) => params?.row?.user?.name,
  },
];

export const buildColumnsConfig = (deleteHandler, editHandler) => {
  const deleteAction = (row) => (
      <GridActionsCellItem
        icon={<DeleteIconWrapper />}
        label='Delete'
        onClick={() => deleteHandler(row?.id, row?.user?.id)}
      />
    );
  const editAction = (row) =>(
      <GridActionsCellItem
        icon={<EditIconWrapper />}
        label='Edit'
        onClick={() => editHandler(row)}
      />
    );

  const actions = {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    type: 'actions',
    flex: 2,
    getActions: ({ row }) => [deleteAction(row), editAction(row)],
  };
  return [...columns, actions];
};
