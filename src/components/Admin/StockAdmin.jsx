import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {sendGetRequest} from "../../services/HTTP.js";

export default function StockAdmin() {
    useEffect(()=>{
        getAllPurchasedEquipments()
    })
    async function getAllPurchasedEquipments() {
        const data = sendGetRequest('http://localhost:8080/purchasedEquipment');
        console.log(data);
    }

    return <>

        {/* First Table Section */}
        <table>
            <thead>
            <tr>
                <th>No</th>
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
            </tbody>
        </table>

        {/* Second Table Section */}
        <table>
            <thead>
            <tr>
                <th>No</th>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
                <th>Column 5</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Data A</td>
                <td>Data B</td>
                <td>Data C</td>
                <td>Data D</td>
                <td>Data E</td>
            </tr>
            </tbody>
        </table>
    </>
}