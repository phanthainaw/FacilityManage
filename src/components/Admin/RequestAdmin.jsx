import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import '/src/styles/Admin/RequestAdmin.css'
import React, {useEffect, useState} from "react";
import {sendGetRequest, sendPutRequest} from "../../services/HTTP.js";

function RequestAdmin() {
    const [requests, setRequests] = useState([]);

    const [equipments, setEquipments] = useState([]);

    const [equipmentInfo, setEquipmentInfo] = useState({});

    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        getAllRequest()
    }, [])
    useEffect(()=>{
        let cost =0
        equipments.forEach(equipment => {cost+= (equipment.Price * equipment.Quantity)})
        setTotalCost(cost)
    },[equipments])

    async function getAllRequest() {
        const data = await sendGetRequest('http://localhost:8080/requests');

        // Separate requests into pending and past
        let pendingRequests = data
            .filter(request => request.status === 'Pending')
            .map(request => ({
                Id: request.requestID,
                Department: request.department.departmentName,
                By: request.employee.fullName,
                Time: request.requestDate,
                Status: request.status
            }));

        let pastRequests = data
            .filter(request => request.status !== 'Pending')
            .map(request => ({
                Id: request.requestID,
                Department: request.department.departmentName,
                By: request.employee.fullName,
                Time: request.requestDate,
                Status: request.status
            }));

        // Sort both arrays by time
        pendingRequests.sort((a, b) => new Date(b.Time) - new Date(a.Time));
        pastRequests.sort((a, b) => new Date(b.Time) - new Date(a.Time));

        // Combine pending and past requests
        setRequests([...pendingRequests, ...pastRequests]);
    }

    return <>
        <div className="requestAdminContainer">
            {/* First Table Section */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Department</th>
                    <th>By</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {requests.map((request) => <Request key={request.Id} request={request} setEquipments={setEquipments}/>)}
                </tbody>
            </table>

            {/* Second Table Section */}
            <div className="requestAdmin_equipmentList">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Current Price</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equipments.map((equipment) => (<Equipment key={equipment.id} equipment={equipment} setEquipmentInfo={setEquipmentInfo} />))}
                    </tbody>
                </table>
                <h3 style={{marginLeft: 'auto'}}>Total Cost: {totalCost}</h3>
            </div>
            <div>
                <div className='requestAdmin_equipmentInfo'>
                    <img className='requestAdmin_equipmentInfo_img' src="data:image/jpeg;base64,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" alt="Image of equipment"/>
                    <div>
                        <p>Tên Thiết Bị:{equipmentInfo.Name}</p>
                        <p>Giá: {equipmentInfo.Price}</p>
                        <p>Mô Tả:{equipmentInfo.Description}</p>
                        <p>Thời Hạn Bảo Hành:{equipmentInfo.Warranty} </p>
                        <p>Nhà Cung Cấp:{equipmentInfo.Supplier} </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function Request({request, setEquipments}) {
    async function getEquipmentListByRequest(requestID) {
        const data = await sendGetRequest('http://localhost:8080/requests/equipment/'+requestID);
        setEquipments(data.map((equipment) => ({Id: equipment.equipment.equipmentID, Name: equipment.equipment.equipmentName,Price:equipment.equipment.currentPrice, Quantity:equipment.quantity, Supplier:equipment.equipment.supplier.supplierName})));
    }
    async function approveRequest(requestID) {
        sendPutRequest("http://localhost:8080/requests/changestatus/"+requestID, 'approved');
    }async function denyRequest(requestID) {
        sendPutRequest("http://localhost:8080/requests/changestatus/"+requestID, 'dennied');
    }

    return <>
        <tr>
            <td onClick={()=>{getEquipmentListByRequest(request.Id)}}>{request.Id}</td>
            <td onClick={()=>{getEquipmentListByRequest(request.Id)}}>{request.Department}</td>
            <td onClick={()=>{getEquipmentListByRequest(request.Id)}}>{request.By}</td>
            <td onClick={()=>{getEquipmentListByRequest(request.Id)}}>{new Date(request.Time).toLocaleString('en-GB', {
                month: 'short',    // Short month format (e.g., Dec)
                day: '2-digit',    // Day with leading zero (e.g., 25)
                hour: '2-digit',   // Hour with leading zero
                minute: '2-digit', // Minute with leading zero
                hour12: false      // 24-hour format
            })}</td>
            {request.Status === 'Pending' ? <td>
                <button onClick={()=>{approveRequest(request.Id)}}>Approve</button>
                <button onClick={()=> {denyRequest(request.Id)}}>Delete</button>
            </td>: request.Status}
        </tr>
    </>
}

function Equipment({equipment, setEquipmentInfo}) {
    async function getEquipmentInfo(equipmentId) {
        const data = await sendGetRequest("http://localhost:8080/equipment/"+equipmentId);
        setEquipmentInfo({
            Id: data.dataID,
            Name: data.equipmentName,
            Price: data.currentPrice,
            Description: data.equipmentDescription,
            Warranty: data.purchasePeriod,
            Supplier: data.supplier.supplierName,
        })

    }
    return <tr onClick={()=> {getEquipmentInfo(equipment.Id)}}>
        <td>{equipment.Id}</td>
        <td>{equipment.Name}</td>
        <td>{equipment.Price}</td>
        <td>{equipment.Quantity}</td>
        <td>{parseInt(equipment.Price)*parseInt(equipment.Quantity)}</td>
    </tr>

}

export default RequestAdmin

