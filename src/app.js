import React from 'react';
import ReactDOM from 'react-dom';
import Topic from './components/Topic'
import Axios from 'axios';

class App extends React.Component {
    state = {
        topics: []
    };
    componentDidMount(){
        Axios.get('topics')
        .then(response => this.setState(() => ({topics: response.data})))
    };
    render(){
        const topicList = this.state.topics.map(
            data => 
            <Topic 
                key = {data.id}
                name = {data.name}
                id = {data.id}
            />)
        return(
            topicList
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))
console.log('tis running!')