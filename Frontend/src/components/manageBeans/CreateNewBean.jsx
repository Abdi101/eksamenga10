import { useEffect ,useState } from 'react';
import EditBeanModal from './EditBeanModal';

const CreateNewBean = (props) => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [modalVisible,setModalVisible] = useState(false);

    const editModalTitle = "Create new bean";

    useEffect(() => {
    }, []);

       const handleEdit = (formData) => {
            console.log(formData);
            props.create(formData);
        }

    return (
    <>
     <div className="beanWrapper">
        {isAdmin === true && 
        <>
        <div className="beanInfo" style={{width: "100%"}}>
        <p className="beanName">Create new bean</p>
        </div>
        <div className="beanButtonWrapper">
        <button style={{fontWeight: "bold", marginBottom: "0"}} className="beanButton edit" onClick={() => {setModalVisible(true)}}>+</button>
        {/*<button className="beanButton delete">delete</button>*/}
        {modalVisible && <EditBeanModal closeModal={setModalVisible} onClick={handleEdit} title={editModalTitle}/>}
        </div>
        </>
        }
    </div>
    </>
    )
}

CreateNewBean.defaultProps = {
    onClick: () => {}
}

export default CreateNewBean;
