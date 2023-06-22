import { useState, useEffect } from "react";
import axios from "axios";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button} from "@mui/material";
import Home from "./Home/Home";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = () => {
        let body = {
            "username": username,
            "password": password
        }
        axios.post("https://www.ura.hcmut.edu.vn/bahnar/nmt/api/auth", body).then(res => {
            if (res.data == "No user found!") {
                setUsername("");
                setPassword("");
                alert("Người dùng không tồn tại!");
            }
            else {
                props.setUser(username);
                props.setContent(<Home username={username}/>);
            }
        });
    }
    
    const signupSubmit = () => {
        let body = {
            "username": username,
            "password": password
        }
        axios.post("https://www.ura.hcmut.edu.vn/bahnar/nmt/api/create", body).then(res => {
            if (res.data == "Dupplicated user!") {
                setUsername("");
                setPassword("");
                alert("Người dùng đã tồn tại!");
            }
            else {
                props.setUser(username);
                props.setContent(<Home username={username}/>);
            }
        });
    }

    return(
        <Box className="container mt-4 d-flex flex-column align-items-center">
            <h3>Đăng nhập để có đầy đủ chức năng</h3>
            <FormControl
                sx={{
                    width: '30%'
                }}
            >
                <TextField label="Tên đăng nhập" variant="standard" type="text" onChange={(event) => setUsername(event.target.value)} value={username}/>
                <TextField label="Mật khẩu" variant="standard" type="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
                <Button variant="contained" className="mt-4" onClick={loginSubmit}>Đăng nhập</Button>
                <Button variant="contained" className="mt-4" onClick={signupSubmit}>Đăng ký</Button>
            </FormControl>
        </Box>
    );
}

export default Login;
