import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import constraint from '../services/formRule';
import { useAuth } from "./Context";
const MySwal = withReactContent(Swal);


function Signup() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const url = 'https://todoo.5xcamp.us/users';

  const onSubmit = (data) => {
    // console.log(data)
    const {nickname, password, passwordCheck} = data;

    if(nickname.trim() ===''){
      return MySwal.fire({
        icon: 'error',
        title: '姓名不可空白',
      });
    }
    if(password.trim() ===''){
      return MySwal.fire({
        icon: 'error',
        title: '密碼不可空白',
      });
    }
    if(password !== passwordCheck){
      return MySwal.fire({
        icon: 'error',
        title: '密碼不一致',
      });
    }

    axios.post(url, {user:data}).then(res=>{
      setToken(res.headers.authorization);
      MySwal.fire({
        icon: 'success',
        title: res.data.message,
      });
      navigate('/');
    }).catch(err=>{
      MySwal.fire({
        icon: 'error',
        title: err.response.data.message? err.response.data.message:'註冊失敗',
        text: err.response.data.error[0]?err.response.data.error[0]:'',
      });
    })
  };
  // console.log(errors);



  return (
    <>
      <div id="signUpPage" className="bg-yellow">
        <div className="container signUpPage vhContainer">
          <div className="side">
            <Link to="/"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></Link>
            <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="formControls_txt">註冊帳號</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" id="email" placeholder="請輸入 email" {...register("email", constraint.email)} />
              <span>{errors.email?.message}</span>
              <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
              <input className="formControls_input" type="text" id="nickname" placeholder="請輸入您的暱稱" {...register("nickname", constraint.name)} />
              <span>{errors.nickname?.message}</span>
              <label className="formControls_label" htmlFor="password">密碼</label>
              <input className="formControls_input" type="password" id="password" placeholder="請輸入密碼" {...register("password", constraint.password)} />
              <span>{errors.password?.message}</span>
              <label className="formControls_label" htmlFor="passwordCheck">再次輸入密碼</label>
              <input className="formControls_input" type="password" id="passwordCheck" placeholder="請再次輸入密碼" {...register("passwordCheck", constraint.password)} />
              <span>{errors.passwordCheck?.message}</span>
              <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
              <Link className="formControls_btnLink" to="/login">登入</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;