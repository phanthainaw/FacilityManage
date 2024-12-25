import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function StockAdmin() {
    const [creatingForm, setCreatingForm] = useState(false);

    const toggleForm = () => {
        setCreatingForm((prevState) => !prevState);
    };
    return <>
        <div className={`manageForm ${creatingForm ? "show" : ""}`}>
            {["Supplier Name", "Contact Info", "Address Name"].map((label, idx) => (
                <div key={idx} className="manage_inputGroup">
                    <label>{label}</label>
                    <input/>
                </div>))}
        </div>
        <h1>Stock</h1>

        {/* Create Button */}
        <button onClick={toggleForm} className="manage_createFormButton">
            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faPlus}/>
            <p>Create</p>
        </button>

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