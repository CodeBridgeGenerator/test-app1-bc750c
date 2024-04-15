
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const PromptsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
     
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.sessionid}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.chataiid}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.configid}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.prompt}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.refDocs}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.responseText}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.systemId}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.type}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.role}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.model}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.stopReason}</p>
    const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.stopSequence}</p>
    const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.inputTokens}</p>
    const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.outputTokens}</p>
    const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.cost}</p>
    const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
    const pTemplate16 = (rowData, { rowIndex }) => <p >{rowData.error}</p>

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
            <Column field="sessionid" header="Sessionid" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="chataiid" header="Chataiid" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="configid" header="Configid" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="prompt" header="Prompt" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="refDocs" header="Ref Docs" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="responseText" header="Response Text" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="systemId" header="System Id" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="type" header="Type" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="role" header="Role" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="model" header="Model" body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="stopReason" header="Stop Reason" body={pTemplate10} style={{ minWidth: "8rem" }} />
            <Column field="stopSequence" header="Stop Sequence" body={pTemplate11} style={{ minWidth: "8rem" }} />
            <Column field="inputTokens" header="Input Tokens" body={pTemplate12} style={{ minWidth: "8rem" }} />
            <Column field="outputTokens" header="Output Tokens" body={pTemplate13} style={{ minWidth: "8rem" }} />
            <Column field="cost" header="Cost" body={pTemplate14} style={{ minWidth: "8rem" }} />
            <Column field="status" header="Status" body={pTemplate15} style={{ minWidth: "8rem" }} />
            <Column field="error" header="Error" body={pTemplate16} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />
            <Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />
            <Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default PromptsDataTable;