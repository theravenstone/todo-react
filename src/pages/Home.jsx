import React, {useEffect, useState} from 'react';
import {Card, CardContent, Container, Grid, TextField, Typography} from '@mui/material';
import RJList from "../components/RJList";
import {useForm} from "react-hook-form";

const Home = () => {

    const {register, handleSubmit, reset} = useForm();
    const onSubmit = data => submitList(data.newList);
    const [lists, setLists] = useState(null);


    // Speichert die neue Liste in die Datenbank
    const submitList = async (title) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
            })
        };
        await fetch('http://localhost:3030/lists', requestOptions)

        // Aktualisiert die Listen
        getLists()

        // Setzt das Eingabefeld zurück
        reset()
    };

    const deleteList = async (listId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        };
        await fetch('http://localhost:3030/lists/' + listId, requestOptions)

        // Aktualisiert die Listen
        getLists()


    }

    const getLists = async () => {
        const response = await fetch(
            "http://localhost:3030/lists"
        );

        // Ruft Listen aus der Datenbank ab
        const json = await response.json();

        // Speichert die Listen in die lists variable
        setLists(json);
    };
    useEffect(() => {

        // Ruft Listen aus der Datenbank ab beim Seitenaufruf
        getLists()
    }, []);
    return (
        <Container>

            <Typography variant="h1" component="div">
                RJ TODO APP
            </Typography>

            <Grid container spacing={2}>

                {lists?.map(list => {
                    return (
                        <RJList onDelete={() => {
                            deleteList(list.id)
                        }} key={list.id} list={list}/>
                    )
                })}

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField label="Neue Liste erstellen" variant="standard" {...register("newList")}
                                           required/>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    );
}
export default Home;