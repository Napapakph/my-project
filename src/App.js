import "./App.css";
import Transection from "./components/Transection";
import FormsComponent from "./components/FormsComponent";
import { useState ,useEffect} from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router, Routes,Route,Link} from "react-router-dom";

function App() {

  const [items, setItem] = useState([]); // ภายใน useState คือการอัพเดตค่าที่เป็นรูปแบบ Array เหมือน initData
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItem = (newItem) => {
    // newItem ไว้รับข้อมูลจาก FormComponent
    setItem((prevItem) => {
      return [newItem, ...prevItem]; // รูปแบบคำสั่งที่ให้ค่าใหม่มาอยู่หน้าค่าเก่า
    });
  };
  useEffect(()=>{
    //filter() ใช้เพื่อ เลือกค่า ที่ตรงกับเงื่อนไขที่กำหนดจาก array และคืนค่า array ใหม่ ที่มีเฉพาะ ค่าที่ตรงกับเงื่อนไข.
    /*
    reduce() ใช้สำหรับ ลดทอน หรือ รวม ค่าใน array ให้กลายเป็น ค่าเดียว. ทำงานโดยการใช้ callback function ที่รับ 2 พารามิเตอร์หลัก:
              total: คือค่าที่สะสมจากการวนลูปครั้งก่อน (เริ่มต้นเป็นค่าเริ่มต้นที่ส่งเข้ามา).
              element: คือค่าของ element ที่อยู่ใน array ในรอบปัจจุบัน.
    */
    const amounts = items.map(items=>items.amount) // amount ถูกเก็บใน Array amounts
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0) // income เป็น Array ที่เก็บข้อมูลรายได้ 
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1 // expense เป็น Array ที่เก็บข้อมูลรายจ่าย
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense])


 return (
  <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="contrainer">
        <h1 style={{color:"red",textAlign:"center",fontSize:"1.8rem"}}>
          แอพบัญชีรายรับ - รายจ่าย
        </h1>
        <Router>
        <div>
          <ul className="horizontal-menu">
            <li>
                <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Routes>
              <Route path="/" element={<ReportComponent />} ></Route>
              <Route path="/insert" element={
                <>
                <FormsComponent onAddItem={onAddNewItem} />
                <Transection items={items} /> {/* การ prop ข้อมูลส่งไปให้ Transection*/} 
                </>
              }></Route>
          </Routes>
        </div>
        </Router>
      
      </div>
  </DataContext.Provider>
     
  );
}

export default App;
