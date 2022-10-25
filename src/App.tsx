import React,{useState, useEffect} from 'react';
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';

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
      <br />
      <hr />
      <TodoHeader todo_header_change={onChange} todo={todo} setTodo={setTodo} setTodos={setTodos} todos={todos} />
      <TodoBody setTodos={setTodos} todos={todos} />
    </>
  );
}

export default App;
