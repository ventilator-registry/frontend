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
            height: theme.spacing(60),
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

export default function Login(props) {
    const classes = useStyles();

    const [users, setUsers] = useState({ username: '', password: '' });

    const [errors, setErrors] = useState({ username: '', password: '' });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        username: yup
            .string()
            .required("Username is required."),
        password: yup
            .string()
            // .min(6, "Passwords must be at least 6 characters long.")
            .required("Password is required.")
    });

    useEffect(() => {
        formSchema.isValid(users).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [users, formSchema]);


    const login = () => {
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

    const usernameErr = errors.username.length > 0;
    const passErr = errors.password.length > 0;

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
                    {/* {errors.username.length > 0 ? (<Typography className={classes.error} color='error'>{errors.username}</Typography>) : null} */}
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
                    {/* {errors.password.length > 6 ? (<Typography className={classes.error} color='error'>{errors.password}</Typography>) : null} */}
                    <Button disabled={buttonDisabled} variant="contained" color="primary" size="large" onClick={() => login()}>
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
