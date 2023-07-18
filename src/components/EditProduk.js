import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduk = () => {
  const [name, setName] = useState('');
  const [gambar, setGambar] = useState(null);
  const [harga, setHarga] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const history = useHistory();
  const { id } = useParams();
  const [alert, setAlert] = useState('');

  const handleBack = () => {
    history.push('/');
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
  };

  const updateProduk = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('gambar', gambar);
      formData.append('harga', harga);
      formData.append('keterangan', keterangan);
  
      await axios.patch(`http://localhost:8080/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setAlert('Produk berhasil diupdate!');
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

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/product/${id}`);
      setName(data.name);
      setHarga(data.harga);
      setKeterangan(data.keterangan);
    } catch (error) {
      console.log(error);
      setAlert('Gagal memuat produk');
    }
  };

  return (
    <div>
      {alert && (
        <div className="notification is-success">
          <button className="delete" onClick={() => setAlert('')}></button>
          {alert}
        </div>
      )}
      <form onSubmit={updateProduk} className="mt-5">
        <div className="field">
          <label className="label">Nama Lapangan</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nama lapangan"
          />
        </div>
        <div className="field">
          <label className="label">Gambar</label>
          <input type="file" required onChange={handleGambarChange} name="foto" />
        </div>
        {/* <div>
          {gambar && (
            <div>
              <img src={URL.createObjectURL(gambar)} alt="Preview Gambar" />
            </div>
          )}
        </div> */}
        <div className="field">
          <label className="label">Harga</label>
          <input
            type="text"
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
            className="input"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="keterangan"
          />
        </div>
        <div className="field">
          <button className="button is-primary mr-5">Update</button>
          <button className="button is-danger" onClick={handleBack}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduk;
