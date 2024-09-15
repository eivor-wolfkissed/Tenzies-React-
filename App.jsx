import React, { useState, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Stopwatch from './Stopwatch';
import "./index.css";

export default function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [timeTaken, setTimeTaken] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);
    const [user, setUser] = useState({ name: '', username: '', email: '', password: '' });
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const dicearray = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (dicearray && allSameValue) {
            setTenzies(true);
            setIsRunning(false);
        }
    }, [dice]);

    useEffect(() => {
        if (showInstructions) {
            setIsRunning(false);
            setResetTimer(true);
        } else {
            setResetTimer(false);
        }
    }, [showInstructions]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        };
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie();
            }));
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setIsRunning(false);
            setShowInstructions(true);
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        }));
    }

    function handleTimeUpdate(newTime) {
        setTimeTaken(newTime);
    }

    function startGame() {
        setShowInstructions(false);
        setIsRunning(true);
        setResetTimer(true);
        setResetTimer(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    function handleRegister(event) {
        event.preventDefault();
        setIsRegistered(true);
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    return (
        <main>
            {showInstructions ? (
                <div className="instructions-page">
                    {isRegistered ? (
                        <>
                            <h1>Hello, {user.username}</h1>
                            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                            <button className="start-game" onClick={startGame}>Let's Begin</button>
                        </>
                    ) : (
                        <div className="user-form-container">
                            <h1>Register</h1>
                            <form onSubmit={handleRegister}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={user.username}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="submit">Register</button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {tenzies && <Confetti />}
                    <h1 className="title">Tenzies</h1>
                    <Stopwatch isRunning={isRunning} onTimeUpdate={handleTimeUpdate} />
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
                    {tenzies && <div className="time-taken">Time taken: {timeTaken} s</div>}
                </>
            )}
        </main>
    );
}
