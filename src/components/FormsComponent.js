import "./FormComponent.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
const FormsComponent = (props) => {
 // console.log("render form component");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [forrmValid, setFormValid] = useState(0);

  const inputTitle = (event) => {
    setTitle(event.target.value);
  };
  const inputAmount = (event) => {
    setAmount(event.target.value);
  };
  const saveItem = (event) => {
    event.preventDefault();
    const itemData = {
      id: uuidv4(),
      title: title,
      amount: Number(amount), //กำหนดเป็น number เพราะเราเซ็ทไว้ว่าข้อมูลที่ใส่ต้องเป็น String กับ number ไม่งั้นมันจะเป็น String ทั้งคู่
    };
    props.onAddItem(itemData); // prop data ส่งค่าไปที่ App
    setTitle("");
    setAmount(0);
  };

  useEffect(() => { // ถูกเรียกใช้เมื่อมีการ re-render หน่้าต่าง
    const checkData = title.trim().length && amount !== 0; //ใช้ลบช่องว่างที่อยู่ ก่อนหน้าและหลังของ string โดยจะไม่ลบช่องว่างที่อยู่ภายใน String.
    setFormValid(checkData);
  }, [title, amount]);

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="form-control">
          <label>ชื่อรายการ </label>
          <input
            type="text"
            placeholder="ระบุชื่อรายการของคุณ"
            onChange={inputTitle}
            value={title}
          ></input>
        </div>
        <div className="form-control">
          <label>จำนวนเงิน </label>
          <input
            type="number"
            placeholder="(+ รายรับ , - รายจ่าย)"
            onChange={inputAmount}
            value={amount}
          ></input>
        </div>
        <div>
          <button type="submit" className="btn" disabled={!forrmValid}> {/*disabled เป็น Attribute ที่ใช้ปิดการใช้งาน หรือ ป้องกันไม่ให้ผู้ใช้โต้ตอบกับฟอร์มหรืออินพุต ของ HTML element เช่น ปุ่ม (button) */}
            เพิ่มข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormsComponent;
