import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    }
}));

export default function AddButton() {
    const classes = useStyles();

    return (
        <div>
            <Tooltip title="Agregar Contacto" aria-label="add">
                <Fab color="primary">
                    <AddIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}