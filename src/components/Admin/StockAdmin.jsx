import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {sendDeleteRequest, sendGetRequest, sendPutRequest} from "../../services/HTTP.js";
import '/src/styles/Admin/StockAdmin.css'

export default function StockAdmin() {
    const [departments, setDepartments] = useState([]);
    const [purchasedEquipmentsByDepartment, setPurchasedEquipmentsByDepartment] = useState([]);
    const [targetPurchasedEquipments, setTargetPurchasedEquipments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const departmentsData = await getAllDepartments();
            await getAllPurchasedEquipments(departmentsData); // Ensure this runs after departments are fetched
        }
        fetchData();
    }, []); // Only run once when the component mounts

    async function getAllDepartments() {
        const data = await sendGetRequest('http://localhost:8080/admin/departments');
        const formattedDepartments = data.map(department => ({
            Id: department.departmentID,
            Name: department.departmentName,
            Budget: department.budget,
        }));
        setDepartments(formattedDepartments);
        return formattedDepartments;
    }

    async function viewPurchasedEquipmentByDeparment(departmentId) {
        setTargetPurchasedEquipments(purchasedEquipmentsByDepartment.filter(department => department.Id===departmentId)[0].equipments);
    }

    async function getAllPurchasedEquipments(departments) {
        const purchasedData = [];
        for (const department of departments) {
            const data = await sendGetRequest(
                `http://localhost:8080/requests/purchasedEquipment/department/${department.Id}`
            );
            purchasedData.push({ Id: department.Id, Name: department.Name, Budget: department.Budget , equipments: data });
        }

        setPurchasedEquipmentsByDepartment(purchasedData);

    }
    return <>
        <div className="stockAdmin_departmentContainer">
            {purchasedEquipmentsByDepartment.map((department) => (
                    <div onClick={()=> viewPurchasedEquipmentByDeparment(department.Id)} key={department.Id} className="stockAdmin_departmentBox">
                        <p>{department.Name}</p>
                        <input value={department.Budget} />
                    </div>
                ))}
        </div>

        {/* First Table Section */}
        <p>Phòng Quản Lý</p>
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Purchased Price</th>
                <th>Description</th>
                <th>Warranty</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Purchased Date</th>
            </tr>
            </thead>
            <tbody>
            {targetPurchasedEquipments.map((equipment) => (<Equipment key={equipment.id} equipment={equipment} />))}
            </tbody>
        </table>
    </>
}

function Equipment( {equipment} ) {
    return <>
        <tr>
            <td>{equipment.equipment.equipmentID}</td>
            <td>{equipment.equipment.equipmentName}</td>
            <td>{equipment.purchasePrice}</td>
            <td>{equipment.equipment.equipmentDescription}</td>
            <td>{equipment.equipment.purchasePeriod}</td>
            <td>{equipment.equipment.supplier.supplierName}</td>
            <td>{equipment.quantity}</td>
            <td>{new Date(equipment.purchaseDate).toLocaleString('en-GB', {
                month: 'short',    // Short month format (e.g., Dec)
                day: '2-digit',    // Day with leading zero (e.g., 25)
                hour: '2-digit',   // Hour with leading zero
                minute: '2-digit', // Minute with leading zero
                hour12: false      // 24-hour format
            })}</td>
        </tr>
    </>

}