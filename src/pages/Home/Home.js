import { useState, useEffect } from "react";
import axios from "axios";
import ReactAudioPlayer from 'react-audio-player';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Grid, Button} from "@mui/material";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Tesseract from 'tesseract.js';


const Home = (props) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [sound, setSound] = useState(null);
    const [modal, setModal] = useState('Combined');
    const [gender, setGender] = useState('male');   
    const [region, setRegion] = useState('Binhdinh');
    
    // FILE useStage
    const [img,setImg] = useState("");
    const [fileName, setFileName] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            let body = {
                "text": input,
                "model": modal,
            }
            axios.post("https://www.ura.hcmut.edu.vn/NMT/api/translate/text", body)
            .then(response => {
                    const result = response.data.ResultObj;
                    const {src, tgt} = result;
                    setOutput(
                        tgt.map((text, index) =>
                            text.trim() !== '' ? text : ''
                        ).join('\n')
                    );
                }
            );
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [input])

    const chooseModal = (event) => {
        setModal(event.target.value);
    };
    const chooseGender = (event) => {
        setGender(event.target.value);
    };
    const chooseRegion = (event) => {
        setRegion(event.target.value);
    };
    
    const outputChangeHandle = e => {
        setOutput(e.target.value)
    }

    const translationSpeak = async event => {
        let body = {
            "text": output,
            "gender": gender,
        }
        const response = await axios.post("http://localhost:8080/speak/vi_ba", body);
        let urls = JSON.parse(response.data);
        urls = urls["urls"]
        console.log("Hello this is ", urls)
        console.log(typeof(urls))
        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }
        urls.forEach(async url => {
            console.log("Hello")
            console.log('Do you see me?')
            let success = false;
            while (!success) {
                try {
                    const audioResponse = await axios.get(url, { responseType: 'arraybuffer' });
                    success = true;
                    const audioBlob = new Blob([audioResponse.data], { type: 'audio/mpeg' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    let snd = new Audio(audioUrl);
                    snd.play();
                    await new Promise(resolve => snd.addEventListener('ended', resolve));
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log(`Audio file not found at ${url}. Waiting for 2 seconds before retrying...`);
                        await sleep(7000);
                    }
                }
            }
        });
    }

    const translationSave = () => {
        if (input === ""){
            alert("Nothing to save");
        }
        
        let body = {
            "username": props.username,
            "input": input,
            "output": output
        }
        axios.post("http://103.176.178.107:10014/:10013/saveHistory", body).then(response => alert("Translation has been saved!"));
    }
    
    // FILE CONVERT FUNCION
    const selectFile = () =>{
        document.getElementById('selectFile').click()
    }

    const convertFile = () =>{
        setIsLoad(true);
        Tesseract.recognize(
          img,
          'vie',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          setInput(text)
          setIsLoad(false);
        });
        setImg("")
        setFileName("")
      }
    // FILE CONVERT FUNCTION

    return(
        <Box className="container mt-4">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h3>Welcome to Vietnamese-Bahnaric translator, {(! props.username) ? "Guess" : props.username}</h3>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <FormControl variant="outlined" sx={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-standard-label">Modal</InputLabel>
                                <Select
                                    value={modal}
                                    onChange={chooseModal}
                                    label="Modal"
                                >
                                    <MenuItem value={"Combined"}>Combined</MenuItem>
                                    <MenuItem value={"Transformer"}>Transformer</MenuItem>
                                    <MenuItem value={"PhoBERT-fused NMT"}>PhoBERT-fused NMT</MenuItem>
                                    <MenuItem value={"Loanformer"}>Loanformer</MenuItem>
                                    <MenuItem value={"BartPho"}>BartPho</MenuItem>
                                    <MenuItem value={"BARTphoEncoderPGN"}>BARTphoEncoderPGN</MenuItem>
                                    <MenuItem value={"PE-PD-PGN"}>PE-PD-PGN</MenuItem>
                                    <MenuItem value={"M2M"}>M2M</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="outlined" sx={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-standard-label">Speech</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={chooseGender}
                                    label="Gender"
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl variant="outlined" sx={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-standard-label">Region</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"    
                                    value={region}
                                    onChange={chooseRegion}
                                    label="Region"
                                >
                                    <MenuItem value={"Binhdinh"}>Binh Dinh</MenuItem>
                                    <MenuItem value={"Kontum"}>Kon tum</MenuItem>
                                    <MenuItem value={"Gialai"}>Gia lai</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField 
                                label="Vietnamese" 
                                variant="outlined" 
                                sx={{
                                    width: '100%'
                                }}
                                multiline
                                rows={12}
                                value={input}
                                onChange={event => setInput(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField 
                                label="Bahnaric" 
                                variant="outlined" 
                                sx={{
                                    width: '100%'
                                }}
                                multiline
                                rows={12}
                                value={output}
                                onChange={outputChangeHandle}
                            />
                            
                        </Grid>
                        <Grid item xs={2}  alignItems="center">
                            <Button 
                                variant="outlined" 
                                startIcon={<VolumeUpRoundedIcon />}
                                fullWidth
                                onClick={translationSpeak}
                            >
                                Speak
                            </Button>

                            {/* FILE */}
                            <Button 
                                className="mt-5"
                                type="file" 
                                variant="outlined" 
                                startIcon={<VolumeUpRoundedIcon />}
                                onClick={selectFile}
                                fullWidth
                            >
                                Upload file
                            </Button>
                            <input 
                            type="file"
                            id="selectFile"
                            onChange={(e) => {
                                    setImg(URL.createObjectURL(e.target.files[0]));
                                    setFileName(e.target.files[0].name);
                                  }
                                }
                            style={{display:'none'}}
                            ></input>
                            <p>{fileName}</p>
                            {img && <Button 
                                className="mt-5"
                                type="file" 
                                variant="outlined" 
                                onClick={convertFile}
                                fullWidth
                            >
                                Convert
                            </Button>}
                            {isLoad && <p className="mt-5" variant="outlined" >Converting...</p>}
                            {/* FILE */}
                           
                            {props.username && 
                                <Button 
                                    className="mt-5"
                                    variant="outlined" 
                                    startIcon={<VolumeUpRoundedIcon />}
                                    fullWidth
                                    onClick={translationSave}
                                >
                                    Save
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
)}

export default Home
