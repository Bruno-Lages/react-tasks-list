/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        tasks: [],
    }

    handleSubmit = (e) => {
        const { tasks } = this.state;

        e.preventDefault();
        if (tasks.indexOf(e.target.firstChild.value.trim()) !== -1) return;
        this.setState({
            tasks: [...tasks, e.target.firstChild.value.trim()],
        });
    };

    handleClick = (e) => {
        const { tasks } = this.state;

        const index = tasks.indexOf(e.target.previousSibling.textContent);
        tasks.splice(index, 1);
        this.setState({
            tasks: [...tasks],
        });
        // eslint-disable-next-line no-console
        console.log(tasks);
    };

    render() {
        const { tasks } = this.state;

        return (
            <>
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="text" />
                    <input type="submit" value="submit" />
                </form>
                <ul>
                    {tasks.map((task) => (
                        <li key={task}>
                            {task}
                            <button type="button" onClick={this.handleClick}>x</button>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
