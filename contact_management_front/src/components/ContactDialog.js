import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ContactDialog extends React.Component{

    constructor(props) {
        super(props);
        const contact = props.contact;
        this.state = {
            name: contact ? contact.name : "",
            last_name:contact ? contact.last_name : "",
            email: contact ? contact.email : "",
            phone:contact ? contact.phone : "",
            avatar:contact ? contact.avatar : "",
            contact
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        console.log(target)
        this.setState({
            [name]: value
        })
    };

    render() {
        const {open, handleClose} = this.props;
        return (
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Contact Form</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="last_name"
                            label="Last Name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
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
                            <Button onClick={handleClose} color="primary">
                                Update
                            </Button>
                            :
                            <Button onClick={handleClose} color="primary">
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