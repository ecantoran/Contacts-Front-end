import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    }
}));

export default function ReloadButton() {
    const classes = useStyles();

    return (
        <div>
            <Tooltip title="Reload" aria-label="add">
                <Fab>
                    <CachedIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}