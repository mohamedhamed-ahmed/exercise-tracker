import React, { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { getExercises } from '../../services';

import {  GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from  '@mui/icons-material/Delete';
import EditIcon from  '@mui/icons-material/Edit';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    //width: 200
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Description',
    //width: 300
    flex: 2,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    // width: 200
    flex: 2,
  },
  {
    field: 'user',
    headerName: 'User',
    // width: 200
    flex: 1,
    valueGetter: (params) => params?.row?.user?.name,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    type: 'actions',
    // width:300
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

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises()
      .then((data) => {
        console.log('data ' + data);
        setExercises(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Table rows={exercises} columns={columns} />
    </div>
  );
};

export default Exercises;
