import React from 'react';

interface todosArray {
    id : number,
    todoText : string,
    isChecked : boolean,
    isEditing : boolean,
}

// 부모(App.tsx)에서 props로 받는 element들 타입 지정
interface TodoHeaderProps {
    todo_header_change : (e : React.FormEvent<HTMLInputElement>) => String,
    setTodo : React.Dispatch<React.SetStateAction<string>>;
    todo : string,
    setTodos : React.Dispatch<React.SetStateAction<todosArray[]>>;
    todos : Array<todosArray>
}

const TodoHeader = ({ todo_header_change, setTodo, todo, setTodos, todos} : TodoHeaderProps) => {
    const todosLen = todos.length;
    let max = 0;
    for(let i=0;i<todos.length;i++){
        if(max > todos[i].id){
            max = todos[i].id
        }
    }


    const writeTodo = (e : React.FormEvent) => {
        e.preventDefault();

        setTodos((prev: Array<todosArray>) => {
            return [
                ...prev,
                {
                    id : todosLen,
                    todoText : todo,
                    isChecked : false,
                    isEditing : false,
                }
            ]
        })

        for(let i=0;i<todos.length;i++){
            localStorage.setItem(String(i), JSON.stringify(todos[i]));
        }

        setTodo('');
    }
    
    return(
        <>
            <form onSubmit={writeTodo}>
                <input type="text" value={todo} onChange={todo_header_change} />
                <button type="submit">submit</button>
            </form>
        </>
    );

}

export default TodoHeader;