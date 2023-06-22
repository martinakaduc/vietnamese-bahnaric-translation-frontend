import axios from "axios";
import Home from "../pages/Home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import History from "../pages/History";
import './Navbar.css'

const Navbar = (props) => {
    const handleLogout = () => {
        props.setUser("");
        props.setContent(<Home username=""/>);
        this.forceUpdate();
    }
    
    return(
        <div>
            <nav className="navbar navbar-expand-lg static-top p-4">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="..." height="60"/>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item px-3">
                                <span className="nav-link fs-5" onClick={() => props.setContent(<Home username={props.username}/>)}>Trang chủ</span>
                            </li>
                            <li className="nav-item px-3">
                                <span className="nav-link fs-5" onClick={() => props.setContent(<About/>)}>Về hệ thống</span>
                            </li>
                            <li className="nav-item px-3">
                                <span className="nav-link fs-5" onClick={() => props.setContent(<Contact/>)}>Liên hệ</span>
                            </li>
                            {!props.username &&
                                <li className="nav-item px-3">
                                    <span className="nav-link fs-5" onClick={() => props.setContent(<Login setContent={props.setContent} setUser={props.setUser}/>)}>Đăng nhập</span>
                                </li>
                            }

                            {props.username &&
                                <li className="nav-item px-3">
                                    <span className="nav-link fs-5" onClick={() => props.setContent(<History username = {props.username}/>)}>Lịch sử</span>
                                </li>
                            }

                            {props.username &&
                                <li className="nav-item px-3">
                                    <span className="nav-link fs-5" onClick={handleLogout}>Đăng xuất</span>
                                </li> 
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar