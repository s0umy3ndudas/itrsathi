import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import TabLayout from './components/TabLayout';

import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import CsvEditor from './pages/Csv-editor';
import AssesseeCalendar from './pages/Calendar';
import UserCalendar from './pages/Calendar';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from './components/Register/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();
function App() { 
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">

         <QueryClientProvider client={queryClient}>   
        <BrowserRouter>
         
            <Routes>


               {/* Public */}
              <Route path="/login" element={<Login />} />



            {/* Protected */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TabLayout>
                      <Dashboard />
                    </TabLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notices"
                element={
                  <ProtectedRoute>
                    <TabLayout>
                      <Notices />
                    </TabLayout>
                  </ProtectedRoute>
                }
              />
<Route
  path="/calendar"
  element={ <ProtectedRoute>
                    <TabLayout><UserCalendar userId="68b4708b19f3e61b0f0ed5cd" />  </TabLayout>
                  </ProtectedRoute>}
/>    


 <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <TabLayout>
                      <UserCalendar userId="68b4708b19f3e61b0f0ed5cd" />
                    </TabLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <TabLayout>
                      <Settings />
                    </TabLayout>
                  </ProtectedRoute>
                }/>
              <Route
                path="/csv-editor"
                element={
                  <ProtectedRoute>
                    <TabLayout>
                      <CsvEditor />
                    </TabLayout>
                  </ProtectedRoute>}/>


            </Routes>
       
        </BrowserRouter>

            </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
