import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "./Context";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


function Home() {
  const url = 'https://todoo.5xcamp.us/todos';
  const { token } = useAuth();
  const [todos, setTodos]= useState([]);
  const [value,setValue] = useState(""); // todo input
  const [tabState,setTabState] = useState("all"); // tab state

  const headers = {
    Authorization: token
  }
  
  useEffect(()=>{
    getTodo();
  },[]);


  function getTodo(){
    axios.get(url, {headers}).then((res)=>{
      setTodos(res.data.todos);
    }).catch(err=>{
      return MySwal.fire({
        icon: 'error',
        title: '取得失敗',
      })
    })
  }

  function addTodo(e){
    e.preventDefault();
    if(value.trim() === "") {
      setValue('');
      document.getElementById("todoInput").focus();

      return MySwal.fire({
        icon: 'error',
        title: '不可為空白',
      });
    };

    const todo = {
      content: value.trim(),
    }
    
    axios.post(url,{todo},{headers}).then((res)=>{
      getTodo();
      setValue('');
      document.getElementById("todoInput").focus();
    }).catch((err)=>{
      return MySwal.fire({
        icon: 'error',
        title: '新增失敗',
      })
    });
  }

  function removeTodo(e, todo){
    e.preventDefault();
    setTodos(todos.filter(item=>item !== todo));
  }

  function removeCompletedAll(e){
    e.preventDefault();
    setTodos(todos.filter(item=>!item.completed));
  }

  // toggle todo completed
  function toggleTodo(todo){
    todo.completed = !todo.completed;
    setTodos([...todos]);
  }

  // change tab state
  function changeTab(e, state){
    e.preventDefault();
    setTabState(state);
  }

  // TodoItem 元件
  function TodoItem(props){
    const {todo} = props;
    return (
      <li>
        <label className="todoList_label">
          <input
            className="todoList_input"
            type="checkbox"
            value="true"
            defaultChecked={todo.completed}
            onChange={()=>toggleTodo(todo)}
          />
          <span>{todo.content}</span>
        </label>
        <a href="#" onClick={(e)=>removeTodo(e, todo)}>
          <i className="fa fa-times"></i>
        </a>
      </li>
    )
  }

  const todoListRender = () => {
    // todo 有值
    if(todos.length){
      let todolist = [];

      if (tabState === 'all') {
        // 全部
        todolist = todos.map((item, i)=>{
          return <TodoItem key={i} todo={item} />
        })
      } else if(tabState === 'undone') {
        // 待完成
        todolist = todos.filter(item=>!item.completed).map((item, i)=>{
          return <TodoItem key={i} todo={item} />
        })
      } else {
        // 已完成
        todolist = todos.filter(item=>item.completed).map((item, i)=>{
          return <TodoItem key={i} todo={item} />
        })
      }

      return todolist
    } 
    
    // todo 無值
    return <li className="text-danger fw-bold">目前尚無代辦事項</li>
  }

  

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>
            <a href="#">ONLINE TODO LIST</a>
          </h1>
          <ul>
            <li className="todo_sm">
              <a href="#">
                <span>王小明的代辦</span>
              </a>
            </li>
            <li>
              <a href="#">登出</a>
            </li>
          </ul>
        </nav>
        <div className="container todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input id="todoInput" value={value} onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder="請輸入待辦事項" />
              <a href="#" onClick={addTodo}>
                <i className="fa fa-plus"></i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                  <li><a href="#" className={tabState === 'all'? 'active':''} onClick={(e)=>changeTab(e,'all')}>全部</a></li>
                  <li><a href="#" className={tabState === 'undone'? 'active':''} onClick={(e)=>changeTab(e,'undone')}>待完成</a></li>
                  <li><a href="#" className={tabState === 'completed'? 'active':''} onClick={(e)=>changeTab(e,'completed')}>已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  { todoListRender() }
                </ul>
                <div className="todoList_statistics">
                  <p> {todos.filter(i=>!i.completed).length} 個待完成項目</p>
                  <a href="#" onClick={removeCompletedAll}>清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;