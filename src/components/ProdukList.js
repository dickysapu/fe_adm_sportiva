import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProdukList = () => {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() =>{
        getProducts();
    },[]);

    const getProducts =async() =>  {
        const products =await axios.get('http://localhost:8080/product');
        setProducts(products.data);
    } 
    
    const deleteProduk =async(id) =>{
        await axios.delete(`http://localhost:8080/product/${id}`);
        getProducts();
        toast.success('Produk berhasil dihapus!');
        }

  return (
    <div>
      <ToastContainer />
        <Link to="/tambahproduk" className='button is-primary mt-5 mb-5' >Tambah Produk</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th style={{ width: '20px', textAlign: 'center' }}>No.</th>
                    <th style={{ width: '150px', textAlign: 'center'}}>Nama</th>
                    <th style={{ width: '150px', textAlign: 'center'}}>Gambar</th>
                    <th style={{ width: '100px', textAlign: 'center'}}>Harga</th>
                    <th style={{ width: '450px', textAlign: 'center'}}>Keterangan</th>
                    <th style={{ textAlign: 'center'}}>Aksi</th>
                </tr>
            </thead>
            
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center' }}>{product.name}</td>
                  <td style={{ textAlign: 'center' }}>
                  <img src={`http://localhost:8080/uploads/${product.gambar}`} alt="Gambar Produk" style={{ width: '100px' }} />
                  </td>
                  <td style={{ textAlign: 'center' }}>{product.harga}</td>
                  <td>{product.keterangan}</td>
                  <td style={{ textAlign: 'center' }}>
                    {/* <Link to={`/editproduk/${product.id}`} className='button is-small is-info mr-5'>Edit</Link> */}
                    <Link onClick={() => deleteProduk(product.id)} className='button is-small is-danger'>Hapus</Link>
                  </td>
                </tr>
              ))}
            </tbody>


        </table>
    </div>
  )
}

export default ProdukList
