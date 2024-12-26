import '../../styles/Request/EquipmentDetail.css'
import React, { useState } from 'react';

function EquipmentDetails(props) {
    return <div className='equipmentDetailsContainer'>
        {props.equipmentList.map((Equipment => <EquipmentDetail addRequest={props.addRequest} equipmentList={props.equipmentList} setEquipmentList={props.setEquipmentList} Id={Equipment.Id} Name={Equipment.Name} Description={Equipment.Description} Price={Equipment.Price} Warranty={Equipment.Warranty} Supplier={Equipment.Supplier} />))}
    </div>
}

function EquipmentDetail(Equipment) {
    const [quantity, setQuantity] = useState(0);
    const onQuantityChange = (e) => {
        setQuantity(e.target.value)
    }
    function addEquipment() {
        Equipment.setEquipmentList(Equipment.equipmentList.map(equipment => equipment.Id === Equipment.Id ? { ...equipment, Quantity: quantity } : equipment))
    }
    return <div className='equipmentDetailContainer'>
        <img src="" alt="Image of equipment" />
        <div>
            <p>Tên Thiết Bị: {Equipment.Name}</p>
            <p>Giá: {Equipment.Price}</p>
            <p>Mô Tả: {Equipment.Description}</p>
            <p>Thời Hạn Bảo Hành: {Equipment.Warranty} </p>
            <p>Nhà Cung Cấp: {Equipment.Supplier} </p>
            {
                !Equipment.addRequest || <>
                    <input type="number" onChange={onQuantityChange} value={quantity} />
                    <button id={Equipment.Id} onClick={addEquipment} >Thêm</button>
                </>
            }
        </div>
    </div>
}
export default EquipmentDetails