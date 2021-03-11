import React from 'react';
import Grid from '@material-ui/core/Grid';
import ContactCard from '../components/ContactCard';
import Box from '@material-ui/core/Box';
import AddButton from "../components/AddButton";
import ContactDialog from "../components/ContactDialog";


export default class ContactsGrid extends React.Component{
    constructor(props) {
        super(props);
        const contacts = [];
        for (let i = 0; i < 10; i++) {
            contacts.push({
                id: i,
                name: "Jonh",
                last_name: "Doe",
                email: i +"@contact.com",
                phone: "5555555"+i,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80",
                craeted_at: "Today"
            });
        }
        this.state = {
            open: false,
            contacts
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);


    }
    handleClickOpen () {
        this.setState({open: true})
    };
    handleClose()  {
        this.setState({open: false})
    };
    addContact(){
        const contacts = this.state.contacts;
        let id = contacts.length;
        contacts.push({
            id: id,
            name: "Jonh",
            last_name: "Doe",
            email: id +"@contact.com",
            phone: "5555555"+ id,
            avatar: "https://www.bnl.gov/today/body_pics/2017/06/stephanhruszkewycz-hr.jpg",
            craeted_at: "Today"
        })
        this.setState(contacts);
    }
    deleteContact(index){
        const contacts = this.state.contacts;
        if (index !== -1){
            contacts.splice(index, 1);
            this.setState(contacts);
        }
    }

    render() {

        return (

            <Box mx="auto" bgcolor="background.paper" p={1}>
                <div >
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            { this.state.contacts.map((contact, index) =>(

                                < Grid item xs={4}>
                                    <ContactCard contact={contact} deleteContact={this.deleteContact} index={index} children={index}/>
                                </Grid>

                            ))}
                        </Grid>

                    </Grid>
                </div>
                <div onClick={this.handleClickOpen}>
                    <AddButton/>
                </div>

                <ContactDialog open={this.state.open} handleClose={this.handleClose}/>
            </Box>


        );
    }
}
