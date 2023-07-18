import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahJadwal = () => {
    const [jam, setJam] = useState('');
    const [status, setStatus] = useState('');
    const history = useHistory();
    const [alert, setAlert] = useState('');
    
    const handleBack = () => {
        history.push('/jadwal');
      };
    
    const simpanJadwal =async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/jadwal', {
            jam: jam,
            status: status
        });
        setAlert('Jadwal berhasil disimpan!');
    setJam('');
    setStatus('');
    setTimeout(() => {
      setAlert('');
      history.push('/jadwal');
    }, 3000);
  };
        
  return (
    <div>
      {alert && (
        <div className="notification is-success">
          <button className="delete" onClick={() => setAlert('')}></button>
          {alert}
        </div>
      )}
      <form onSubmit={simpanJadwal} className='mt-5'>
        <div className='field'>
            <label className='label'>Jam</label>
            <input 
                type='text' 
                required
                className='input' 
                value={jam} 
                onChange={(e) => setJam(e.target.value)}
                placeholder='jam'></input>
        </div>
        <div className='field'>
            <label className='label'>Status</label>
            <input 
                type='text' 
                required
                className='input' 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                placeholder='status'></input>
        </div>
        <div className='field'>
            <button className='button is-primary mr-5'>Simpan</button>
            <button className='button is-danger' onClick={handleBack}>Kembali</button>
        </div>
      </form>
    </div>
  )
}

export default TambahJadwal
