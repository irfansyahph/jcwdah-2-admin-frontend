import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../helper';


class SalesReport extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div className="p-4" style={{ fontFamily: "poppins", fontSize: "15px" }}>
                <h2 className="text-center" style={{ fontWeight: "bolder" }}>Sales Report</h2>
                <div className="row shadow p-2 mt-5 pb-3 bg-white rounded m-auto" style={{ width: "65%" }}>
                    <div className='shadow col-md-3 mt-3 rounded m-auto' style={{ height: "200px", width: "300px" }}>
                        <h4 style={{ fontWeight: "bolder" }}>Number of Sales</h4>
                        <hr className="my-3" style={{ width: "100%" }} />
                        <h3>-</h3>
                    </div>
                    <div className='shadow col-md-3 mt-3 rounded m-auto' style={{ height: "200px", width: "300px" }}>
                        <h4 style={{ fontWeight: "bolder" }}>Revenue</h4>
                        <hr className="my-3" style={{ width: "100%" }} />
                        <h3>Rp. -</h3>
                    </div>
                    <div className='shadow col-md-3 mt-3 rounded m-auto' style={{ height: "200px", width: "300px" }}>
                        <h4 style={{ fontWeight: "bolder" }}>Profit</h4>
                        <hr className="my-3" style={{ width: "100%" }} />
                        <h3>Rp. -</h3>
                    </div>
                    <div className='shadow col-md-3 mt-3 rounded m-auto' style={{ height: "200px", width: "300px" }}>
                        <h4 style={{ fontWeight: "bolder" }}>Cost</h4>
                        <hr className="my-3" style={{ width: "100%" }} />
                        <h3>Rp. -</h3>
                    </div>
                    <div className='shadow col-md-7 mt-3 rounded m-auto' style={{ height: "200px", width: "65%" }}>
                        <h4 style={{ fontWeight: "bolder" }}>Sales Revenue</h4>
                        <hr className="my-3" style={{ width: "100%" }} />
                    </div>
                    <div className='shadow col-md-5 mt-3 rounded m-auto' style={{ height: "200px", width: "30%" }}>
                        <h4 style={{ fontWeight: "bolder" }}>Cost Breakdown</h4>
                        <hr className="my-3" style={{ width: "100%" }} />
                        <h5>Marketing</h5>
                        <h5>Rp. -</h5>
                        <h5>Sales</h5>
                        <h5>Rp. -</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesReport;