import Navbar from "../Navbar.jsx";
import "/src/styles/Admin/Manage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RequestAdmin from "./RequestAdmin.jsx";
import EquipmentAdmin from "./EquipmentAdmin.jsx";
import StockAdmin from "./StockAdmin.jsx";
import EmployeeAdmin from "./EmployeeAdmin.jsx";

function ManageAdmin() {
    const [tabState, setTabState] = useState('Request')

    return (
        <div>
            <Navbar />
            <div className="manageContainer">
                <div className="manageBody">
                    {/* Navigation Tabs */}
                    <div className="manageTab">
                        {["Request", "Equipment & Supplier", "Stock", "Employee"].map(
                            (tab, index) => (
                                <button key={index} onClick={()=>{setTabState(tab)}} className="changeManageTabButton">
                                    {tab}
                                </button>
                            )
                        )}
                    </div>

                    {/* Main Pane */}

                    <div className="managePane">
                        { tabState === "Request" && <RequestAdmin /> }
                        { tabState === "Equipment & Supplier" && <EquipmentAdmin /> }
                        { tabState === "Stock" && <StockAdmin /> }
                        { tabState === "Employee" && <EmployeeAdmin /> }


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageAdmin;
