/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        tasks: [],
        newValue: '',
        submitOption: 'submit',
        index: undefined,
    }

    componentDidMount() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (!tasks) return;
        this.setState({
            tasks,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { tasks } = this.state;
        if (prevState.tasks === tasks) return;
        const tasksList = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasksList);
    }

    handleSubmit = (e) => {
        // eslint-disable-next-line object-curly-newline
        const { tasks, newValue, submitOption, index } = this.state;

        e.preventDefault();

        if (submitOption === 'submit') {
            if (tasks.indexOf(newValue.trim()) !== -1) return;
            this.setState({
                tasks: [...tasks, newValue.trim()],
                newValue: '',
            });
        } else {
            // eslint-disable-next-line max-len
            if (tasks.indexOf(newValue.trim()) !== -1 && tasks.indexOf(newValue.trim()) !== index) return;
            tasks.splice(index, 1, newValue.trim());
            this.setState({
                tasks: [...tasks],
                submitOption: 'submit',
                newValue: '',
            });
        }
    };

    setValue(e, index = undefined) {
        const { tasks } = this.state;
        this.setState({
            newValue: index === undefined ? e.target.value : tasks[index],
        });
        // eslint-disable-next-line no-unused-expressions
        index !== undefined && this.setState({ submitOption: 'edit', index });
    }

    handleDelete = (e) => {
        const { tasks } = this.state;

        const index = tasks.indexOf(e.target.previousSibling.previousSibling.textContent);
        tasks.splice(index, 1);
        this.setState({
            tasks: [...tasks],
        });
    };

    render() {
        const { tasks, newValue, submitOption } = this.state;

        return (
            <>
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="text" value={newValue} onChange={(e) => this.setValue(e)} />
                    <input type="submit" value={submitOption} />
                </form>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={task}>
                            {task}
                            <button type="button" onClick={(e) => this.setValue(e, index)}>edit</button>
                            <button type="button" onClick={(e) => this.handleDelete(e)}>x</button>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
