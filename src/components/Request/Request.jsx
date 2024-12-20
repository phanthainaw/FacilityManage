import { useState, useEffect } from 'react';
import RequestForm from './RequestForm';
import EquipmentDetails from './EquipmentDetails'
import Navbar from '../Navbar';
import '../../styles/Request/Request.css'
import { sendGetRequest } from '../../services/HTTP';

function Request(props) {
  const [addRequest, setAddRequest] = useState(true)
  const [equipmentList, setEquipmentList] = useState([]);

  async function getAllEquipment() {
    const data = await sendGetRequest('http://localhost:8080/equipment');
    const newData = data.map(equipment => ({
      Id: equipment.equipmentID,
      Name: equipment.equipmentName,
      Price: equipment.currentPrice,
      Description: equipment.equipmentDescription,
      Warranty: equipment.purchasePeriod,
      Supplier: equipment.supplier.supplierName,
      Quantity: 0
    }))
    setEquipmentList(newData)
  }
  useEffect(() => {
    getAllEquipment();
  }, []);

  return (
    <>
      <Navbar username={props.username} department={props.department} />
      <div className='requestContainer'>
        <EquipmentDetails
          addRequest={addRequest}
          equipmentList={equipmentList}
          setEquipmentList={setEquipmentList} />
        <RequestForm
          addRequest={addRequest}
          setAddRequest={setAddRequest}
          getAllEquipment={getAllEquipment}
          equipmentList={equipmentList}
          setEquipmentList={setEquipmentList} />
      </div>
    </>
  );
}

export default Request