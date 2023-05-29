import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';



class Game extends React.Component {
    constructor(props) {
        super(props);

        const { optionCount } = this.props;
        const numOptionsForTarget = this.randn(3, 5);
        const optionArr = Array.from({ length: optionCount }).map(() => this.randn(2, 10));
        const targetSum = Array
            .from({ length: numOptionsForTarget })
            .map(() => this.randn(0, numOptionsForTarget + 1))
            .reduce((acc, cur) => acc + optionArr[cur], 0);

        this.state = {
            optionArr,
            numOptionsForTarget,
            targetSum,
            optionSum: 0,
            gameStatus: 'Play',
        };
    }


    randn(a, b) {
        return a + Math.floor((b - a) * Math.random());
    }


    optionSumFnc = (optionVal) => {
        this.setState(
            (prevState) => ({
                optionSum: prevState.optionSum + optionVal
            })
        );
    };


    gameStatus = () => {
        if (this.state.optionSum < this.state.targetSum) {
            return 'Play';
        } else if (this.state.optionSum === this.state.targetSum) {
            this.setState({ optionSum: -1 })
            return 'Won';
        } else {
            this.setState({ optionSum: -1 })
            return 'Lost';
        }
    }


    componentDidUpdate() {
        if (this.gameStatus() === 'Play') {
            return;
        }
        this.setState({
            gameStatus: this.gameStatus()
        })
        setTimeout(() => {
            this.props.gameOver()
        }, 3000)
    }



    render() {
        const { optionArr, targetSum } = this.state;

        return (
            <View style={[styles.container, styles[`status${this.state.gameStatus}`]]}>
                <Text style={styles.sum}>SUM</Text>
                <Text style={styles.targetSum}>{targetSum}</Text>
                {optionArr.map((option, index) => (
                    <OptionBld
                        val={option}
                        key={index}
                        isPressed={(this.gameStatus() === 'Play') ? 0 : 1}
                        optionSum={this.optionSumFnc}
                        gameStatus={this.gameStatus()}
                    />
                ))}
            </View>
        );
    }
}


class OptionBld extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            targetSum: this.props.targetSum,
            isPressed: props.isPressed,
        }
    }

    optionPressed = () => {
        if (this.state.isPressed || !(this.props.gameStatus === 'Play')) {
            return;
        } else {
            this.setState({
                isPressed: 1
            })
            this.props.optionSum(this.props.val);
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.optionPressed}>
                <Text style={[styles.option, this.state.isPressed && styles.pressed]}>
                    {this.props.val}
                </Text>
            </TouchableOpacity>
        )
    }
};



styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    sum: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black',
        marginTop: 20,
        backgroundColor: 'white',
    },

    targetSum: {
        backgroundColor: 'black',
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
        margin: 20,
        padding: 5,
    },

    option: {
        fontSize: 20,
        marginHorizontal: 150,
        marginVertical: 15,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },

    pressed: {
        opacity: 0.5,
    },

    statusPlay: {
        backgroundColor: 'white',
    },

    statusLost: {
        backgroundColor: 'red',
    },

    statusWon: {
        backgroundColor: 'rgb(144, 238, 144)',
    }
})



export default Game;