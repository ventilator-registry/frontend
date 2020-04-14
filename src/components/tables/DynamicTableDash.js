import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import MUIDataTable from "mui-datatables";
import React from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function DynamicTableDash(props) {

    const deleteVent = (id) => {
        axiosWithAuth()
            .delete(`/vents/${id}`)
            .then(res => {
                console.log(res.data)
                props.deleteToggle();
            })
            .catch(err => console.log(err))
    }

    let history = useHistory();

    const updateVent = (id) => {
        history.push(`/update/${id}`)
    }

    const columns = ["Hospital", "Brand", "Model", "Quantity", {
        name: "Update", label: "Update", options: {
            filter: false
        }
    }, {
        name: "Delete", label: "Delete", options: {
            filter: false
        }
        }];

    const data = props.vents.map(vent => {
        return [
            `${vent.name}`, `${vent.brand}`, `${vent.model}`, vent.quantity,
            <div onClick={() => updateVent(vent.id)}><UpdateIcon /></div>,
            <div onClick={() => deleteVent(vent.id)}><DeleteIcon /></div>
        ]
    })

    const options = {
        responsive: "scroll",
        selectableRows: "none"

    };

    return (
        <div>
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
};