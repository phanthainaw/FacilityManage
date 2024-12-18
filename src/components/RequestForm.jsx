import '../styles/RequestForm.css'
import React, { useState } from 'react';


function RequestForm() {
    const [requestList, setRequestList] = useState([
        {
            Name: 'Macbook',
            Quantity: 2,
            Description: "Sử dụng để edit video, làm đồ họa, có bluetooth",
            Reason: "Cung cấp thiết bị cho nhân viên mới"
        },
        {
            Name: 'Dell Monitor',
            Quantity: 5,
            Description: "Màn hình 24-inch Full HD, hỗ trợ kết nối HDMI và VGA",
            Reason: "Hỗ trợ công việc của nhóm thiết kế"
        },
        {
            Name: 'Logitech Keyboard',
            Quantity: 10,
            Description: "Bàn phím không dây, kết nối Bluetooth, tích hợp pin sạc",
            Reason: "Thay thế bàn phím cũ trong văn phòng"
        },
        {
            Name: 'Office Chairs',
            Quantity: 15,
            Description: "Ghế xoay công thái học, hỗ trợ lưng và cổ",
            Reason: "Trang bị nội thất cho văn phòng mới"
        },
        {
            Name: 'External Hard Drive',
            Quantity: 7,
            Description: "Ổ cứng di động 2TB, USB 3.0, hỗ trợ tốc độ truyền tải cao",
            Reason: "Lưu trữ dữ liệu dự án lớn và backup định kỳ"
        },
        {
            Name: 'Projector',
            Quantity: 1,
            Description: "Máy chiếu 4K, hỗ trợ kết nối không dây",
            Reason: "Phục vụ họp và thuyết trình trong phòng hội nghị"
        },
        {
            Name: 'Graphic Tablet',
            Quantity: 3,
            Description: "Bảng vẽ kỹ thuật số với bút cảm ứng, độ nhạy cao",
            Reason: "Hỗ trợ công việc sáng tạo của nhóm thiết kế đồ họa"
        },
        {
            Name: 'Smartphone',
            Quantity: 4,
            Description: "Điện thoại thông minh Android, hỗ trợ công việc từ xa",
            Reason: "Cung cấp cho nhân viên thực hiện công việc ngoài hiện trường"
        }
    ]
    )
    const [deviceData, setDeviceData] = useState({
        Name: '',
        Description: '',
        Quantity: 0,
        AquisitionReason: ''
    }
    )

    function emptyDeviceData(){
        setDeviceData({
            Name: '',
            Description: '',
            Quantity: 0,
            AquisitionReason: ''
        })
    }

    function addRequest() {
        if (!([deviceData.Name, deviceData.Description, deviceData.AquisitionReason].includes('') | deviceData.Quantity <= 0)) {
            setRequestList([...requestList, deviceData])
        } else alert("All fields must be filled and Quantity must greater or equal zero")
        emptyDeviceData()
    }

    const inputChange = (e) => {
        const { name, value } = e.target
        setDeviceData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }
    const deleteRequest = (e) => {
        setRequestList(requestList.filter((_, i) => i !== parseInt(e.target.id)))   
    }

    const editRequest = (e) => {
        setDeviceData(structuredClone(requestList[parseInt(e.target.id)]));
        setRequestList(requestList.filter((_, i) => i !== parseInt(e.target.id)))
    }

    return (
        <div className='requestForm'>
            <div className='requestList'>
                <table className='requestTable'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Số lượng</th>
                            <th style={{ backgroundColor: '#b1b1b1', width: '100px' }} ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestList.map((request, index) =>
                            <tr key={index} className='requestRow'>
                                <td>{index + 1}</td>
                                <td>{request.Name}</td>
                                <td>{request.Quantity}</td>
                                <td style={{ textAlign: "center" }}>
                                    <div className='actions'>
                                        <button id={index} onClick={editRequest}>sửa</button>
                                        <button id={index} onClick={deleteRequest}>xóa</button>
                                    </div>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button>send</button>
            <p>Tên thiết bị</p>
            <input name='Name' className='inputName' value={deviceData.Name} onChange={inputChange} type="text" />
            <p>Mô tả</p>
            <input name='Description' className='inputDescription' value={deviceData.Description} onChange={inputChange} type="text" />
            <p>Số lượng</p>
            <input name='Quantity' className='inputQuantity' value={deviceData.Quantity} onChange={inputChange} type="number" />
            <p>Lí do</p>
            <input name='AquisitionReason' className='inputAquisitionReason' value={deviceData.AquisitionReason} onChange={inputChange} type="text" />
            <div></div>
            <button onClick={addRequest} >Add</button>
        </div>
    )

}

export default RequestForm