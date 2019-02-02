import React from 'react';

const Topic = (props) => {
    return(
        <button onClick = {() => {
                props.handleClick({
                    name: props.name,
                    id: props.id
                })
            }
        }>
            {props.name}
        </button>
    )
}

export default Topic