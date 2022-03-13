import React, { useState } from 'react';
import { Box, Tabs as MUITabs, Tab } from '@mui/material';

import TabPanel from './TabPanel/TabPanel';

const Tabs = ({ tabsConfigurations, match }) => {
  
  const { tabNames, tabsComponents } = tabsConfigurations;

  const [value, setValue] = useState(0);

  console.log(match)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MUITabs value={value} onChange={handleChange}>
          {tabNames.map((name, index) => (
            <Tab label={name} key={index} id={index} />
          ))}
        </MUITabs>
      </Box>
      {tabsComponents.map((Component, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Component />
        </TabPanel>
      ))}
    </div>
  );
};

export default Tabs;
