import React,{useState, useEffect} from 'react';
import styles from './css/App.module.css';
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';
import { BrowserRouter as Router, Routes, Route, Link }  from 'react-router-dom';
import TodosYet from './TodosYet';
import TodosDone from './TodosDone';

interface todoItem {
  todoText : string,
}
// todos의 타입들
interface todosArray {
  id : number,
  todoText : string,
  isChecked : boolean,
  isEditing : boolean
}

function App() {
  // const [todo, setTodo] = useState<todoItem>({
  //   todoText : ''
  // });

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<todosArray[]>([]);

  //앱이 처음 시작할때 localStroage에 있는 정보들을 todos에 넣어줌
  useEffect(() => {
    for(let i=0;i<localStorage.length;i++){
      if(localStorage.getItem(String(i)) == null){
        continue;
      }

      const newTodoObj = JSON.parse(String(localStorage.getItem(String(i))));
      console.log(newTodoObj);

      setTodos((prev : any[]) => {
        return [
          ...prev,
          {...newTodoObj}
        ]
      })

    }
  }, [])

  const onChange = (e : React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTodo(value);
    return value;
  }

  return(
    <>
      <Router>
        <div className={styles.todo_container}>
          <TodoHeader todo_header_change={onChange} todo={todo} setTodo={setTodo} setTodos={setTodos} todos={todos} />
            <div className={styles.todo_navi_container} >
              <Link to="/" className={styles.menu} >모두보기</Link>
              <Link to="/todosYet" className={styles.menu} >할일들</Link>
              <Link to="/todosDone" className={styles.menu} >끝낸것들</Link>
            </div>
            <div className={styles.todos_body_container}>
              <Routes>
                <Route path='/' element={<TodoBody setTodos={setTodos} todos={todos}/>} />
                <Route path='/todosYet' element={<TodosYet setTodos={setTodos} todos={todos}/>} />
                <Route path='/todosDone' element={<TodosDone setTodos={setTodos} todos={todos}/>} />
              </Routes>
            </div>
        </div>
      </Router>
    </>
  );
}

export default App;
