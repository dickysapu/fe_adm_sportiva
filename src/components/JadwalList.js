import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const JadwalList = () => {
    const [jadwals, setJadwal] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() =>{
        getJadwal();
    },[]);

    const getJadwal =async() =>  {
        const jadwals =await axios.get('http://localhost:8080/jadwal');
        setJadwal(jadwals.data);
    } 
    
    const deleteJadwal =async(id) =>{
        await axios.delete(`http://localhost:8080/jadwal/${id}`);
        getJadwal();
        setAlert('Jadwal berhasil dihapus!');
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        }

  return (
    <div>
          {alert && (
        <div className="notification is-success">
          <button className="delete" onClick={() => setAlert('')}></button>
          {alert}
        </div>
      )}
        <Link to="/tambahjadwal" className='button is-primary mt-5 mb-5' >Tambah Jadwal</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th style={{ width: '20px', textAlign: 'center' }}>No.</th>
                    <th style={{ textAlign: 'center'}}>Jam</th>
                    <th style={{ textAlign: 'center'}}>Status</th>
                    <th style={{ textAlign: 'center'}}>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {jadwals.map((jadwal, index) => (
                    <tr key={jadwal.id}>
                    <td style={{ textAlign: 'center'}}>{index +1}</td>
                    <td style={{ textAlign: 'center'}}>{jadwal.jam}</td>
                    <td style={{ textAlign: 'center'}}>{jadwal.status}</td>
                    <td style={{ textAlign: 'center'}}>
                        <Link to={`/editjadwal/${jadwal.id}`} className='button is-small is-info mr-5'>Edit</Link>
                        <Link onClick={()=>deleteJadwal(jadwal.id)} className='button is-small is-danger'>Hapus</Link>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default JadwalList
