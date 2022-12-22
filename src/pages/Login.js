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
        axios.post("http://localhost:5000/auth", body).then(res => {
            if (res.data == "No user found!") {
                setUsername("");
                setPassword("");
                alert("No user found!");
            }
            else {
                props.setUser(username);
                props.setContent(<Home username={username}/>);
            }
        });
    }

    return(
        <Box className="container mt-4 d-flex flex-column align-items-center">
            <h3>Login form</h3>
            <FormControl
                sx={{
                    width: '30%'
                }}
            >
                <TextField label="Username" variant="standard" type="text" onChange={(event) => setUsername(event.target.value)} value={username}/>
                <TextField label="Password" variant="standard" type="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
                <Button variant="contained" className="mt-4" onClick={loginSubmit}>Login</Button>
            </FormControl>
        </Box>
    );
}

export default Login;