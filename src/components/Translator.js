import React, { Component } from 'react'
import axios from 'axios'

class Translator extends Component {
    constructor (props) {
        super(props)

        this.state = {
            "text": "",
            "model": ""
        }
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post("http://127.0.0.1:5000/getdata", this.state)
            .then( response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render () {
        const {text, model} = this.state     

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" placeholder="text" name="text" value={text} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text" placeholder="model" name="model" value={model} onChange={this.changeHandler} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Translator