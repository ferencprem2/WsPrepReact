import { useState, useEffect, useContext } from "react";
import { MembersContext } from "./App";
import { SpeedContext } from "./App";
import './RouteAssignments.css'

const RouteAssingments = (props) => {
    const [apiResponse, setApiResponse] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/routes")
            .then(response => response.json())
            .then(data => {
                setApiResponse(data)
            })
    }, [])

    return (
        <div>
            <h1>RouteAssingments</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Distance</th>
                        <th>Starting Point</th>
                        <th>Arriving Point</th>
                        <th>Name</th>
                        <th>Runner</th>
                        <th>Speed</th>
                        <th>Time</th>
                        <th>Time in Total</th>
                    </tr>
                </thead>
                <tbody>
                    {apiResponse.map((value, idx) => <TableRow key={idx} rowData={value} />)}
                </tbody>
            </table>
        </div>
    )
}

const TableRow = (props) => {
    let { id, distance, startinglocation, arrivallocation, routepartname } = props.rowData

    let [members ,setMembers] = useContext(MembersContext)
    let [currentSpeed, setCurrentSpeed] = useContext(SpeedContext)

    return (
        <tr>
            <td>{id}</td>
            <td>{distance}</td>
            <td>{startinglocation}</td>
            <td>{arrivallocation}</td>
            <td>{routepartname}</td>
            <td>
                <select>
                    {members.map((value, idx) => {
                        if (value.length > 1) { return <option key={idx}>{value}</option> }
                        return
                    })}
                </select>
            </td>
            <td> 
                {currentSpeed.map((value, idx) => { return <span key={idx}>{value}</span>})}
            </td>
            <td>
            </td>
        </tr>
    )
}

export default RouteAssingments