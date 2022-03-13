import React, { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { getExercises } from '../../services';
import {columns} from './columns.config';

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
