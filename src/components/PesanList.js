import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PesanList = () => {
    const [pesan, setPesan] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() =>{
        getPesan();
    },[]);

    const getPesan =async() =>  {
        const pesan =await axios.get('http://localhost:8080/pesan');
        setPesan(pesan.data);
    } 
    
    const deletePesan =async(id) =>{
        await axios.delete(`http://localhost:8080/pesan/${id}`);
        getPesan();
        toast.success('Pesan berhasil dihapus!');
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        }

  return (
    <div>
      <ToastContainer />
      <div className="total-pesan" style={{ textAlign:'center', fontSize:'24pt', fontWeight:'bold' }}>Total Pesan: {pesan.length}</div>
        <table className='table is-striped is-fullwidth mt-5'>
            <thead>
                <tr>
                    <th style={{ width: '20px', textAlign: 'center' }}>No.</th>
                    <th style={{ width: '150px', textAlign: 'center'}}>Nama</th>
                    <th style={{ width: '100px', textAlign: 'center'}}>Email</th>
                    <th style={{ width: '100px', textAlign: 'center'}}>No Telepon</th>
                    <th style={{ width: '500px', textAlign: 'center'}}>Isi Pesan</th>
                    <th style={{ textAlign: 'center'}}>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {pesan.map((pesan, index) => (
                    <tr key={pesan.id}>
                    <td style={{ textAlign: 'center'}}>{index +1}</td>
                    <td style={{ textAlign: 'center'}}>{pesan.name}</td>
                    <td style={{ textAlign: 'center'}}>{pesan.email}</td>
                    <td style={{ textAlign: 'center'}}>{pesan.noTelp}</td>
                    <td style={{ textAlign: 'center'}}>{pesan.isiPesan}</td>
                    <td style={{ textAlign: 'center'}}>
                        <Link onClick={()=>deletePesan(pesan.id)} className='button is-small is-danger'>Hapus</Link>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default PesanList
