import React from "react";
import "./modal.css";

function Key(props) {
    return (
        <button className="keyButton" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Keypad extends React.Component {
    renderSquare(i) {
        return (
            <Key
                value={i}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="keyboard-wrapper">
                <div className="keypad-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="keypad-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className="keypad-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
                <div className="keypad-row">
                    {this.renderSquare('*')}
                    {this.renderSquare(0)}
                    {this.renderSquare('#')}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        };
    }

    handleClick(i) {
        console.log("i="+i);
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        squares[i] = i;
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];

        return (
            <div className="game">
                    <Keypad
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                {/*<div className="game-info">*/}
                {/*    <ol>/!* TODO *!/</ol>*/}
                {/*</div>*/}
            </div>
        );
    }
}


export default Game;

//
// // ========================================
//
// ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
// );
