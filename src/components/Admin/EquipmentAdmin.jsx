import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import '/src/styles/Admin/EquipmentAdmin.css'
import {sendGetRequest} from "../../services/HTTP.js";

export default function EquipmentAdmin() {
    const [creatingForm, setCreatingForm] = useState(false);
    const [equipments, setEquipments] = useState([]);

    const toggleForm = () => {
        setCreatingForm((prevState) => !prevState);
    };

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
        setEquipments(newData)
    }

    useEffect(() => {
        getAllEquipment();
    }, []);


    useEffect(() => {
    }, [])
    return <>
        <div className={`manageForm ${creatingForm ? "show" : ""}`}>
            {["Supplier Name", "Contact Info", "Address Name"].map((label, idx) => (
                <div key={idx} className="manage_inputGroup">
                    <label>{label}</label>
                    <input/>
                </div>))}
        </div>
        {/* First Table Section */}
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
            <tr>
                <td>1</td>
                <td>Toshiba Việt Name</td>
                <td>ToshibaVn@gmail.com</td>
                <td>Bình Thạnh HCM</td>
                <td>
                    <button>Edit</button>
                    <button>Remove</button>
                </td>
            </tr>
            <tr>
                <td className="equipmentAdmin_addEquipmentButton" colSpan="5">
                    <FontAwesomeIcon className="equipmentAdmin_addEquipmentButton_icon" icon={faPlus}/>
                </td>
            </tr>
            </tbody>
        </table>

        {/* Second Table Section */}
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Warranty</th>
                <th>Supplier</th>
            </tr>
            </thead>
            <tbody>
            {equipments.map((equipment) => (
                <Equipment equipment={equipment} equipments={equipments} setEquipments={setEquipments}/>))}
            <tr>
                <td className="equipmentAdmin_addEquipmentButton" colSpan="6">
                    <FontAwesomeIcon className="equipmentAdmin_addEquipmentButton_icon" icon={faPlus}/>
                </td>
            </tr>

            </tbody>
        </table>
    </>
}

function Equipment({equipment, equipments, setEquipments}) {
    function onEquipmentInfoChanged(e) {
        const { name, value } = e.target;
        const {debounceTimer, setDebounceTimer} = useState(null);

        // Update the specific equipment's information
        setEquipments(
            equipments.map(equip =>
                equip.Id === equipment.Id
                    ? { ...equip, [name]: value } // Update only the matching equipment
                    : equip
            )
        );

        // Clear the previous debounce timer if the user types again
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new debounce timer to send GET request after 500ms
    //     const timer = setTimeout(() => {
    //         sendGetRequest(); // Send GET request after typing stops
    //     }, 500); // Adjust delay as needed (500ms)
    //
    //     setDebounceTimer(timer);
    }

    return <tr>
        <td><input onChange={onEquipmentInfoChanged} name="Id" className="equipmentAdmin_tableInput" value={equipment.Id}/></td>
        <td><input onChange={onEquipmentInfoChanged} name="Name" className="equipmentAdmin_tableInput" value={equipment.Name}/></td>
        <td><input onChange={onEquipmentInfoChanged} name="Price" className="equipmentAdmin_tableInput" value={equipment.Price}/></td>
        <td><input onChange={onEquipmentInfoChanged} name="Description" className="equipmentAdmin_tableInput" value={equipment.Description}/></td>
        <td><input onChange={onEquipmentInfoChanged} name="Warranty" className="equipmentAdmin_tableInput" value={equipment.Warranty}/></td>
        <td><input onChange={onEquipmentInfoChanged} name="Supplier" className="equipmentAdmin_tableInput" value={equipment.Supplier}/></td>
    </tr>

}