import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
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
            height: theme.spacing(70),
        },

    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0',
        '& > *': {
            margin: theme.spacing(1.5),
            width: '30ch',
        },
    },
    top_section: {
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textField: {
        '& p': {
            marginLeft: 0,
            marginRight: 0,
        }
    }
}));

export default function Signup(props) {
    const classes = useStyles();

    const [users, setUsers] = useState({
        username: '',
        password: '',
        name: ''
    });

    const [errors, setErrors] = useState({ username: '', password: '', name: '' });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        username: yup
            .string()
            .required("Username is required."),
        password: yup
            .string()
            .min(6, "Passwords must be at least 6 characters long.")
            .required("Password is required."),
        name: yup
            .string()
            .required("Name is required.")
    });

    useEffect(() => {
        formSchema.isValid(users).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [users, formSchema]);

    const handleChange = e => {
        e.persist();

        yup
            .reach(formSchema, e.target.name)
            //we can then run validate using the value
            .validate(e.target.value)
            // if the validation is successful, we can clear the error message
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            /* if the validation is unsuccessful, we can set the error message to the message 
              returned from yup (that we created in our schema) */
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });

        setUsers({
            ...users,
            [e.target.name]: e.target.value
        })
    }

    const signup = () => {
        axiosWithAuth()
            .post('/auth/register', users)
            .then(res => {
                alert("You've registered successfully.")
                props.history.push('/')
            })
            .catch(err => {
                alert("There's been a problem with your registration.")
                console.log(err)
            })
    }

    const usernameErr = errors.username.length > 0;
    const passErr = errors.password.length > 0;
    const nameErr = errors.name.length > 0;

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <div className={classes.top_section}>
                    <Typography variant="h4" align="center">
                        1M Ventilators
                    </Typography>
                    <Typography variant="body2" align="center" style={{ color: "#808080", fontWeight: "600" }}>
                        Sing Up for Ventilator Registry
                    </Typography>
                </div>
                <Divider variant="middle" />
                <form className={classes.form}>
                    <TextField
                        className={classes.textField}
                        id="filled-username"
                        variant="filled"
                        name="username"
                        label="Username *"
                        onChange={handleChange}
                        value={users.username}
                        helperText={usernameErr ? `${errors.username}` : " "}
                        error={usernameErr}
                    />
                    <TextField
                        className={classes.textField}
                        id="filled-password"
                        variant="filled"
                        name="password"
                        label="Password *"
                        type="password"
                        onChange={handleChange}
                        value={users.password}
                        helperText={passErr ? `${errors.password}` : " "}
                        error={passErr}
                    />
                    <TextField
                        className={classes.textField}
                        id="filled-name"
                        variant="filled"
                        name="name"
                        label="Name *"
                        onChange={handleChange}
                        value={users.name}
                        helperText={nameErr ? `${errors.name}` : " "}
                        error={nameErr}
                    />
                    <Button disabled={buttonDisabled} variant="contained" color="primary" size="large" onClick={() => signup()}>
                        Sign Up
                    </Button>
                </form>
                <Typography variant="body2" align="center" style={{ color: "#808080", fontWeight: "600" }}>
                    Already have an account?&nbsp;
                    <Link to="/">
                        Login
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
}