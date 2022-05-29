import { useEffect ,useState } from 'react';

const ConfirmDeleteModal = (props) => {

    const [modalVisible,setModalVisible] = useState(false);

    return (
    <>
        <div className="EditBeanModal">

            <div className="mainModalBody neumorphism-card">
            <h1>Warning:</h1>
            <p style={{fontSize: "2rem"}}>Are you sure you want do delete this bean?</p>
                <button className="edit modalButton">confirm</button>
                <button className="cancel modalButton" onClick={() => props.closeModal(false)}>cancel</button>
            </div>
        </div>
    </>
    )
}

ConfirmDeleteModal.defaultProps = {
    onClick: () => {}
}

export default ConfirmDeleteModal;
