import axios from 'axios';
import React from 'react';
import { Button, Table } from 'reactstrap';
import { API_URL } from '../../helper';

class DataUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        axios.get(`${API_URL}/users/get`)
            .then((res) => {
                console.table(res.data)
                this.setState({ users: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    btDelete = (produk_id) => {
        axios.delete(`${API_URL}/products/delete/${produk_id}`)
            .then((res) => {
                this.getUsers()
            }).catch((err) => {
                console.log(err);
            })
    }

    btEdit = (index) => {
        this.setState({ modalEdit: !this.state.modalEdit, selectedIndex: index })
    }

    printUsers = () => {
        let { users } = this.state
        return users.map((value, index) => {
            return <tr className='text-center' style={{ width: "20vw" }}>
                <th>{index + 1}</th>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.no_telepon}</td>
                <td>{value.user_status}</td>
                <td>{value.user_role}</td>
                <td>
                    <Button type="button" color="warning" onClick={() => this.btActive(value.user_id)}>Active</Button>
                    <Button type="button" color="danger" outline onClick={() => this.btNonActive(value.user_id)}>Unactive</Button>
                </td>
            </tr>
        })
    }

    btActive = (user_id) => {
        axios.patch(`${API_URL}/users/activing-user`, {
            user_id: user_id
        }).then((res) => {
            alert("Data Tersimpan ✅")
        }).catch((err) => {
            console.log(err)
        })
    }

    btNonActive = (user_id) => {
        axios.patch(`${API_URL}/users/non-activing-user`, {
            user_id: user_id
        }).then((res) => {
            alert("Data Tersimpan ✅")
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="p-4" style={{ fontFamily: "poppins", fontSize: "15px" }}>
                <h3 className="text-center" style={{ fontWeight: "bolder" }}>Users Management</h3>
                <br />
                <Table dark className="mt-4" >
                    <thead >
                        <tr className='text-center' >
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>No. Telepon</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.printUsers()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default DataUser;