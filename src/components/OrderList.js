import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const OrderList = () => {
    const [order, setOrder] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0);
    const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    useEffect(() =>{
        getOrder();
    },[]);
    useEffect(() => {
        calculateTotalHarga();
      }, [order]);

    const getOrder =async() =>  {
        const order =await axios.get('http://localhost:8080/order');
        setOrder(order.data);
    } 

    
    
    const deletePesan =async(id) =>{
        await axios.delete(`http://localhost:8080/order/${id}`);
        getOrder();
        }
    
        const calculateTotalHarga = () => {
            let total = 0;
            order.forEach((item) => {
              total += parseInt(item.totalHarga);
            });
            setTotalHarga(total);
          };

  return (
    <div>
        <div className="total-orders" style={{ textAlign:'center', fontSize:'24pt', fontWeight:'bold' }}>Total Orders: {order.length}</div>
        <div className="total-harga" style={{ textAlign:'center', fontSize:'24pt', fontWeight:'bold' }}>Total Pemasukan: {totalHarga}</div>

        {/* <div className="export-buttons" style={{ textAlign: 'center', margin: '20px 0' }}>
        <button className="button is-primary mr-3" onClick={handlePrint}>
          <span className="icon">
            <FaFilePdf />
          </span>
          <span>Export to PDF</span>
        </button>
        <ReactHTMLTableToExcel
          id="export-excel-button"
          className="button is-success"
          table="order-table"
          filename="order-data"
          sheet="Sheet 1"
          buttonText={
            <React.Fragment>
              <span className="icon">
                <FaFileExcel />
              </span>
              <span>Export to Excel</span>
            </React.Fragment>
          }
        />
      </div> */}

        <table className='table is-striped is-fullwidth mt-5'>
            <thead>
                <tr>
                    <th style={{ width: '20px', textAlign: 'center' }}>No.</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Nama</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Email</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>No Telepon</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Lapangan</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Tanggal</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Total Harga</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Tanggal Pesanan Dibuat</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Order Id</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Metode Pembayaran</th>
                    <th style={{ width: '50px', textAlign: 'center'}}>Status</th>
                    <th style={{ textAlign: 'center'}}>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {order.map((order, index) => (
                    <tr key={order.id}>
                    <td style={{ textAlign: 'center'}}>{index +1}</td>
                    <td style={{ textAlign: 'center'}}>{order.name}</td>
                    <td style={{ textAlign: 'center'}}>{order.email}</td>
                    <td style={{ textAlign: 'center'}}>{order.noTelp}</td>
                    <td style={{ textAlign: 'center'}}>{order.lapangan}</td>
                    <td style={{ textAlign: 'center'}}>{order.tanggal}</td>
                    <td style={{ textAlign: 'center'}}>{order.totalHarga}</td>
                    <td style={{ textAlign: 'center'}}>{order.tanggal_pesanan_dibuat}</td>
                    <td style={{ textAlign: 'center'}}>{order.orderId}</td>
                    <td style={{ textAlign: 'center'}}>{order.metodePembayaran}</td>
                    <td style={{ textAlign: 'center'}}>{order.status}</td>
                    <td style={{ textAlign: 'center'}}>
                        <Link onClick={()=>deletePesan(order.id)} className='button is-small is-danger'>Hapus</Link>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
        
    </div>
  )
}

export default OrderList
