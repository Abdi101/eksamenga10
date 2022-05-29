import { useEffect ,useState } from 'react';

const EditBeanModal = (props) => {
    const [beanData, setBeanData] = useState("");
    const initialValues = {name: "", brand: "", countryOfOrigin: "", price: "", roastProfile: "", roastType: "", description: ""};
    const [formData, setFormData] = useState(initialValues);
    const [validForm, setValidForm] = useState(true);    
    useEffect(() => {
        if(props.data){
            setBeanData(props.data);
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
        if(filledFields>=7){
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
                <div className="formField">
                    <label htmlFor="name">Name</label>
                    <input className="modalInput" type="string" id="name" name="name" value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} />
                </div>

                <div className="formField">
                    <label htmlFor="brand">Brand</label>
                    <input className="modalInput" type="string" id="brand" name="brand" value={formData.brand}
                    onChange={(e) => { setFormData({ ...formData, brand: e.target.value }) }} />
                </div>

                <div className="formField">
                    <label htmlFor="countryOfOrigin">Country of origin</label>
                    <input className="modalInput" type="string" id="countryOfOrigin" name="countryOfOrigin" value={formData.countryOfOrigin}
                    onChange={(e) => { setFormData({ ...formData, countryOfOrigin: e.target.value }) }} />
                </div>

                <div className="formField">
                    <label htmlFor="price">Price</label>
                    <input className="modalInput" type="number" id="price" name="price" value={formData.price}
                    onChange={(e) => { setFormData({ ...formData, price: e.target.value }) }} />
                </div>

                <div className="formField">
                    <label htmlFor="roastProfile">Roast profile</label>
                    <input className="modalInput" type="string" id="roastProfile" name="roastProfile" value={formData.roastProfile}
                    onChange={(e) => { setFormData({ ...formData, roastProfile: e.target.value }) }} />
                </div>

                <div className="formField">
                    <label htmlFor="roastType">Roast type</label>
                    <input className="modalInput" type="string" id="roastType" name="roastType" value={formData.roastType}
                    onChange={(e) => { setFormData({ ...formData, roastType: e.target.value }) }} />
                </div>

                <div className="formField">
                    <label htmlFor="description">Description</label>
                    <textarea  className="modalInput" id="description" name="description" value={formData.description}
                    onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} />
                </div>

                <button className="edit modalButton" onClick={handleSave}>confirm</button>
                <button className="cancel modalButton" onClick={() => props.closeModal(false)}>cancel</button>
                {!validForm && <p style={{color: "red", fontSize: "1.5rem", float: "right"}}>All fields must be filled out</p>}
            </div>
        </div>
    </>
    )
}

EditBeanModal.defaultProps = {
    onClick: () => {}
}

export default EditBeanModal;
