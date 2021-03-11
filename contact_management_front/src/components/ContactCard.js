import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import ContactDialog from './ContactDialog'

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
});

class ContactCard extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }
    handleClickOpen () {
        this.setState({open: true})
    };
    handleClose()  {
        this.setState({open: false})
    };

    render() {
        const { classes, contact, deleteContact, index } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={contact.avatar} />
                            </ButtonBase>
                        </Grid>

                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {contact.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {contact.phone}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {contact.email}
                                    </Typography>
                                </Grid>
                                <Grid item container spacing={2}>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteContact(index)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<EditIcon/>}
                                        onClick={this.handleClickOpen}
                                    >
                                        Edit
                                    </Button>

                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{contact.created_at}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <ContactDialog open={this.state.open} handleClose={this.handleClose} contact={contact}/>
            </div>
        );
    }


}
ContactCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles) (ContactCard);