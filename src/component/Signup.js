import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const url = 'https://todoo.5xcamp.us/users';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    const {nickname, password, passwordCheck} = data;
    if(nickname.trim() ===''){
      console.log('姓名不可空白')
      return
    }
    if(password.trim() ==='' || passwordCheck.trim() === ''){
      console.log('密碼不可空白')
      return
    }
    if(password !== passwordCheck){
      console.log('密碼不一致')
      return
    }

    axios.post(url, {user:data}).then(res=>{
      console.log(res.data);
      console.log(res.data.message);
    }).catch(err=>{
      console.log(err.response.data.message);
      console.log(err.response.data.error[0]?err.response.data.error[0]:'');
    })
    

  };
  console.log(errors);

  // form constraint 約束條件
  const constraint = {
    email: {
      required: { 
        value: true,
        message: "此欄位必填寫"
      },
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "不符合 Email 規則"
      },
    },
    name:{
      required: { 
        value: true,
        message: "此欄位必填寫"
      },
    },
    password:{
      required: { 
        value: true,
        message: "此欄位必填寫"
      },
      minLength:{
        value: 6,
        message: "密碼至少 6 位數"
      }  
    }
  }

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