import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TabLayout from './components/TabLayout';

import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

function App() { 
  return (
    <BrowserRouter>
      <TabLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </TabLayout>
    </BrowserRouter>
  );
}

export default App;
