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
        messages: []
    };
    componentDidMount(){
        Axios.get('topics')
        .then(response => this.setState(() => ({topics: response.data})))
    };
    handleTopicSelect = (data) => {
        console.log(data)
        if(this.isChatOn) return
        socket = io({
            query: data
        });
        socket.on('connect',() => {
            this.setState(() => ({isChatOn: true}))
            console.log('connected! '+socket.id)
        })
        socket.on("FOUND",data => {
            console.log("Connected!")
            socket.emit("FOUND",data)
        })
        socket.on("RECV",msg => {
            // console.log(`recv ${JSON.stringify(message)}`)
            this.setState(prevState => ({
                messages: [...prevState.messages,msg.message]
            }))
        })
    }
    handleSend = (message) => {
        socket.emit("SEND",message)
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
                {messageList}
                <br />
                <InputBox handleSend = {this.handleSend}/>
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))
console.log('tis running!')