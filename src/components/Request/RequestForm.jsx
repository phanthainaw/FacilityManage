import '../../styles/Request/RequestForm.css'
import React, { useState, useEffect } from 'react';
import { sendGetRequest,sendPostRequest } from '../../services/HTTP';


function RequestForm(props) {
    const [requestList, setRequestList] = useState([])
    async function getAllRequest() {
        const data = await sendGetRequest('http://localhost:8080/requests');
        const newData = data.map(request => ({
            Id: request.requestID,
            Date: new Date(request.requestDate).toISOString().split('T')[0],
            Description: request.description,
            Status: request.status
        }));
        setRequestList(newData);
    }
    useEffect(() => {
        getAllRequest();
    }, []);

    const [description, setDescription] = useState('')

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const postRequest = async () => {
        sendPostRequest('http://localhost:8080/requests', JSON.stringify(props.equipmentList.map(equipment => ({ Id: equipment.Id, Quantity: equipment.Quantity }))))
    }

    const deleteEquipment = (e) => {
        props.setEquipmentList(props.equipmentList.map(equipment => equipment.Id == parseInt(e.target.id) ? { ...equipment, Quantity: 0 } : equipment))
    }

    const viewRequestInfo = async (e) => {
        props.setAddRequest(false)
        const data = await sendGetRequest('http://localhost:8080/requests/equipment/6')
        const newData = data.map(equipment => ({
            Id: equipment.equipment.equipmentID,
            Name: equipment.equipment.equipmentName,
            Price: equipment.equipment.currentPrice,
            Description: equipment.equipment.equipmentDescription,
            Warranty: equipment.equipment.purchasePeriod,
            Supplier: equipment.equipment.supplier.supplierName,
            Quantity: equipment.quantity
        }));
        props.setEquipmentList(newData);
    }

    return (
        <div className='requestForm'>
            <div className='equipmentList'>
                <table className='requestTable'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Số lượng</th>
                            {!props.addRequest || <th style={{ backgroundColor: '#8FAD88', width: '100px' }} ></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.equipmentList.map((equipment, index) => equipment.Quantity > 0 ?
                            <tr key={index} className='requestRow'>
                                <td>{index + 1}</td>
                                <td>{equipment.Name}</td>
                                <td>{equipment.Quantity}</td>
                                {
                                    !props.addRequest || <td style={{ textAlign: "center" }}>
                                        <div className='actions'>
                                            <button id={equipment.Id} onClick={deleteEquipment}>xóa</button>
                                        </div>
                                    </td>
                                }
                            </tr> : <></>
                        )}
                    </tbody>
                </table>
            </div>
            <p>Mô tả</p>
            <input name='Description' onChange={onDescriptionChange} value={description} className='inputDescription' type="text" />
            <button onClick={() => { props.setAddRequest(true); props.getAllEquipment() }}>Create Request</button>
            <button onClick={postRequest}>Send Request</button>
            <h1>Danh Sách Yêu Cầu</h1>
            <div className='requestList'>
                <table>
                    <thead>
                        <tr >
                            <th>Id</th>
                            <th>RequestDate</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestList.map(request => <tr key={request.Id} onClick={viewRequestInfo}>
                            <td >{request.Id}</td>
                            <td>{request.Date}</td>
                            <td>{request.Description}</td>
                            <td>{request.Status}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RequestForm