import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ContactCard from '../components/ContactCard';
import Box from '@material-ui/core/Box';
import AddButton from "../components/AddButton";


export default class ContactsGrid extends React.Component{
    constructor(props) {
        super(props);
        const contacts = [];
        for (let i = 0; i < 10; i++) {
            contacts.push({
                name: "Jonh",
                last_name: "Doe"
            });
        }
        this.state = { contacts };
    }

    render() {
        return (

            <Box mx="auto" bgcolor="background.paper" p={1}>
                <div >
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            { this.state.contacts.map((contact, index) =>(

                                < Grid item xs={4}>
                                    <ContactCard contact={contact}/>
                                </Grid>

                            ))}
                        </Grid>

                    </Grid>
                </div>
                <AddButton/>
            </Box>


        );
    }
}
