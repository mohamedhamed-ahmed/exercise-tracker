import Tabs from './components/Tabs/Tabs';

import Exercises from './pages/Exercises/Exercises';
import AddUser from './pages/User/AddUser';
import ExerciseDetails from './pages/Exercise/ExerciseDetails';

function App() {
  const tabsConfigurations = {
    tabNames: ['Exercises', 'Add User', 'Add/Update Exercise'],
    tabsComponents: [Exercises, AddUser, ExerciseDetails],
  };
  return <Tabs tabsConfigurations={tabsConfigurations} />;
}

export default App;
