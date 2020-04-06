import React from "react";
import axios from "axios";

import EmployeeDetails from "./EmployeeDetails";

import "../App.css";

const sortTypes = {
    up: {
        class: "sortUp",
        fn: (a, b) => a.name.localeCompare(b.name)
    },
    down: {
        class: "sortDown",
        fn: (a, b) => b.name.localeCompare(a.name)
    },
    default: {
        class: "sort",
        fn: (a, b) => a
    }
}
class Employee extends React.Component {
    state = {
        allRecords: [],
        displayRecords: [],
        searchTerm: "",
        currentSort: "default"
    }
    componentDidMount = () => {
        axios.get("https://randomuser.me/api/?results=200&nat=us")
            .then(records => {
                console.log(records);
                this.setState({ allRecords: records.data.results, displayRecords: records.data.results }, () => console.log(this.state))
            }
            )
    }

    alphabetize = () => {
        // let dontMessWithState = new Array(...this.state.allRecords)//deep copy
        // console.log(dontMessWithState)
        // dontMessWithState.sort((firs, seco) => {
        //     console.log(firs.name.first - seco.name.first)
        //     return seco.name.first - firs.name.first
        // })
        // console.log(dontMessWithState)
        // this.setState({ displayRecords: dontMessWithState })
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === "down") nextSort = "default";
        else if (currentSort === "up") nextSort = "down";
        else if (currentSort === "default") nextSort = "up";

        this.setState({
            currentSort: nextSort
        });
    }
    getLadies = () => {
        let dontMessWithState = new Array(...this.state.allRecords)//deep copy
        console.log(dontMessWithState)
        let ladies = dontMessWithState.filter(element => {

            return element.gender === "female"
        })
        console.log(ladies)
        this.setState({ displayRecords: ladies })
    }
    handler = event => {
        let searchTerm = (event.target.value)
        let dontMessWithState = new Array(...this.state.allRecords)//deep copy
        let filtered = dontMessWithState.filter(element => {
            let thisName = element.name.first + element.name.last
            return thisName.toLowerCase().includes(searchTerm.toLowerCase())
        })
        console.log(filtered)
        this.setState({ displayRecords: filtered, searchTerm: searchTerm })
    }
    render() {
        return (
            <div>
                <h1 onClick={this.alphabetize}>
                    Employee Management System
            </h1>
                <input value={this.state.searchTerm} id="nick" type="text" onChange={(event) => this.handler(event)} />
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>gender</th>
                            <th>location</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Picture</th>
                        </tr>
                    </thead>

                    {this.state.displayRecords.map(({ index, gender, name, location, email, cell, picture }) => {
                        return (
                            <EmployeeDetails

                                key={index}
                                gender={gender}
                                firstName={name.first}
                                lastName={name.last}
                                location={location.city}
                                email={email}
                                cell={cell}
                                picture={picture}
                            />
                        )
                    })}
                </table>
            </div>)
    }
}

export default Employee;