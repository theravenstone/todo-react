import React, {useState} from 'react';
import {Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

const RJTodoItem = (item) => {

    const [done, setDone] = useState(item.item.done);

    const handleToggle = (item) => () => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                done: !item.done
            })
        };
        fetch('http://localhost:3030/todos/' + item.id,
            requestOptions)
            .then(response => response.json());
        setDone(!done)
    };

    return (
        <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(item.item)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={done}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={item.item.body}/>
            </ListItemButton>
        </ListItem>
    )
}
export default RJTodoItem;