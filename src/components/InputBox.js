import React from 'react';

class InputBox extends React.Component{ 
    state =  {
        messageText: ""
    }
    handleMessageTextChange = (text) => {
        this.setState(() => ({
            messageText: text
        }))
    }
    render(){
        return(
            <div>
                <input type="text" 
                    onChange = {(e) => {
                        this.handleMessageTextChange(e.target.value)
                    }}
                    value = {this.state.messageText}
                />
                <button onClick = {() => {
                    this.props.handleSend({message: this.state.messageText})
                    this.setState(() => ({messageText: ""}))
                    console.log(`Sent message: ${this.state.messageText}`)
                }}>Send</button>
            </div>
        )
    }
}

export default InputBox