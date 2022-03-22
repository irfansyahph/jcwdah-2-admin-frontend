import axios from 'axios';
import React from 'react';
import { Badge, Button } from 'reactstrap';
import { API_URL } from '../../helper';


class TransactionAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        this.getTransactions()
    }

    getTransactions = () => {
        axios.get(`${API_URL}/transactions/get-transactions`)
            .then((res) => {
                this.setState({ transactions: res.data })
                // console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    btTerimaPesanan = (cart_id) => {
        axios.patch(`${API_URL}/transactions/konfirmasi-pesanan`, {
            cart_id: cart_id
        }).then((res) => {
            alert("Data Tersimpan ✅")
        }).catch((err) => {
            console.log(err)
        })
    }

    btBatalkanPesanan = (cart_id) => {
        axios.patch(`${API_URL}/transactions/batalkan-pesanan`, {
            cart_id: cart_id
        }).then((res) => {
            alert("Data Tersimpan ✅")
        }).catch((err) => {
            console.log(err)
        })
    }

    printTransactions = () => {
        return this.state.transactions.map((value, index) => {
            return <div className="row shadow p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "95%" }}>
                <div className='col-md-2'>
                    <div><img src={value.galeri_produk} width="70%" alt={value.nama_produk} /></div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Tanggal Transaksi</b></div>
                    <div>{value.date}</div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Nama Produk</b></div>
                    <div>{value.nama_produk}</div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Harga Produk</b></div>
                    <div>Rp {value.harga_jual}</div>
                </div>
                <div className='col-md-2 m-auto text-center'>
                    <div><b>Bukti Transfer</b></div>
                    <div><img src={value.galeri_pembayaran} width="100%" /></div>
                </div>
                <h5 className='col-md-2 m-auto text-center'>
                    <div><Badge color={value.nama_status === "Menunggu Pembayaran" ? "info" : value.nama_status === "Menunggu Konfirmasi" ? "warning" : value.nama_status === "Transaksi Berhasil" ? "success" : "danger"}>{value.nama_status}</Badge></div>
                </h5>
                <h5 className='col-md-2 ml-auto text-center'>
                    <Button color="success" onClick={() => this.btTerimaPesanan(value.cart_id)}>Confirm</Button>
                    <Button color="danger" onClick={() => this.btBatalkanPesanan(value.cart_id)}>Reject</Button>
                </h5>
            </div>
        })
    }

    render() {
        return (
            <div className="p-4" style={{ fontFamily: "poppins", fontSize: "15px" }}>
                <h3 className="text-center" style={{ fontWeight: "bolder" }}>Transactions Management</h3>
                <br />
                <div className="row shadow pb-3 bg-white rounded m-auto" style={{ width: "75%" }}>
                    {this.printTransactions()}
                </div>
            </div>
        );
    }
}

export default TransactionAdmin;