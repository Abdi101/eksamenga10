import { useEffect ,useState } from 'react';
import EditBeanModal from './EditBeanModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const SingleBean = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [delModalVisible,setDelModalVisible] = useState(false);
    const newData = props.data;
    useEffect(() => {
        setIsAdmin(props.isAdmin);
    }, []);

        const handleEdit = (formData) => {
            props.onClick(formData);
        }

        const handleDelete = () => {
            props.delete(props.data._id);
        }

    return (
    <>
    {newData && <div className="beanWrapper">
        <div className="beanInfo">
        <p className="beanName">{newData.name}</p>
        <span><b>Brand: </b><br/>{newData.brand}</span>
        <span><b>Country: </b><br/>{newData.countryOfOrigin}</span>
        <span><b>Price: </b><br/>{newData.price} NOK</span>
        <span><b>roast profile: </b><br/>{newData.roastProfile}</span>
        <span><b>roast type: </b><br/>{newData.roastType}</span>
        <span className="beanDesc"><b>Description: </b><br/>{newData.description}</span>
        </div>
        {isAdmin === "true" && 
        <>
        <div className="beanButtonWrapper">
        <button className="beanButton edit" onClick={() => {setModalVisible(true)}}>edit</button>
        <button className="delete beanButton" onClick={() => {setDelModalVisible(true)}}>delete</button>
        {/*<button className="beanButton delete">delete</button>*/}
        {modalVisible && <EditBeanModal closeModal={setModalVisible} data={newData} onClick={handleEdit}/>}
        {delModalVisible && <ConfirmDeleteModal closeModal={setDelModalVisible} deleteBeans={handleDelete}/>}
        </div>
        </>
        }
    </div>}
    </>
    )
}

SingleBean.defaultProps = {
    onClick: () => {}
}

export default SingleBean;
