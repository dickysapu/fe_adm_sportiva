import React, {useState, useEffect} from 'react'
import { useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const EditJadwal = () => {
    const [jam, setJam] = useState('');
    const [status, setStatus] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const [alert, setAlert] = useState('');
    
    const updateJadwal =async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:8080/jadwal/${id}`, {
            jam: jam,
            status: status
        });
        setAlert('Jadwal berhasil diupdate!');
        setJam('');
        setStatus('');
        setTimeout(() => {
            setAlert('');
            history.push('/jadwal');
        }, 3000);
    }   

    useEffect(()=>{
        getJadwalById();
    },[]);
    
    const getJadwalById = async () => {
        const response = await axios.get(`http://localhost:8080/jadwal/${id}`);
        setJam(response.data.jam);
        setStatus(response.data.status);
      }
      

  return (
    <div>
         {alert && (
        <div className="notification is-success">
          <button className="delete" onClick={() => setAlert('')}></button>
          {alert}
        </div>
      )}
      <form onSubmit={updateJadwal} className='mt-5'>
        <div className='field'>
            <label className='label'>Jam</label>
            <input 
                type='text' 
                className='input' 
                value={jam} 
                onChange={(e) => setJam(e.target.value)}
                placeholder='jam'></input>
        </div>
        <div className='field'>
            <label className='label'>Status</label>
            <input 
                type='text' 
                className='input' 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                placeholder='status'></input>
        </div>
        <div className='field'>
            <button className='button is-primary'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditJadwal
