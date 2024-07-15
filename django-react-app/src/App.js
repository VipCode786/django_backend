import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../src/components/Header';
import CarouselSlider from '../src/components/CarouselSlider';
import ItemList from '../src/components/ItemList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateItem from './components/CreateItem';
import UpdateItem from './components/UpdateItem';
import './index.css'
const App = () => {
    return (
        <div>
            <Header />
            <CarouselSlider />
            {/* <ItemList /> */}
            <Router>
            <Routes>
                <Route path="/" element={<ItemList />} />
                <Route path="/create"  exact element={<CreateItem />} />
                <Route path="/update/:id" element={<UpdateItem />} />
            </Routes>
            </Router>
        </div>
    );
};

export default App;
