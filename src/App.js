import Tabs from './components/Tabs/Tabs';

import Exercises from './pages/Exercises/Exercises';

function App() {
  const tabsConfigurations = {
    tabNames: ['Exercises', 'Exercises2'],
    tabsComponents: [Exercises],
  };
  return <Tabs tabsConfigurations={tabsConfigurations} />;
}

export default App;
