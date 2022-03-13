import Tabs from './components/Tabs/Tabs';
import Exercises from './pages/Exercises/Exercises';
import AddUser from './pages/User/AddUser';
import ExerciseDetails from '../src/pages/Exercise/ExerciseDetails';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const tabsConfigurations = {
    tabNames: ['Exercises', 'Add User', 'Add/Update Exercise'],
    tabsComponents: [Exercises, AddUser, ExerciseDetails],
  };
  return (
    <>
      {/* <Tabs tabsConfigurations={tabsConfigurations} /> */}
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Exercises/>} />
        <Route path='/add-user' element={<AddUser/>} />
        <Route path='/exercise-details' element={<ExerciseDetails/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
