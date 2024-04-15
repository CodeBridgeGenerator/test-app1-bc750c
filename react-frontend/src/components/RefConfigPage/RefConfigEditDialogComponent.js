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

const RefConfigCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
            description: _entity?.description,
            bedrockModelId: _entity?.bedrockModelId,
            name1: _entity?.name1,
            human: _entity?.human,
            task: _entity?.task,
            noCondition: _entity?.noCondition,
            yesCondition: _entity?.yesCondition,
            format: _entity?.format,
            example: _entity?.example,
            preamble: _entity?.preamble,
        };

        setLoading(true);
        try {
            
        const result = await client.service("refConfig").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info refConfig updated successfully" });
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
            <div role="refConfig-edit-dialog-component">
                <div>
                <p className="m-0">Name:</p>
                <InputText className="w-full mb-3" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Description:</p>
                <InputText className="w-full mb-3" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Bedrock Model Id:</p>
                <InputText className="w-full mb-3" value={_entity?.bedrockModelId} onChange={(e) => setValByKey("bedrockModelId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Name 1:</p>
                <InputText className="w-full mb-3" value={_entity?.name1} onChange={(e) => setValByKey("name1", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Human:</p>
                <InputText className="w-full mb-3" value={_entity?.human} onChange={(e) => setValByKey("human", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Task:</p>
                <InputText className="w-full mb-3" value={_entity?.task} onChange={(e) => setValByKey("task", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">No Condition:</p>
                <InputText className="w-full mb-3" value={_entity?.noCondition} onChange={(e) => setValByKey("noCondition", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Yes Condition:</p>
                <InputText className="w-full mb-3" value={_entity?.yesCondition} onChange={(e) => setValByKey("yesCondition", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Format:</p>
                <InputText className="w-full mb-3" value={_entity?.format} onChange={(e) => setValByKey("format", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Example:</p>
                <InputText className="w-full mb-3" value={_entity?.example} onChange={(e) => setValByKey("example", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Preamble:</p>
                <InputText className="w-full mb-3" value={_entity?.preamble} onChange={(e) => setValByKey("preamble", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(RefConfigCreateDialogComponent);
