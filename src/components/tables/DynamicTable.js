import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function DynamicTable() {

    const [vents, setVents] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('/vents')
            .then(res => {
                setVents(res.data.vents)
            })
            .catch(err => console.log(err))

    }, [])

    const columns = ["Hospital", "Brand", "Model", "Quantity"];

    const data = vents.map(vent => {
        return [`${vent.name}`, `${vent.brand}`, `${vent.model}`, vent.quantity]
    })

    const options = {
        responsive: "scroll",
        selectableRows: "none"

    };

    return (
        <div>
            {vents.length === 0 ? (
                <div>
                    <div style={{ margin: '20px 0' }}>No Ventilators in Dashboard</div>
                </div>
            ) : (
                    <MUIDataTable
                        data={data}
                        columns={columns}
                        options={options}
                    />
                )}
        </div>
    );
};
