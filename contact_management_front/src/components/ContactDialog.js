import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const iniatlState = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    avatar: "",
    contact: null
}

class ContactDialog extends React.Component{

    constructor(props) {
        super(props);
        const contact = props.contact;
        this.state = {
            nombre: contact ? contact.nombre : "",
            apellido:contact ? contact.apellido : "",
            email: contact ? contact.email : "",
            telefono:contact ? contact.telefono : "",
            avatar:contact ? contact.avatar : "",
            error: false,
            message:"",
            contact
        };

        this.handleChange = this.handleChange.bind(this);
        this.validateData = this.validateData.bind(this);
        this.clearState = this.clearState.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    validateData(){
        const { nombre, apellido, email, telefono} = this.state;

        if (nombre === "" || nombre === undefined){

            this.setState({
                error : true,
                message : "Please add a name."
            });
            return true;
        }
        if ( apellido === "" || apellido === undefined ){
            this.setState({
                error : true,
                message : "Please add a last name."
            });
            return true;
        }
        if (email === "" || email === undefined){
            this.setState({
                error : true,
                message : "Please add a email."
            });
            return true;
        }
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            this.setState({
                error : true,
                message : "Please enter a valid email."
            });
            return true;

        }

        if (telefono === ""|| telefono === undefined){
            this.setState({
                error : true,
                message : "Please add a phone."
            });
            return true;
        }
        return false;
    }

    create() {
       if(!this.validateData()){
           const  {nombre, apellido, email, telefono, avatar} = this.state;
           this.props.addContact({nombre, apellido, email, telefono, avatar});
           this.clearState()
       }
    }

    update(){
        if (!this.validateData()){
            const  { nombre, apellido, email, telefono, avatar, contact } = this.state;
            this.props.updateContact({ nombre, apellido, email, telefono, avatar, contact });
            this.props.handleClose();
        }
    }

    clearState(){
        this.setState(iniatlState)
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            error: false
        });
    };



    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        this.setState({
            [name]: value
        })
    };

    render() {
        const {open, handleClose} = this.props;
        const {error, message} = this.state;
        return (
            <div>
                <Snackbar open={error} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Contact Form</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="nombre"
                            label="Name"
                            value={this.state.nombre}
                            onChange={this.handleChange}
                            required
                            fullWidth

                        />
                        <TextField
                            margin="dense"
                            id="apellido"
                            label="Last Name"
                            value={this.state.apellido}
                            onChange={this.handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="telefono"
                            label="Phone"
                            type="phone"
                            value={this.state.telefono}
                            onChange={this.handleChange}

                            required
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="avatar"
                            label="Avatar"
                            type="url"
                            value={this.state.avatar}
                            onChange={this.handleChange}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        { this.state.contact ?
                            <Button onClick={this.update} color="primary">
                                Update
                            </Button>
                            :
                            <Button onClick={this.create} color="primary">
                                Create
                            </Button>
                        }

                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default ContactDialog;