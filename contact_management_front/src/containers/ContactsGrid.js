import React from 'react';
import Grid from '@material-ui/core/Grid';
import ContactCard from '../components/ContactCard';
import Box from '@material-ui/core/Box';
import AddButton from "../components/AddButton";
import ContactDialog from "../components/ContactDialog";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReloadButton from '../components/ReloadButton';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const contactUrl = 'http://localhost:4000/api/contacts';

const useStyles = theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    }
});


class ContactsGrid extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            open: false,
            contacts: [],
            error: false,
            message:"",
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.refreshPage = this.refreshPage.bind(this);

    }

    componentDidMount() {
        axios.get(contactUrl)
            .then(res => {
                const contacts = res.data.data;

                this.setState({contacts: contacts});
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    message:"Failed to connect to server.",
                    error: true
                })
            })

    }


    handleClickOpen() {
        this.setState({open: true})
    };

    handleClose() {
        this.setState({open: false})
    };

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            error: false
        });
    };

    refreshPage() {
        window.location.reload(false);
    }

    addContact(contact) {

        axios.post(contactUrl, contact)
            .then(res => {
                const new_contact = res.data.data;
                const contacts = this.state.contacts;
                contacts.push(new_contact);
                this.setState(contacts)
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({
                        error: true,
                        message: error.response.data.message
                    });
                }
                else if (error.request) {
                    this.setState({
                        error: true,
                        message: "Failed to connect to server."
                    });
                }
                else{
                    this.setState({
                        error: true,
                        message: error.message
                    });
                }
            });
        this.handleClose()
    }

    deleteContact(index) {
        const contact = this.state.contacts[index];
        axios.delete(contactUrl + "/" + contact.id).then(res => {
            const contacts = this.state.contacts;
            if (index !== -1) {
                contacts.splice(index, 1);
                this.setState(contacts);
            }
        })
            .catch((error) => {
                console.log(error)
                this.setState({
                    error: true,
                    message: "Ups! An error ocurred."
                });
            })

    }

    updateContact(data) {

        const {contact} = data
        const {nombre, apellido, email, telefono, avatar} = data;
        console.log()
        axios.put(contactUrl + "/" + contact.id, {
            nombre, apellido, email, telefono, avatar
        }).then(res => {
            console.log("Actualizado")
            const contact = res.data.data;
            this.setState(prevState => ({
                contacts: prevState.contacts.map(el => el.id === contact.id ? contact : el)
            }))
        })
            .catch((error) => {

                if (error.response) {
                    this.setState({
                        error: true,
                        message: error.response.data.message
                    });
                }
                else if (error.request) {
                    this.setState({
                        error: true,
                        message: "Failed to connect to server."
                    });
                }
                else{
                    this.setState({
                        error: true,
                        message: error.message
                    });
                }
            });
        this.handleClose();
    }

    render() {
        const {classes} = this.props;

        return (

            <Box mx="auto" bgcolor="background.paper" p={1}>
                <div>
                    { this.state.contacts.length > 0 ?
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={3}>
                                {this.state.contacts.map((contact, index) => (

                                    < Grid item xs={4}>
                                        <ContactCard contact={contact} deleteContact={this.deleteContact}
                                                     updateContact={this.updateContact} index={index} children={index}/>
                                    </Grid>

                                ))}
                            </Grid>

                        </Grid> :

                        <h1>You don't have contacts yet</h1>
                    }

                </div>
                <div className={classes.absolute}>
                    <div onClick={this.refreshPage}>
                        <ReloadButton/>
                    </div>
                    <div onClick={this.handleClickOpen}>
                        <AddButton/>
                    </div>
                </div>



                <ContactDialog open={this.state.open} handleClose={this.handleClose} addContact={this.addContact}/>
                <Snackbar open={this.state.error} autoHideDuration={6000} onClose={this.handleSnackClose}>
                    <Alert onClose={this.handleSnackClose} severity="error">
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </Box>


        );
    }
}

ContactsGrid.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles) (ContactsGrid);
