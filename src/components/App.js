import React from 'react';
import Game from './Game.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            k: 1,
        }
    }

    newGame = () => {
        this.setState({
            k: this.state.k + 1
        })
    }

    render() {
        return (
            <Game key={this.state.k} gameOver={this.newGame} optionCount={6} />
        );
    }
};

export default App;