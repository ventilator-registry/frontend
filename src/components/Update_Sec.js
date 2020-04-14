import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const styles = () => ({
    card: {
        maxWidth: 420,
        marginTop: 50
    },
    container: {
        backgroundColor: "#eaeff1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
    },
    actions: {
        float: "right"
    },
    post_header: {
        backgroundColor: "#009be5",
        color: "#fff",
        width: "100vw",
        height: "144px"
    },
    heading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "26px",
        fontWeight: "500",
        lineSpacing: "0.5px",
        height: "80%"
    },
    link: {
        display: "flex",
        marginLeft: "20px",
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "Roboto, sans-serif",
        cursor: "pointer"
    }
});

const initialState = {
    name: '',
    brand: '',
    model: '',
    quantity: ''
};

function Update_Sec(props) {
    const { classes } = props;

    const [values, setValues] = useState(initialState)
    const id = localStorage.getItem("id");

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const id = props.match.params.id;

        axiosWithAuth()
            .get(`/vents/${id}`)
            .then(res => {
                setValues(res.data.vents)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.match.params.id])

    const handleSubmit = () => {
        const id = props.match.params.id;
        const user_id = localStorage.getItem("id")

        axiosWithAuth()
            .put(`/vents/${id}`, values)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        props.history.push(`/dashboard/${user_id}`)
    }

    return (
        <div className={classes.container}>
            <div className={classes.post_header}>
                <div className={classes.heading}>
                    Add Your Ventilator Details
                    </div>
                <div className={classes.link} onClick={() => props.history.push(`/dashboard/${id}`)}>My Dashboard</div>
            </div>
            <form onSubmit={handleSubmit}>
                <Card className={classes.card}>
                    <CardContent>
                        <TextField
                            name="name"
                            label="Hospital Name"
                            value={values.name}
                            onChange={handleChange}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            name="brand"
                            label="Ventilator Brand"
                            value={values.brand}
                            onChange={handleChange}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            name="model"
                            label="Ventilator Model"
                            value={values.model}
                            onChange={handleChange}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            name="quantity"
                            label="Ventilator Quantity on Hand"
                            value={values.quantity}
                            onChange={handleChange}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button type="submit" color="primary" >
                            SUBMIT
                            </Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}
export default withStyles(styles)(Update_Sec);

