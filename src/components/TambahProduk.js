import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const TambahProduk = () => {
  const [name, setName] = useState('');
  const [gambar, setGambar] = useState(null);
  const [harga, setHarga] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const history = useHistory();
  const [alert, setAlert] = useState('');

  const handleBack = () => {
    history.push('/');
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
  };

  const simpanProduk = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('gambar', gambar);
      formData.append('harga', harga);
      formData.append('keterangan', keterangan);
  
      await axios.post('http://localhost:8080/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Produk berhasil disimpan!');
      setName('');
      setGambar(null);
      setHarga('');
      setKeterangan('');
  
      setTimeout(() => {
        setAlert('');
        history.push('/');
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlert('Gagal menyimpan produk');
    }
  };

  return (
    <div>
      <ToastContainer />
      {alert && (
        <div className="notification is-success">
          <button className="delete" onClick={() => setAlert('')}></button>
          {alert}
        </div>
      )}
      <form onSubmit={simpanProduk} className="mt-5">
        <div className="field">
          <label className="label">Nama Lapangan</label>
          <input
            type="text"
            className="input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nama lapangan"
          />
        </div>
        <div className="field">
          <label className="label">Gambar</label>
          <input type="file" required onChange={handleGambarChange} />
        </div>
        <div className="field">
          <label className="label">Harga</label>
          <input
            type="text"
            required
            className="input"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="harga"
          />
        </div>
        <div className="field">
          <label className="label">Keterangan</label>
          <input
            type="text"
            required
            className="input"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="keterangan"
          />
        </div>
        <div className="field">
          <button className="button is-primary mr-5">Simpan</button>
          <button className="button is-danger" onClick={handleBack}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahProduk;
