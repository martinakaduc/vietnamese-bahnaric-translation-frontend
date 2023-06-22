import React, {useState, useEffect} from "react";
import { Button, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from "@mui/material";
import axios from "axios";

const History = (props) => {
    
    const [history, setHistory] = useState([]);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     let body = {
    //         "username": props.username
    //     }

    //     console.log("body: ", body);

    //     axios.post("http://localhost:5000/history", body).then(res => {setHistory(res.data);});
    // }, [props.username])


    const renderHistoryTable = () => {
        return (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: '900'}} align="center"><h3>Tiếng Việt</h3></TableCell>
                        <TableCell sx={{fontWeight: '900'}} align="center"><h3>Tiếng Bana</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((history_row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{history_row.input}</TableCell>
                            <TableCell align="center">{history_row.output}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> 
        );
    }

    const handleOnClick = () => {
        let body = {
            "username": props.username
        }
        axios.post("https://www.ura.hcmut.edu.vn/bahnar/nmt/api/history", body).then(res => {setHistory(res.data);});
        setOpen(true);
    }

    return(
        <Box className="container mt-4">
            <h3>Xin chào, {props.username}</h3>
            <Button onClick={handleOnClick}>Hiển thị lịch sử</Button>
            {open && renderHistoryTable()}
        </Box>
    );
}

export default History;
