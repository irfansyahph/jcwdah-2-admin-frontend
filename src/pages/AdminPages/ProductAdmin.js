import React from 'react';
import axios from 'axios';
import { Table, Button, NavItem, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { API_URL } from '../../helper';
import { fontSize } from '@mui/system';
import { TextField, Typography } from '@material-ui/core';
import { Box } from "@mui/system";

class ProductAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            imgIndex: 0,
            productIndex: null,
            modal: false,
            modalEdit: false,
            images: [],
            imagesEdit: [],
            selectedIndex: null,
            fileName: "Select Image",
            fileUpload: null,
            defaultImage: "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"

        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = () => {
        axios.get(`${API_URL}/products/get`)
            .then((res) => {
                console.table(res.data)
                this.setState({ products: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    printProducts = () => {
        let { products } = this.state
        return products.map((value, index) => {
            return <tr className='text-center' style={{ width: "20vw" }}>
                <th>{index + 1}</th>
                <td className="text-center" style={{ width: "10vw" }}>
                    <img src={value.galeri_produk} alt={value.nama_produk} style={{ width: "100%" }} />
                </td>
                <td style={{ width: "10%" }}>{value.kategori}</td>
                <td style={{ width: "10%" }}>{value.nama_produk}</td>
                <td style={{ width: "20%" }}>{value.deskripsi_produk}</td>
                <td>{value.harga_modal}</td>
                <td>{value.harga_jual}</td>
                <td>{value.stok[0].total_stok}</td>
                <td>
                    <Button type="button" color="warning" onClick={() => this.btEdit(index)}>Edit</Button>
                    <Button type="button" color="danger" outline onClick={() => this.btDelete(value.produk_id)}>Delete</Button>
                </td>
            </tr>
        })
    }

    btDelete = (produk_id) => {
        axios.delete(`${API_URL}/products/delete/${produk_id}`)
            .then((res) => {
                this.getProducts()
            }).catch((err) => {
                console.log(err);
            })
    }

    btEdit = (index) => {
        this.setState({ modalEdit: !this.state.modalEdit, selectedIndex: index })
    }

    // printImagesForm = () => {
    //     return this.state.images.map((value, index) => {
    //         return <Input type="text" placeholder={`Image-${index + 1}`}
    //             onChange={(e) => this.handleImages(e, index)} />
    //     })
    // }

    // handleImages = (e, index) => {
    //     let temp = this.state.images
    //     temp[index] = e.target.value
    //     this.setState({ images: temp })
    // }

    printImagesEdit = () => {
        return this.state.products[this.state.selectedIndex].images.map((value, index) => {
            return <Input type="text" placeholder={`Image-${index + 1}`} defaultValue={value.url}
                onChange={(e) => this.handleImagesEdit(e, index)}
            />
        })
    }

    handleImagesEdit = (e, index) => {
        let temp = [...this.state.products[this.state.selectedIndex].images]
        temp[index].url = e.target.value
        this.setState({ imagesEdit: temp })
    }

    btSaveEdit = () => {
        let { products, selectedIndex, modalEdit } = this.state
        console.log(products[selectedIndex])
        let produk_id = products[selectedIndex].produk_id
        let nama_produk = this.refs.editNamaproduk.value
        let kategori = this.refs.editKategoriid.value
        let deskripsi_produk = this.refs.editDeskripsiproduk.value
        let harga_modal = parseInt(this.refs.editHargamodal.value)
        let harga_jual = parseInt(this.refs.editHargajual.value)

        axios.patch(`${API_URL}/products/edit`, {
            produk_id, nama_produk, kategori, deskripsi_produk, harga_modal, harga_jual
        })
            .then((res) => {
                this.getProducts()
                this.setState({ selectedIndex: null, modalEdit: !modalEdit })
            }).catch((err) => {
                console.log(err)
            })
    }

    btAddProduct = () => {
        let nama_produk = this.refs.namaproduk.value
        let kategori = this.refs.kategoriid.value
        let deskripsi_produk = this.refs.deskripsiproduk.value
        let harga_modal = parseInt(this.refs.hargamodal.value)
        let harga_jual = parseInt(this.refs.hargajual.value)
        let jumlah_stok = parseInt(this.refs.jumlahstok.value)
        let gudang_id = this.refs.gudangid.value
        let images = this.state.images

        console.log(kategori, nama_produk, deskripsi_produk, harga_modal, harga_jual, jumlah_stok, gudang_id, images)

        if (kategori == "" || nama_produk == "" || deskripsi_produk == "" || harga_modal == "" || harga_jual == "" || jumlah_stok == "" || gudang_id == "") {
            alert("Fill in form ❌")
        } else {
            if (isNaN(harga_modal) || isNaN(harga_jual)) {
                alert("harga_modal or harga_jual, wrong input ❌")
            } else {
                let formData = new FormData()
                let data = {
                    nama_produk,
                    kategori,
                    deskripsi_produk,
                    harga_modal,
                    harga_jual,
                    gudang_id,
                    jumlah_stok
                }

                formData.append('data', JSON.stringify(data));
                formData.append('images', this.state.fileUpload);

                axios.post(`${API_URL}/products/add`, formData)
                    .then((res) => {
                        this.getProducts()
                        this.setState({ modal: !this.state.modal })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        }
    }

    onBtImageUpload = (e) => {
        if (e.target.files[0]) {
            this.setState({ fileName: e.target.files[0].name, fileUpload: e.target.files[0] });
        } else {
            this.setState({ fileName: "Select Image", fileUpload: null })
        }
    }

    btSearch = (e) => {
        this.setState(e.target.value)
    }

    btHandleSearch = (nama_produk) => {
        let products = this.state

    }


    render() {
        let { modal, modalEdit, products, selectedIndex } = this.state;

        return (
            <div className="p-4" style={{ fontFamily: "poppins", fontSize: "15px" }}>
                <h3 className="text-center" style={{ fontWeight: "bolder" }}>Products Management</h3>
                <br />
                <input type="text" placeholder='cari produk' onChange={this.btSearch} />
                <button onClick={() => this.btHandleSearch()}>Search</button>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button color="success" outline type="button" onClick={() => this.setState({ modal: !modal })}>
                        Add Product
                    </Button>
                </div>

                {/* Modal untuk add product */}
                <Modal isOpen={modal} toggle={() => this.setState({ modal: !modal })}>
                    <ModalHeader>Add Product</ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Produk</label>
                                <input type="text" className="form-control" ref="namaproduk" />
                            </div>
                            <div className="form-group col-6">
                                <label>Kategori</label>
                                <select className="form-control" ref="kategoriid">
                                    <option value={null}>Pilih kategori</option>
                                    <option value="Aksesoris Wanita">Aksesoris Wanita</option>
                                    <option value="Aksesoris Pria">Aksesoris Pria</option>
                                    <option value="Aksesoris Komputer">Aksesoris Komputer</option>
                                    <option value="Pakaian">Pakaian</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Deskripsi</label>
                                    <input type="text" className="form-control" ref="deskripsiproduk" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Harga Modal</label>
                                    <input type="text" className="form-control" ref="hargamodal" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Harga Jual</label>
                                    <input type="text" className="form-control" ref="hargajual" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Jumlah</label>
                                    <input type="text" className="form-control" ref="jumlahstok" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Gudang</label>
                                    <select className="form-control" ref="gudangid">
                                        <option value={null}>Pilih gudang</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Notes Gudang</label>
                                    <div>1. BSD, 2. Jakarta</div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Label>Images List</Label>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <img
                                    id="imagePreview"
                                    width="90%"
                                    src={this.state.fileUpload ? URL.createObjectURL(this.state.fileUpload) : this.state.defaultImage} />
                            </div>
                            <div className="col-md-6">
                                <Input type="file" onChange={this.onBtImageUpload} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" outline color="success" onClick={this.btAddProduct}>Submit</Button>
                    </ModalFooter>
                </Modal>
                {/* Modal untuk edit product */}
                {
                    selectedIndex != null ?
                        <Modal isOpen={modalEdit} toggle={() => this.setState({ modalEdit: !modalEdit })}>
                            <ModalHeader>Edit Product</ModalHeader>
                            <ModalBody>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>Produk</label>
                                        <input type="text" className="form-control" ref="namaproduk" defaultValue={products[selectedIndex].nama_produk} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Kategori</label>
                                        <select className="form-control" ref="kategoriid" defaultValue={products[selectedIndex].kategori}>
                                            <option value={null}>Pilih kategori</option>
                                            <option value="Aksesoris Wanita">Aksesoris Wanita</option>
                                            <option value="Aksesoris Pria">Aksesoris Pria</option>
                                            <option value="Aksesoris Komputer">Aksesoris Komputer</option>
                                            <option value="Pakaian">Pakaian</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Deskripsi</label>
                                            <input type="text" className="form-control" ref="deskripsiproduk" defaultValue={products[selectedIndex].deskripsi_produk} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Harga Modal</label>
                                            <input type="text" className="form-control" ref="hargamodal" defaultValue={products[selectedIndex].harga_modal} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Harga Jual</label>
                                            <input type="text" className="form-control" ref="hargajual" defaultValue={products[selectedIndex].harga_jual} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            {/* <label>Jumlah</label>
                                            <input type="text" className="form-control" ref="jumlahstok" /> */}
                                        </div>
                                    </div>
                                    {/* <div className="col-6">
                                        <div className="form-group">
                                            <label>Gudang</label>
                                            <select className="form-control" ref="gudangid">
                                                <option value={null}>Pilih gudang</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Notes Gudang</label>
                                            <div>1. BSD, 2. Jakarta</div>
                                        </div>
                                    </div> */}
                                </div>
                                <hr />
                                {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Label>Images List</Label>
                                </div> */}
                                {/* {this.printImagesEdit()} */}
                            </ModalBody>
                            <ModalFooter >
                                <Button type="button" outline color="warning" onClick={() => this.setState({ modalEdit: !modalEdit, selectedIndex: null, imagesEdit: [] })}>Cancel</Button>
                                <Button type="button" outline color="success" onClick={this.btSaveEdit}>Save</Button>
                            </ModalFooter>
                        </Modal>
                        :
                        null
                }
                <Table dark className="mt-4" >
                    <thead >
                        <tr className='text-center' >
                            <th>No</th>
                            <th>Produk</th>
                            <th>Kategori</th>
                            <th>Nama</th>
                            <th>Deskripsi</th>
                            <th>Harga Modal</th>
                            <th>Harga Jual</th>
                            <th>Stok</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.printProducts()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductAdmin;