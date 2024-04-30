import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemListy from '../components/ItemListy';
import { useDispatch, useSelector } from "react-redux";
const Homepage = () => {
    const [itemsData, setItemsData] = useState([]);
    const dispatch = useDispatch();
    const [selectedCategory,setSelectedCategory] = useState('drinks');
    const categories = [
        {
            name:'drinks',
            imageUrl: "https://cdn-icons-png.freepik.com/256/1771/1771623.png?ga=GA1.1.722518202.1690025135&"
        },
        {
            name:'rice',
            imageUrl: "https://cdn-icons-png.freepik.com/256/1531/1531385.png?ga=GA1.1.722518202.1690025135&"
        },
        {
            name:'noodles',
            imageUrl: "https://cdn-icons-png.freepik.com/256/14935/14935970.png?ga=GA1.1.722518202.1690025135&"
        },
    ]
    

    const loading = useSelector(state => state.rootReducer.loading);

    useEffect(() => {
        const getAllItems = async () => {
            try {
                dispatch({ type: 'SHOW_LOADING' });
                const { data } = await axios.get('http://localhost:8080/api/items/get-item');
                setItemsData(data);
            } catch (error) {
                console.log(error);
            } finally {
                dispatch({ type: 'HIDE_LOADING' });
            }
        };
        getAllItems();
    }, [dispatch]);
    return (
        <DefaultLayout>
        <div className='d-flex'>
            {
                categories.map(category =>(
                    <div key={category.name} className={`d-flex category ${selectedCategory === category.name && 'category-active'}`}
                    onClick={() => setSelectedCategory(category.name)}>
                    <h4>{category.name}</h4>
                    <img src={category.imageUrl} alt={category.name} height="30" width="50"/>

                    </div>
                ))
            }
        </div>

            <Row>
                {itemsData.filter(i=>i.category === selectedCategory).map((item) => (
                    <Col xs={24} lg={6} md={12} sm={24} >
                        <ItemListy key={item.id} item= {item}/>
                    </Col>
                ))}
            </Row>
        </DefaultLayout>
    );
};

export default Homepage;
