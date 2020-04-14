import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: '#eaeff1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(50),
            height: theme.spacing(60),
        },

    },
    input: {
        margin: '20px 0',
        '& > *': {
            margin: theme.spacing(2.5),
            width: '25ch',
        },
    },
    top_section: {
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}));

export default function Login(props) {
    const classes = useStyles();

    const [users, setUsers] = useState({ username: '', password: '' });

    const handleChange = e => {
        setUsers({
            ...users,
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        axiosWithAuth()
            .post('/auth/login', users)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.users_id);
                localStorage.setItem('name', res.data.name)
                props.history.push(`/dashboard/${res.data.users_id}`);
            })
            .catch(err => {
                alert("There's been a problem with your login, please check your details and try again.")
                console.log(err)
            })
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <div className={classes.top_section}>
                    <Typography variant="h4" align="center">
                        1M Ventilators
                    </Typography>
                    <Typography variant="body2" align="center" style={{ color: "#808080", fontWeight: "600" }}>
                        Ventilator Registry Sing In
                    </Typography>
                </div>
                <Divider variant="middle" />
                <form className={classes.input}>
                    <TextField
                        id="filled-username"
                        variant="filled"
                        name="username"
                        label="Username"
                        onChange={handleChange}
                        value={users.username} />
                    <TextField
                        id="filled-password"
                        variant="filled"
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        value={users.password} />
                    <Button variant="contained" color="primary" size="large" onClick={() => login()}>
                        Sign In
                    </Button>
                </form>
                <Typography variant="body2" align="center" style={{ color: "#808080", fontWeight: "600" }}>
                    Don't have an account?&nbsp;
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
}
