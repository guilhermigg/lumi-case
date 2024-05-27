import {Routes, Route} from 'react-router-dom';
import BillsLibrary from './pages/BillsLibrary';
import Dashboard from './pages/Dashboard';
import App from './App';

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<BillsLibrary />} />
        </Routes>
    )
}
