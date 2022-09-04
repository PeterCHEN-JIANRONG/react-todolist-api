import { Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import constraint from '../services/formRule';
import { useAuth } from "./Context";


const MySwal = withReactContent(Swal);

function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const url = 'https://todoo.5xcamp.us/users/sign_in';

  const onSubmit = (data) => {
      axios.post(url, {user:data}).then(res=>{
        setToken(res.headers.authorization);
        navigate('/');
    }).catch(err=>{
      MySwal.fire({
        icon: 'error',
        title: err.response.data.message? err.response.data.message:'登入失敗',
      });
    })
  };
  // console.log(errors);

  return (
    <>
      <div id="loginPage" className="bg-yellow">
        <div className="container loginPage vhContainer ">
          <div className="side">
            <Link to="/"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></Link>
            <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" id="email" placeholder="請輸入 email" {...register("email", constraint.email)} />
              <span>{errors.email?.message}</span>
              <label className="formControls_label" htmlFor="password">密碼</label>
              <input className="formControls_input" type="password" id="password" placeholder="請輸入密碼" {...register("password", constraint.password)} />
              <span>{errors.password?.message}</span>
              <input className="formControls_btnSubmit" type="submit" value="登入" />
              <Link className="formControls_btnLink" to="/signup">註冊帳號</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;