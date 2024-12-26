import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import '/src/styles/Admin/EmployeeAdmin.css'
import {sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest} from "../../services/HTTP.js";

export default function EmployeeAdmin() {
    const [creatingForm, setCreatingForm] = useState(false);

    const toggleForm = () => {
        setCreatingForm((prevState) => !prevState);
    };

    const [targetEmployee, setTargetEmployee] = useState(
        {
            Id: 0,
            Name: '',
            Phone: '',
            Email: '',
            Department: '',
            Position: '',
            Password: '',
        }
    );

    const [newEmployee, setNewEmployee] = useState({
        "empId": 0,
        "fullName": "",
        "email": "",
        "phoneNumber": 0,
        "password": "",
        "position": "",
        "departmentName": "Phòng Quản Lý"
    })

    const [departments, setDepartments] = useState([]);

    const [employees, setEmployees] = useState([]);

    async function getAllEmployees() {
        const data = await sendGetRequest('http://localhost:8080/employees/getall')
        setEmployees(data.map((employee) => ({
            Id: employee.employeeID,
            Name: employee.fullName,
            Phone: employee.phoneNumber,
            Email: employee.email,
            Department: employee.department.departmentName,
            Position: employee.position,
            Password: employee.password,
        })));
    }

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

    useEffect(() => {
        getAllEmployees();
        getAllDepartments()
    }, [])
    const [debounceTimer, setDebounceTimer] = useState(null);

    function onTargetEmployeeChanged(e) {
        const {name, value} = e.target;
        console.log(name, value);
        // Update the specific equipment's information
        setEmployees(
            employees.map(employee =>
                employee.Id === targetEmployee.Id
                    ? {...employee, [name]: value} // Update only the matching equipment
                    : employee
            )
        );

        const newEmployee = {...employees.filter(supply => supply.Id === targetEmployee.Id)[0], [name]: value};
        setTargetEmployee(newEmployee);
        // Clear the previous debounce timer if the user types again
        console.log(newEmployee)
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set a new debounce timer to send GET request after 500ms
        const timer = setTimeout(() => {
            sendPutRequest('http://localhost:8080/employees/' + targetEmployee.Id, {
                "empId": targetEmployee.Id,
                "fullName": newEmployee.Name,
                "email": newEmployee.Email,
                "phoneNumber": newEmployee.Phone,
                "password": targetEmployee.Password,
                "position": newEmployee.Position,
                "departmentName": newEmployee.Department,
            });
        }, 1000); // Adjust delay as needed (500ms)
        setDebounceTimer(timer);
    }

    async function deleteSupplier() {
        await sendDeleteRequest('http://localhost:8080/admin/suppliers/' + supplier.Id);
        window.location.reload();

    }
    function onNewEmployeeChanged(e) {
        const {name, value} = e.target;
        setNewEmployee({...newEmployee, [name]: value});
        console.log(name, value);
    }

    async function createNewEmployee() {
        await sendPostRequest('http://localhost:8080/employees', newEmployee);
    }

    return <>
        <div className={`manageForm ${creatingForm ? "show" : ""}`}>
            <div className="manage_inputGroup">
                <label>Name</label>
                <input onChange={onNewEmployeeChanged} name="fullName" value={newEmployee.fullName}/>
            </div>
            <div className="manage_inputGroup">
                <label>Gmail</label>
                <input onChange={onNewEmployeeChanged} name="email" value={newEmployee.email}/>
            </div>
            <div className="manage_inputGroup">
                <label>Password</label>
                <input onChange={onNewEmployeeChanged} name="password" value={newEmployee.password}/>
            </div>
            <div className="manage_inputGroup">
                <label>Position</label>
                <input onChange={onNewEmployeeChanged} name="position" value={newEmployee.position}/>
            </div>
            <div className="manage_inputGroup">
                <select onChange={onNewEmployeeChanged} name="departmentName" defaultValue={newEmployee.departmentName}>
                    {departments.map((department) => <option key={department.Name}
                                                             value={department.Name}>{department.Name}</option>
                    )}
                </select>
            </div>
            <button onClick={createNewEmployee} style={{height: "30px", borderRadius: "10px"}}>Create Account</button>
        </div>


        {/* Create Button */}
        <button onClick={toggleForm} className="manage_createFormButton">
            <FontAwesomeIcon style={{fontSize: "30px"}} icon={faPlus}/>
            <p>Create</p>
        </button>
        <div className="employeeAdmin_container">
            {targetEmployee.Id !== 0 ? <div className="employeeAdmin_employeeInfo">
                <img className="userAvatar"
                     src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt=""/>
                <div className="manage_inputGroup">
                    <label>Id</label>
                    <p>{targetEmployee.Id}</p>
                </div>
                <div className="employeAdmin_inputGroup">
                    <label>Name</label>
                    <input onChange={onTargetEmployeeChanged} value={targetEmployee.Name}
                           className="equipmentAdmin_tableInput" name="Name"/>
                </div>
                <div className="employeAdmin_inputGroup">
                    <label>Phone</label>
                    <input type="number" onChange={onTargetEmployeeChanged} value={targetEmployee.Phone}
                           className="equipmentAdmin_tableInput" name="Phone"/>
                </div>
                <div className="employeAdmin_inputGroup">
                    <label>Email</label>
                    <input onChange={onTargetEmployeeChanged} value={targetEmployee.Email}
                           className="equipmentAdmin_tableInput" name="Email"/>
                </div>
                <div className="employeAdmin_inputGroup">
                    <label>Department</label>
                    <select onChange={onTargetEmployeeChanged} name="Department" value={targetEmployee.Department}
                            className="equipmentAdmin_tableInput">
                        {departments.map((department) => <option key={department.Name}
                                                             value={department.Name}>{department.Name}</option>
                        )}
                    </select>
                </div>
                <div className="employeAdmin_inputGroup">
                    <label>Position</label>
                    <input onChange={onTargetEmployeeChanged} value={targetEmployee.Position}
                           className="equipmentAdmin_tableInput" name="Position"/>
                </div>
            </div> : <div></div>
            }
            {/* First Table Section */}
            <table style={{marginTop: "0px"}}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <Employee key={employee.id} setTargetEmployee={setTargetEmployee} employee={employee}/>))}
                </tbody>
            </table>

        </div>
    </>
}
function Employee({employee, setTargetEmployee}) {
    async function deleteEmployee(employeeId) {
        await sendDeleteRequest('http://localhost:8080/employees/' + employeeId);
        window.location.reload();
    }
    return <tr onClick={() => {
        setTargetEmployee(employee)
    }}>
        <td>{employee.Id}</td>
        <td>{employee.Name}</td>
        <td>{employee.Phone}</td>
        <td>{employee.Email}</td>
        <td>{employee.Department}</td>
        <td>{employee.Position}</td>
        <td>
            <button onClick={()=>deleteEmployee(employee.Id)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </td>
    </tr>

}