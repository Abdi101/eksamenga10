import { useEffect ,useState } from 'react';
import Switch from './Switch';
const CreateUserModal = (props) => {
    const initialValues = {email: "", isAdmin: false,  password: ""};
    const [formData, setFormData] = useState(initialValues);
    const [validForm, setValidForm] = useState(true);  

    useEffect(() => {
        if(props.data){
            setFormData(props.data);
        }
    }, []);

    const handleSave = () => {
        let filledFields = 0;
        for (var key in formData) {
            if(formData[key].length > 0){

                filledFields++;
            }
        }
        if(filledFields>=2){
            props.closeModal(false);
            props.onClick(formData);
        }
        else{
            setValidForm(false);
        }

    }

    return (
    <>    
        <div className="EditBeanModal">

            <div className="mainModalBody neumorphism-card">
                <h1>{props.title}</h1>
                <div>
                <div className="formField">
                    <label htmlFor="email">email</label>
                    <input className="modalInput" type="string" id="email" name="email" value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} 
                    />
                </div>

                <div className="formField">
                    <label htmlFor="password">password</label>
                    <input className="modalInput" type="password" id="password" name="password" value={formData.password}
                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} 
                    />
                </div>

                <div className="formField">
                    <Switch isToggled={formData.isAdmin} onToggle={() => {setFormData({ ...formData, isAdmin: !formData.isAdmin })}}/>
                </div>

                <button className="edit modalButton" onClick={handleSave}>confirm</button>
                <button className="cancel modalButton" onClick={() => props.closeModal(false)}>cancel</button>
                {!validForm && <p style={{color: "red", fontSize: "1.5rem", float: "right"}}>All fields must be filled out</p>}
            </div>
            </div>
        </div>
    </>
    )
}

CreateUserModal.defaultProps = {
    onClick: () => {}
}

export default CreateUserModal;