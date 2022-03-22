import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}

    render() {
        return (
            <footer style={{ paddingTop: "2vw", width: "100%", clear: "both", position: "relative", bottom: "0px",backgroundColor:"#B0E0E6" }}>
                <div className="footer-top" style={{  position: 'relative', color: 'white' }}>
                    <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: "15px", paddingRight: "15px", maxWidth: "720px" }}>
                        <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
                            <div className="col-12" style={{ flex: "0 0 100%", maxWidth: "100%" }}>
                                <div className="row" style={{ display: "flex", flexWrap: "wrap", marginLeft: "-15px", marginRight: "-15px", textAlign: "center" }}>
                                    <div className="pb-4" style={{ fontSize: "15px" }}>© 2022 W-Commerce. All rights reserved.</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;