import '../../styles/Request/RequestForm.css'
import { useState, useEffect } from 'react';
import { sendGetRequest,sendPostRequest } from '../../services/HTTP';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

function RequestForm(props) {
    const [requestList, setRequestList] = useState([])
    async function getAllRequest() {
        const data = await sendGetRequest('http://localhost:8080/requests/all/department/currentuser');
        const newData = data.map(request => ({
            Id: request.requestID,
            Date: new Date(request.requestDate).toISOString().split('T')[0],
            Description: request.description,
            Status: request.status
        }));
        setRequestList(newData);
        console.log(newData);
    }
    useEffect(() => {
        getAllRequest();
    }, []);

    const [description, setDescription] = useState('')

    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const onQuantityChange = (e) => {
        const { name, value } = e.target;
        props.setEquipmentList(props.equipmentList.map(equipment =>  equipment.Id == parseInt(name) ? { ...equipment, Quantity: value } : equipment ))
    }

    const postRequest = async () => {
        const requestEquipments =  props.equipmentList.filter(equipment => equipment.Quantity > 0).map(equipment => ({equipmentID:equipment.Id, quantity:parseInt(equipment.Quantity)}))
        sendPostRequest('http://localhost:8080/requests', {employeeID: userInfo.employeeID, description:description, requestEquipments: requestEquipments })
    }
    const deleteEquipment = (e) => {
        props.setEquipmentList(props.equipmentList.map(equipment => equipment.Id == parseInt(e.target.id) ? { ...equipment, Quantity: 0 } : equipment))
    }

    const viewRequestInfo = async (id) => {
        props.setAddRequest(false)
        const data = await sendGetRequest('http://localhost:8080/requests/equipment/'+id)
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
        console.log(data)
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
                                <td> <input style={{width:'60px'}} type={"number"} name={equipment.Id} onChange={onQuantityChange} value={equipment.Quantity}/></td>
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
                        {requestList.map(request => <tr key={request.Id} onClick={()=>viewRequestInfo(request.Id)}>
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