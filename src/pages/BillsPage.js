import React, { useState, useEffect,useRef  } from 'react';
import DefaultLayout from '../components/DefaultLayout'
import { useReactToPrint } from 'react-to-print';


import { useDispatch } from "react-redux";
import axios from 'axios';
import {EyeOutlined}  from "@ant-design/icons";
import { Table,Modal,Button} from 'antd'



const BillsPage = () => {
    const componentRef = useRef();
    const [billsData, setBillsData] = useState([]);
    const dispatch = useDispatch();

    const [popModel,setPopupModel] = useState(false);
    const [selectedBill, setSelectedBill]= useState(null);
    const getAllBills = async () => {
      try {
          dispatch({ type: 'SHOW_LOADING' });
          const { data } = await axios.get('http://localhost:8080/api/bills/get-bills');
          setBillsData(data);
      } catch (error) {
          console.log(error);
      } finally {
          dispatch({ type: 'HIDE_LOADING' });
      }
  };
  
    useEffect(() => {
      getAllBills();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
 
  const columns = [
    {title :'ID', dataIndex :'_id'},
    {title : 'Customer Name' , dataIndex : 'customerName' , },
    {title:'Contact No',dataIndex:'customerNumber'},
    {title:'SubTotal',dataIndex:'subTotal'},
    {title:'Tax',dataIndex:'tax'},
    {title:'Total Amount',dataIndex:'totalAmount'},
   
  { title: 'Actions', dataIndex: "_id", render: (id, record) =>(
  <div>
  <EyeOutlined style={{cursor:'pointer'}}
    onClick={() =>{
        setSelectedBill(record);
        setPopupModel(true);
    }}
  />
  
 
 
   </div> )}
  ];

  
  return (
    <DefaultLayout>
    <div className='d-flex justify-content-between align-items-center'>
    <h1>Invoice list</h1>
    
  </div>
  <Table columns={columns} dataSource={billsData} bordered />
  {
    popModel && (
      <Modal title="Invoice Details"
       open={popModel}  
       onCancel={() => {

      setPopupModel(false);
      }} 
      footer={false}>

<div id="invoice-POS" ref={componentRef}>

<center id="top">

  <div class="logo"><img src="https://img.freepik.com/free-vector/old-wizard-with-black-magic-pot-magic-wand-cartoon-style-white-background_1308-44156.jpg?t=st=1712703373~exp=1712706973~hmac=6f943642ada577a196580cc2ee7cba89686903abdee2945b7d4cf8028f79783e&w=740" alt="Logo" class="logo" /></div>

  <div class="info">

    <h2>Hogwarts Cafe and Restaurant</h2>

    <p>Contact: 9172348957 | Pune Maharashtra</p>
    <hr/>

  </div>

</center>

<div id="mid">
    <div class="nt-2">
      <p>
      <br/>
        Customer Name: <b>{selectedBill.customerName}</b><br />
        Phone No: <b>{selectedBill.customerNumber}</b><br />
        Date: <b>{selectedBill.date.toString().substring(0, 10)}</b><br />
      </p>

    <hr style={{ margin: '5px' }} />


  </div>

</div>

<div id="bot">

  <div id="table">

    <table>

      <tbody>

        <tr class="tabletitle">

          <td class="item">

            <h2>Item</h2>

          </td>

          <td class="Hours">

            <h2>Qty</h2>

          </td>

          <td class="Rate">

            <h2>Price</h2>

          </td>

          <td class="Rate">

            <h2>Total</h2>

          </td>

        </tr>

        {selectedBill.cartItems.map((item) => (

        <tr class="service">

          <td class="tableitem">

            <p class="itentext">{item.name}</p>

          </td>

          <td class="tableitem">

            <p class="itentext">{item.quantity}</p>

          </td>

          <td class="tableitem">

            <p class="itentext">{item.price}</p>

          </td>

          <td class="tableitem">

            <p class="itentext">{item.quantity * item.price}</p>

          </td>

        </tr>

        ))}

        <tr class="tabletitle">

          <td />

          <td />

          <td class="Rate">

            <h2>Tax</h2>

          </td>

          <td class="payment">

            <h2>${selectedBill.tax}</h2>

          </td>

        </tr>

        <tr class="tabletitle">

          <td />

          <td />

          <td class="Rate">

            <h2>Grand Total</h2>

          </td>

          <td class="payment">

            <h2><b>${selectedBill.totalAmount}</b></h2>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

  <div id="legalcopy">

    <p class="legal">

      <strong>Thank you for your order!</strong> 10% GST on total amount. Please note that this is non-refundable. For any assistance, please write an email to <b>help@Hogwartscafe.com</b>

    </p>

  </div>

</div>

</div>
<div class="d-flex justify-content-end mt-3">
    <Button type="primary" onClick={handlePrint}>
        Print
    </Button>
</div>

    
      </Modal>
    )
  }
    </DefaultLayout>
  )


}
export default BillsPage