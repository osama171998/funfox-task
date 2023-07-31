import styles from "./style.module.css"
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";
const Header = (props) =>{
    const navigate = useNavigate();
 
    const handleLogOut = () =>{
            Swal.fire({
                icon:"success",
                text:"Logout Successfully...."
            })
            navigate("/")
    }
    return <div className={styles.headerHolder}>
            <div className={styles.title}>
                    {props.title}
            </div>
            <div className={styles.logout} onClick={handleLogOut}>
                        Logout
            </div>
    </div>
}
export default Header;