import React from "react"
import {List} from "@mui/material";
import RJTodoItem from "./RJTodoItem";


const RJTodos = (todos) => {

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {todos.todos?.map(item => {
                return (
                    <RJTodoItem key={item.id} item={item}/>
                )
            })}
        </List>
    )
}
export default RJTodos;