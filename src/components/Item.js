import PropTypes from "prop-types"; // ES6
import "./Item.css"


const Item = (props) => {
  const { title, amount } = props;
  const status = amount<0 ? "expense":"income"
  const symbol = amount<0 ? "-":"+"
  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

  return (
    <ul>
      <li className={status}>
        {title} <span>{symbol}{formatNumber(Math.abs(amount)) }</span>

      </li>
    </ul>
  );
};

Item.propTypes = {
  // propTypes ตัวเล็ก เป็นส่วนของการเข้าไปที่ component item  เพื่อดึงเอา propoty แต่ละตัวมาว่าด้านในควรเป็นยังไง
  title: PropTypes.string.isRequired, // ตัวใหญ่ไป import การใช้งานมาอีกที
  amount: PropTypes.number.isRequired,
};
export default Item;
