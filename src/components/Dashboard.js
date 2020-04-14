import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import DynamicTableDash from './tables/DynamicTableDash';


const styles = (theme) => ({
    paper: {
        maxWidth: 1100,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    load: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
});


function Content(props) {
    const { classes } = props;

    const [ventilators, setVents] = useState([])
    const [delBool, setDelBool] = useState(true)

    let history = useHistory();

    const id = localStorage.getItem("id");

    const deleteToggle = () => {
        setDelBool(!delBool)
    }

    useEffect(() => {
        axiosWithAuth()
            .get(`/users/${id}/vents`)
            .then(res => {
                setVents(res.data)
            })
            .catch(err => console.log(err))
    }, [id, delBool])

    return (
        <Paper className={classes.paper}>

            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.addUser} onClick={() => history.push('/add_vent')}>
                                Add Ventilator
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {ventilators.length === 0 ? (
                <div>
                    <div style={{ margin: '20px 0' }}>No Ventilators in Dashboard</div>
                </div>
            ) : (
                    <DynamicTableDash vents={ventilators} deleteToggle={deleteToggle} />
                )}
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);