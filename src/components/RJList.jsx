import React, {useCallback, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid, Stack, TextField,
    Typography
} from "@mui/material";

import RJTodos from "../components/RJTodos";
import {useForm} from "react-hook-form";

const RJList = ({list, onDelete}) => {

    const {register, handleSubmit, reset} = useForm();
    const onSubmit = data => submitTodo(data.newTodo);

    const [todos, setTodos] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitTodo = async (body) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                body: body,
                "done": false,
                "listId": list.id
            })
        };

        // Speichert die neue Aufgabe in die Datenbank
        await fetch('http://localhost:3030/lists/' + list.id + '/todos', requestOptions)

        // Lädt alle Aufgaben für diese Liste
        loadTodos()

        // Setzt das Eingabefeld zurück
        reset()
    };


    const loadTodos = () => {
        if (!todos || !todos[0]) {
            // Setzt "Laden" auf true - Text wird dem Benutzer angezeigt
            setLoading(true)
        } else {
            // Setzt "Laden" auf false
            setLoading(false)
        }
        // Lädt alle Aufgaben für diese Liste
        getTodos()
    }

    const getTodos = useCallback(
        async () => {
            const response = await fetch("http://localhost:3030/lists/" + list.id + "/todos")

            // Ruft Listen aus der Datenbank ab
            const json = await response.json();

            // Speichert die Listen in die lists variable
            setTodos(json);

            // Setzt "Laden" auf false
            setLoading(false)
        }, [list]
    );

    return (
        <Grid item xs={12} md={4} id={"list" + list.id}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {list.title}
                    </Typography>
                    <Stack direction="row" spacing={2} id={"stack" + list.id}>

                        {/* Knopf zum Laden der Todo Aufgaben */}
                        <Button variant="outlined" onClick={loadTodos}>
                            Laden
                        </Button>

                        {/* Knopf zum Löschen der Liste */}
                        <Button variant="outlined" color="error" onClick={() => {
                            if (onDelete) {
                                onDelete()
                            }
                        }}>Löschen
                        </Button>
                    </Stack>
                    <Typography variant="subtitle1" component="div">
                        {/* Wenn "Laden" auf true gesetzt ist wird dieser Text dem Benutzer angezeigt */}
                        {loading ? "Lade Todos..." : ""}
                    </Typography>

                    {/* Lade liste mit Todos */}
                    <RJTodos todos={todos}/>

                    {/* Eingabefeld um eine neue Aufgabe innerhalb der Liste zu erstellen */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Neue Aufgabe erstellen" variant="standard" {...register("newTodo")} required/>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )
}
export default RJList;