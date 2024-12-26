import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import '/src/styles/Admin/EquipmentAdmin.css'
import {sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest} from "../../services/HTTP.js";

export default function EquipmentAdmin() {
    const [maxEquipmentId, setMaxEquipmentId] = useState(0);
    const [creatingSupplier, setCreatingSupplier] = useState(false);
    const [creatingEquipment, setCreatingEquipment] = useState(false);
    const [equipments, setEquipments] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [newEquipment, setNewEquipment] = useState({
        "equipmentName": "",
        "equipmentDescription": '',
        "purchasePeriod": 0,
        "supplierID": 1,
        "currentPrice": 0
    });
    const [newSupplier, setNewSupplier] = useState({
        "supplierName": "",
        "contactInfo": "",
        "address": ""
    });

    async function getAllSuppliers() {
        const data = await sendGetRequest('http://localhost:8080/admin/suppliers');
        setSuppliers(data.map(supplier=>({Id:supplier.supplierID, Name:supplier.supplierName, Contact:supplier.contactInfo, Address: supplier.address })))
    }

    async function getAllEquipment() {
        const data = await sendGetRequest('http://localhost:8080/equipment');
        const newData = data.map(equipment => ({
            Id: equipment.equipmentID,
            Name: equipment.equipmentName,
            Price: equipment.currentPrice,
            Description: equipment.equipmentDescription,
            Warranty: equipment.purchasePeriod,
            Supplier: equipment.supplier.supplierName,
            SupplierId: equipment.supplier.supplierID,
        }))
        setEquipments(newData)
    }

    useEffect(() => {
        getAllEquipment();
        getAllSuppliers();
    }, []);
    useEffect(() => {
        equipments.forEach(equipment => {
            if (parseInt(equipment.Id) > parseInt(maxEquipmentId)) {
                setMaxEquipmentId(equipment.Id)
            }
        })
    }, [equipments]);

    function onNewEquipmentChanged(e) {
        const {name, value} = e.target;
        setNewEquipment({...newEquipment, [name]: value})
    }
    function onNewSupplierChanged(e) {
        const {name, value} = e.target;
        setNewSupplier({...newSupplier, [name]: value})
    }

    async function createNewEquipment() {
        await sendPostRequest('http://localhost:8080/equipment', {
            ...newEquipment,
            equipmentID: parseInt(maxEquipmentId) + 1
        });
        setNewEquipment({
            "equipmentName": "",
            "equipmentDescription": '',
            "purchasePeriod": 0,
            "supplierID": 1,
            "currentPrice": 0
        })
        setCreatingEquipment((prevState) => !prevState);
        window.location.reload()
    }
    async function createNewSupplier() {
        await sendPostRequest('http://localhost:8080/admin/suppliers', newSupplier);
        setNewSupplier({
            "supplierName": "",
            "contactInfo": "",
            "address": ""
        });
        setCreatingSupplier((prevState) => !prevState);
        window.location.reload()
    }

    return <div className="equipmentAdmin_container">
        <div className={`manageForm ${creatingEquipment ? "show" : ""}`}>
            <div className="manage_inputGroup">
                <label>Name</label>
                <input onChange={onNewEquipmentChanged} type="text" name={"equipmentName"}
                       value={newEquipment.equipmentName} placeholder={`Enter Name`}/>
            </div>
            <div className="manage_inputGroup">
                <label>Price</label>
                <input onChange={onNewEquipmentChanged} name={"currentPrice"} value={newEquipment.currentPrice}
                       placeholder={`Enter Price`}/>
            </div>
            <div className="manage_inputGroup">
                <label>Description</label>
                <input onChange={onNewEquipmentChanged} name="equipmentDescription"
                       value={newEquipment.equipmentDescription} placeholder={`Enter Description`}/>
            </div>
            <div className="manage_inputGroup">
                <label>Warranty</label>
                <input onChange={onNewEquipmentChanged} name="purchasePeriod" value={newEquipment.purchasePeriod}
                       placeholder={`Enter Warranty`}/>
            </div>
            <div className="manage_inputGroup">
                <select onChange={onNewEquipmentChanged} name="supplierID">
                    {suppliers.map((supplier) => <option key={supplier.Id}
                                                         value={supplier.Id}>{supplier.Name}</option>)}
                </select>
            </div>
            <button onClick={createNewEquipment}>Add</button>
            <button onClick={()=>{setCreatingEquipment((prevState)=> !prevState)}}>Cancel</button>

        </div>
        <div className={`manageForm ${creatingSupplier ? "show" : ""}`}>
            <div className="manage_inputGroup">
                <label>Name</label>
                <input onChange={onNewSupplierChanged} type="text" name={"supplierName"}
                       value={newSupplier.supplierName} placeholder={`Enter Name`}/>
            </div>
            <div className="manage_inputGroup">
                <label>Contact Info</label>
                <input onChange={onNewSupplierChanged} name={"contactInfo"} value={newSupplier.contactInfo}
                       placeholder={`Enter Contact Info`}/>
            </div>
            <div className="manage_inputGroup">
                <label>Address</label>
                <input onChange={onNewSupplierChanged} name="address"
                       value={newSupplier.address} placeholder={`Enter Address`}/>
            </div>
            <button onClick={createNewSupplier}>Add</button>
            <button onClick={()=>{setCreatingSupplier((prevState)=>!prevState)}}>Cancel</button>

        </div>
        {/* First Table Section */}
        <div style={{overflow: "scroll"}}>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map(supplier => <Supplier key={supplier.Id} supplier={supplier} suppliers={suppliers}
                                                     setSuppliers={setSuppliers}/>)}
                <tr>
                    <td onClick={()=>{setCreatingSupplier((prevState)=>!prevState)}} className="equipmentAdmin_addEquipmentButton" colSpan="7">
                        <FontAwesomeIcon className="equipmentAdmin_addEquipmentButton_icon" icon={faPlus}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>


        {/* Second Table Section */}
        <div>
            <table>
                <thead>
                <tr>
                    <th style={{width: "20px"}}>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Warranty</th>
                    <th>Supplier</th>
                    <th style={{width: "15px"}}></th>
                </tr>
                </thead>
                <tbody>
                {equipments.map((equipment) => (
                    <Equipment key={equipment.Id} equipment={equipment} equipments={equipments}
                               setEquipments={setEquipments} suppliers={suppliers}/>))}
                <tr>
                    <td onClick={()=>{setCreatingEquipment((prevState)=> !prevState)}} className="equipmentAdmin_addEquipmentButton" colSpan="7">
                        <FontAwesomeIcon className="equipmentAdmin_addEquipmentButton_icon" icon={faPlus}/>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    </div>
}

function Supplier({supplier, suppliers, setSuppliers}) {
    const [debounceTimer, setDebounceTimer] = useState(null);

    function onSupplierInfoChanged(e) {
        const {name, value} = e.target;
        // Update the specific equipment's information
        setSuppliers(
            suppliers.map(supply =>
                supply.Id === supplier.Id
                    ? {...supplier, [name]: value} // Update only the matching equipment
                    : supply
            )
        );
        const newSupplier = {...suppliers.filter(supply => supply.Id === supplier.Id)[0], [name]: value};
        // Clear the previous debounce timer if the user types again
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new debounce timer to send GET request after 500ms
        const timer = setTimeout(() => {
            sendPutRequest('http://localhost:8080/admin/suppliers/' + supplier.Id, {
                "supplierName": newSupplier.Name,
                "contactInfo": newSupplier.Contact,
                "address": newSupplier.Address,

            });
        }, 500); // Adjust delay as needed (500ms)
        setDebounceTimer(timer);
    }

    async function deleteSupplier() {
        await sendDeleteRequest('http://localhost:8080/admin/suppliers/' + supplier.Id);
        window.location.reload();
    }

    return <tr>
        <td>{supplier.Id}</td>
        <td><input name="Name" onChange={onSupplierInfoChanged} className="equipmentAdmin_tableInput"
                   value={supplier.Name}/></td>
        <td><input name="Contact" onChange={onSupplierInfoChanged} className="equipmentAdmin_tableInput"
                   value={supplier.Contact}/></td>
        <td><input name="Address" onChange={onSupplierInfoChanged}  className="equipmentAdmin_tableInput"
                   value={supplier.Address}/></td>
        <td>
            <button onClick={deleteSupplier}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </td>
    </tr>
}

function Equipment({equipment, equipments, setEquipments, suppliers}) {
    const [debounceTimer, setDebounceTimer] = useState(null);

    async function deleteEquipment(equipmentId) {
        await sendDeleteRequest('http://localhost:8080/equipment/' + equipmentId)
        window.location.reload();
    }

    function onEquipmentInfoChanged(e) {
        const {name, value} = e.target;
        // Update the specific equipment's information
        setEquipments(
            equipments.map(equip =>
                equip.Id === equipment.Id
                    ? {...equip, [name]: value} // Update only the matching equipment
                    : equip
            )
        );
        const newEquipment = {...equipments.filter(equip => equip.Id === equipment.Id)[0], [name]: value};
        // Clear the previous debounce timer if the user types again
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new debounce timer to send GET request after 500ms
        const timer = setTimeout(() => {
            sendPutRequest('http://localhost:8080/equipment/' + equipment.Id, {
                "equipmentID": equipment.Id,
                "equipmentName": newEquipment.Name,
                "equipmentDescription": newEquipment.Description,
                "purchasePeriod": newEquipment.Warranty,
                "supplierID": newEquipment.SupplierId,
                "currentPrice": newEquipment.Price
            });
        }, 500); // Adjust delay as needed (500ms)
        setDebounceTimer(timer);
    }

    return <tr>
        <td>{equipment.Id}</td>
        <td><input onChange={onEquipmentInfoChanged} name="Name" className="equipmentAdmin_tableInput"
                   value={equipment.Name}/></td>
        <td><input type="number" onChange={onEquipmentInfoChanged} name="Price" className="equipmentAdmin_tableInput"
                   value={equipment.Price}/></td>
        <td><input onChange={onEquipmentInfoChanged} name="Description" className="equipmentAdmin_tableInput"
                   value={equipment.Description}/></td>
        <td><input type="number" onChange={onEquipmentInfoChanged} name="Warranty" className="equipmentAdmin_tableInput"
                   value={equipment.Warranty}/></td>
        <td><select onChange={onEquipmentInfoChanged} name="SupplierId" value={equipment.SupplierId} className="equipmentAdmin_tableInput">
            {suppliers.map((supplier) => <option key={supplier.Id} value={supplier.Id}>{supplier.Name}</option>
            )}
        </select>
        </td>
        <td>
            <button onClick={() => deleteEquipment(equipment.Id)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </td>
    </tr>

}