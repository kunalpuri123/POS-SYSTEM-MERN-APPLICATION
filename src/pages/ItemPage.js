import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {DeleteOutlined,EditOutlined}  from "@ant-design/icons";
import { Table } from 'antd'
import { Button,Modal,Form, Input, Select, message} from 'antd';


const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.rootReducer.loading);
  const [popModel,setPopupModel] = useState(false);
  const [editItem,setEditItem] = useState(null);
  const getAllItems = async () => {
    try {
        dispatch({ type: 'SHOW_LOADING' });
        const { data } = await axios.get('https://pos-system-mern-application.onrender.com/api/items/get-item');
        setItemsData(data);
    } catch (error) {
        console.log(error);
    } finally {
        dispatch({ type: 'HIDE_LOADING' });
    }
};

  useEffect(() => {
    getAllItems();
}, []);

const handleDelete = async (record) => {
  try {
    dispatch({ type: 'SHOW_LOADING' });
    await axios.post("http:/https://pos-system-mern-application.onrender.com/api/items/delete-item", {itemId:record._id});
    message.success('Item Deleted Successfully.');
    getAllItems();
    setPopupModel(false);
    dispatch({ type: 'HIDE_LOADING' });
  } catch (error) {
    dispatch({ type: 'HIDE_LOADING' });
    message.error('Something went wrong.');
    console.log(error);
  } finally {
    dispatch({ type: 'HIDE_LOADING' });
  }
};
const columns = [
  {title :'Name', dataIndex :'name'},
  {title : 'Image' , dataIndex : 'image' , render : (image,record) => <img src={image} alt={record.name} height = "60" width=" 60" />},
  {title:'Price',dataIndex:'price'},
 
{ title: 'Actions', dataIndex: "_id", render: (id, record) =>(
<div>
<EditOutlined style={{cursor:"pointer"}} onClick={() =>{
  setEditItem(record);
  setPopupModel(true);
}}/>
<DeleteOutlined style={{cursor:"pointer"}}
onClick={() =>{
  handleDelete(record);

}} /> 
 </div> )}
];
const handleSubmit = async (value) =>{
  if(editItem  === null){
    try {
      dispatch({ type: 'SHOW_LOADING' });
      const res = await axios.post('http://localhost:8080/api/items/add-item', value);
      message.success('Item Added Succesfully.')
      getAllItems();
      setPopupModel(false);
  } catch (error) {
    message.error('Something went wrong.')
      console.log(error);
  } finally {
      dispatch({ type: 'HIDE_LOADING' });
  }
}
  else{
    try {
      dispatch({ type: 'SHOW_LOADING' });
       await axios.put('http://localhost:8080/api/items/edit-item', {...value, itemId:editItem._id});
      message.success('Item updated Succesfully.')
      getAllItems();
      setPopupModel(false);
  } catch (error) {
    message.error('Something went wrong.')
      console.log(error);
  } finally {
      dispatch({ type: 'HIDE_LOADING' });
  }
  }

  }


  return (
    <DefaultLayout>
  <div className='d-flex justify-content-between align-items-center'>
    <h1>Item List</h1>
    <Button type='primary' shape="round" className="custom-button" onClick={() =>setPopupModel(true)}>Add Item</Button>
  </div>
  <Table columns={columns} dataSource={itemsData} bordered />
  {
    popModel && (
      <Modal title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
       open={popModel}  
       onCancel={() => {
      setEditItem(null);
      setPopupModel(false);
      }} 
      footer={false}>
    <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
    <Form.Item name='name' label="Name">
      <Input/>
    </Form.Item>
    <Form.Item name='price' label="Price">
      <Input/>
    </Form.Item>
    <Form.Item name='image' label="Image URL">
      <Input/>
    </Form.Item>
    <Form.Item name='category' label='Category'>
    <Select>
      <Select.Option value="drinks">Drinks</Select.Option>
      <Select.Option value="rice">Rice</Select.Option>
      <Select.Option value="noodles">Noodles</Select.Option>
    </Select>

    </Form.Item>

    <div className='d-flex justify-content-end'>
      <Button type='primary' htmlType='submit' shape="round" className="custom-button">SAVE</Button>
    </div>
    </Form>
      </Modal>
    )
  }
</DefaultLayout>

  )
}

export default ItemPage

