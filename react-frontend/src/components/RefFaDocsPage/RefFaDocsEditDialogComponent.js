import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
import { InputText } from 'primereact/inputtext';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const RefFaDocsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            filename: _entity?.filename,
            bankId: _entity?.bankId,
            facilityid: _entity?.facilityid,
            startDate: _entity?.startDate,
            endDate: _entity?.endDate,
            version: _entity?.version,
            s3Link: _entity?.s3Link,
        };

        setLoading(true);
        try {
            
        const result = await client.service("refFaDocs").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info refFaDocs updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options

    

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="refFaDocs-edit-dialog-component">
                <div>
                <p className="m-0">Filename:</p>
                <InputText className="w-full mb-3" value={_entity?.filename} onChange={(e) => setValByKey("filename", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Bank Id:</p>
                <InputText className="w-full mb-3" value={_entity?.bankId} onChange={(e) => setValByKey("bankId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Facilityid:</p>
                <InputText className="w-full mb-3" value={_entity?.facilityid} onChange={(e) => setValByKey("facilityid", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Start Date:</p>
                <InputText className="w-full mb-3" value={_entity?.startDate} onChange={(e) => setValByKey("startDate", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">End Date:</p>
                <InputText className="w-full mb-3" value={_entity?.endDate} onChange={(e) => setValByKey("endDate", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Version:</p>
                <InputText className="w-full mb-3" value={_entity?.version} onChange={(e) => setValByKey("version", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">S3 Link:</p>
                <InputText className="w-full mb-3" value={_entity?.s3Link} onChange={(e) => setValByKey("s3Link", e.target.value)}  />
            </div>
                <div><p className="m-0">createdAt:{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div><p className="m-0">lastUpdatedAt:{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div><p className="m-0">createdBy:{" " +_entity?.createdBy?.name}</p></div>
                <div><p className="m-0">lastUpdatedBy:{" " +_entity?.updatedBy?.name}</p></div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(RefFaDocsCreateDialogComponent);
