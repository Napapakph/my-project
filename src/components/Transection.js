import Item from "./Item";
import './Transection.css'

const Transection =(props)=>{ // กำหนด prop ไว้รับข้อมูลเข้ามาจาก App 
  const {items} = props

    return (
     <div>
       <ul className = "item-list">
          {items.map((element) => { // ข้อมูลที่ถูก prop นำมา map ต่อ
            return <Item {...element} key={element.id}/>
          })}
      </ul>
     </div>
      
    ); //value คือค่าที่มาจาก Provider
  
  } 
  export default Transection;