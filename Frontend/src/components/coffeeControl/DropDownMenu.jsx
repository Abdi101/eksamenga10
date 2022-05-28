import React from "react";

function DropDownMenu({items,updateBrew,brew}){
    return(
        <>
            <label className="control-label">
                <span>{items.option}</span>
                <select className="drop-down-menu" onChange={(e)=>updateBrew(
                    {[items.attribute]:e.target.value.split(',')[0], [items.beanName]:e.target.value.split(',')[1] || brew['typeOfCoffee']}
                    )}>
                    <option selected disabled>{items.placeholder}</option>
                    {items.list.map((item,index)=><option key={item['_id'] || index} value={[item['_id'] || item, item.name]}>{item.name || item}</option>)}
                </select>
            </label>
        </>
    )
}

export default DropDownMenu;