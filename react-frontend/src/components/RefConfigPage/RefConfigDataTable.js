
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const RefConfigDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
     
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.name}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.description}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.bedrockModelId}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.name1}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.human}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.task}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.noCondition}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.yesCondition}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.format}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.example}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.preamble}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
    const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);
    const pCreatedBy = (rowData, { rowIndex }) => (
        <p>{rowData.createdBy?.name}</p>
    );
    const pUpdatedBy = (rowData, { rowIndex }) => (<p>{rowData.updatedBy?.name}</p>);
    const paginatorLeft = (<Button type="button" icon="pi pi-refresh" text onClick={() => setRefresh("")}/>);
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={() => exportCSV()}/>;
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <DataTable value={items} ref={dt} onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer">
            <Column field="name" header="Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="description" header="Description" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="bedrockModelId" header="Bedrock Model Id" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="name1" header="Name 1" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="human" header="Human" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="task" header="Task" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="noCondition" header="No Condition" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="yesCondition" header="Yes Condition" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="format" header="Format" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="example" header="Example" body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="preamble" header="Preamble" body={pTemplate10} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />
            <Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />
            <Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default RefConfigDataTable;