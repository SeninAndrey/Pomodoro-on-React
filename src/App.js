
import './App.css';
import { MainPage } from '../src/MainPage/MainPage.tsx';
import { Routes, Route } from 'react-router-dom';
import { StatPage } from './StatPage/StatPage.tsx';

function AppComponent() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/stat" element={<StatPage />}/>
            </Routes>
        </div>
    );
}

export default AppComponent;
