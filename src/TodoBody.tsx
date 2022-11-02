import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

interface todosArray {
    id : number,
    todoText : string,
    isChecked : boolean,
    isEditing : boolean,
}

interface TodoBodyType {
    todos : todosArray[],
    setTodos : React.Dispatch<React.SetStateAction<todosArray[]>>,
    setCurrentPage : React.Dispatch<React.SetStateAction<string>>,
}

const TodoBody = ({ todos, setTodos, setCurrentPage } : TodoBodyType) => {
    const [newText, setNewText] = useState('');

    setCurrentPage('all');

    //checkbox를 체크하면 lineThrough
    const onCheckChange = (e : React.FormEvent<HTMLInputElement>, id : number) => {    
        const newTodos : Array<todosArray> = [...todos];
        newTodos.map((element) => {
            return element.id === id ? element.isChecked = !element.isChecked : element
        })
        setTodos(newTodos);
    }

    
    //delete버튼을 눌럿을때 삭제하는 기능(localStroage가 깔끔하게 안지워져서 다 삭제하고 다시 넣는 방법으로...)
    const onDelBtn = (id : number) => {
        console.log(id);
        const newTodos : Array<todosArray> = todos.filter((element) => {
            return element.id !== id
        })
        // console.log(newTodos);
        setTodos(newTodos);

        localStorage.clear();
        for(let i=0;i<newTodos.length;i++){
            localStorage.setItem(String(i), JSON.stringify(newTodos[i]));
        }
    }

    // update버튼을 눌렀을때 span -> input으로 변환
    const onUpdateBtn = (element : any) => {
        isEditingToggle(element);
        setNewText(element.todoText);
    }

    // input에서 입력하고 저장(input -> span)
    const onCompleteBtn = (element: any) => {
        isEditingToggle(element);
        const newTodos = [...todos];
        newTodos.map((e) => {
            // console.log('e.id ', e.id, ' element.id ' + element.id);
            return element.id === e.id ? e.todoText = newText : e 
        })
        setTodos(newTodos);

        localStorage.setItem(element.id, JSON.stringify(element));
    }

    // todos의 요소 중에 isEditing을 toggle
    const isEditingToggle = (element : any) => {
        const newTodos = [...todos];
        newTodos.map((e) => {
            return element.id === e.id ? e.isEditing = !e.isEditing : e 
        })
        setTodos(newTodos);
    }

    const onChangeNewText = (e : React.FormEvent<HTMLInputElement>) => {
        setNewText(e.currentTarget.value);
    }

    return(
        <>
            {todos.map((element, index) => {
                return (
                    <div key={index}>
                        <input type="checkbox" checked={element.isChecked} onChange={(event) => onCheckChange(event, element.id)} />
                        {element.isEditing ? (
                            <input type="text" style={ element.isChecked ? { textDecoration:'line-through' } : {} } value={newText} onChange={onChangeNewText}/>

                        ) : (
                            <span style={ element.isChecked ? { textDecoration:'line-through' } : {} } >{element.todoText}</span>
                        )}
                        <div className="btns">
                            <input type="button" id="deleteBtn" onClick={() => onDelBtn(element.id)} />
                            <label htmlFor='deleteBtn' style={{ padding : "10px" }} ><FontAwesomeIcon icon={faTrash} /></label>
                            {element.isEditing ? 
                            (
                                <>
                                    <input type="button" id="completeBtn" onClick={() => onCompleteBtn(element)} />
                                    <label htmlFor='completeBtn' style={{ padding : "10px" }} ><FontAwesomeIcon icon={faPen} /></label>
                                </>
                            ) : (
                                <>
                                    <input type="button" id='updateBtn' onClick={() => onUpdateBtn(element)} /> 
                                    <label htmlFor='updateBtn' style={{ padding : "10px" }} ><FontAwesomeIcon icon={faPen} /></label>
                                </>
                            )
                            }
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default TodoBody;