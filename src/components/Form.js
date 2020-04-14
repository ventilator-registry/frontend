import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";
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

const form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  const id = localStorage.getItem("id");

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
              id="name"
              label="Hospital Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="brand"
              label="Ventilator Brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.brand ? errors.brand : ""}
              error={touched.brand && Boolean(errors.brand)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="model"
              label="Ventilator Model"
              value={values.model}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.model ? errors.model : ""}
              error={touched.model && Boolean(errors.model)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="quantity"
              label="Ventilator Quantity on Hand"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.quantity ? errors.quantity : ""}
              error={touched.quantity && Boolean(errors.quantity)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    name,
    brand,
    model,
    quantity,
  }) => {
    return {
      name: name || "",
      brand: brand || "",
      model: model || "",
      quantity: quantity || "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Required"),
    brand: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    quantity: Yup.string().required("Please enter at least 1"),
  }),

  handleSubmit: (values, { props }) => {
    const id = localStorage.getItem("id");
    const postVent = { ...values, "user_id": id }
    axiosWithAuth()
      .post('/vents/', postVent)
      .then(res => {
        props.history.push(`/dashboard/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  }
})(form);

export default withStyles(styles)(Form);