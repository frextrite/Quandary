import React from 'react';
import ReactDOM from 'react-dom';
import Topic from './components/Topic'
import Axios from 'axios';
import io from 'socket.io-client';
import Message from './components/Message';
import InputBox from './components/InputBox'

let socket;

class App extends React.Component {
    state = {
        topics: [],
        isChatOn: false,
        messages: [],
        username: ""
    };
    componentDidMount(){
        Axios.get('topics')
        .then(response => this.setState(() => ({topics: response.data})))
    };
    handleTopicSelect = (data) => {
        console.log(data)
        if(this.isChatOn) return
        socket = io({query: data});

        socket.on('connect',() => {
            console.log('connected! '+socket.id)
        })
        socket.on("FOUND",data => {
            console.log("Connected!")
            this.setState(() => ({
                username: data.username,
                isChatOn: true
            }))
            socket.emit("FOUND",data)
        })
        socket.on("RECV",data => {
            console.log(`recv ${JSON.stringify(data)}`)
            this.setState(prevState => ({
                messages: [...prevState.messages,data.message]
            }))
        })
    }
    handleSend = message => {
        socket.emit("SEND",{
            from: this.state.username,
            message: message
        })
    }
    render(){
        let topicList = this.state.topics.map(
            data => 
            <Topic 
                key = {data.id}
                name = {data.name}
                id = {data.id}
                handleClick = {this.handleTopicSelect}
            />)
        let messageList = this.state.messages.map(
            (message,id) => 
            <Message 
                key = {id}
                messageText = {message}
            />)
        return(
            <div>
                {topicList}
                <br />
                {this.state.isChatOn ? "Connected!" : "Not connected!"}
                <br />
                {messageList}
                <br />
                <InputBox handleSend = {this.handleSend}/>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))
console.log('tis running!')