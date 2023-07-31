import classess from "./style.module.css"
import { useRef } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { Creds } from "./creds"
const Login = () => {
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        const loginPayload = {
            username: username.current.value,
            password: password.current.value
        }


        let userInfo = Creds.filter((account) => account.username === loginPayload.username && account.password === loginPayload.password)
        if (userInfo.length === 0) {
            Swal.fire({
                icon: "error",
                text: "User not found"
            })
        }
        else {
            let { username, userGroup } = userInfo[0]
            let successApiPayload = {
                status: 200,
                message: "Login Successful...",
                data: {
                    username,
                    userGroup
                }
            }
            const { message, data } = successApiPayload
            Swal.fire({
                icon: "success",
                text: message
            })
            navigate("/task-manager", { state: { ...data } })
            //console.log("...",loginPayload)
        }



    }
    return <div className={classess.mainContainer}>

        <div className={classess.formHolder}>
            <h1 className={classess.title}>
                FunFox Task Manager
            </h1>
            <form onSubmit={submitHandler} >
                <div className={classess.inputHolder}>
                    <label>Username: </label>
                    <input type="text" name="username" placeholder="Enter username" ref={username} required />
                </div>

                <div className={classess.inputHolder}>
                    <label>Password: </label>
                    <input type="password" name="password" placeholder="Enter Password" ref={password} required />
                </div>

                <div className={classess.inputHolder}>

                    <input type="submit" name="submit" value="Login" className={classess.submitButton} />
                </div>

            </form>
        </div>

    </div>
}

export default Login