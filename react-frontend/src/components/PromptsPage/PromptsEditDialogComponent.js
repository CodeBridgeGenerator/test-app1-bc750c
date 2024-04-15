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

const PromptsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            sessionid: _entity?.sessionid,
            chataiid: _entity?.chataiid,
            configid: _entity?.configid,
            prompt: _entity?.prompt,
            refDocs: _entity?.refDocs,
            responseText: _entity?.responseText,
            systemId: _entity?.systemId,
            type: _entity?.type,
            role: _entity?.role,
            model: _entity?.model,
            stopReason: _entity?.stopReason,
            stopSequence: _entity?.stopSequence,
            inputTokens: _entity?.inputTokens,
            outputTokens: _entity?.outputTokens,
            cost: _entity?.cost,
            status: _entity?.status,
            error: _entity?.error,
        };

        setLoading(true);
        try {
            
        const result = await client.service("prompts").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info prompts updated successfully" });
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
            <div role="prompts-edit-dialog-component">
                <div>
                <p className="m-0">Sessionid:</p>
                <InputText className="w-full mb-3" value={_entity?.sessionid} onChange={(e) => setValByKey("sessionid", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Chataiid:</p>
                <InputText className="w-full mb-3" value={_entity?.chataiid} onChange={(e) => setValByKey("chataiid", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Configid:</p>
                <InputText className="w-full mb-3" value={_entity?.configid} onChange={(e) => setValByKey("configid", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Prompt:</p>
                <InputText className="w-full mb-3" value={_entity?.prompt} onChange={(e) => setValByKey("prompt", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Ref Docs:</p>
                <InputText className="w-full mb-3" value={_entity?.refDocs} onChange={(e) => setValByKey("refDocs", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Response Text:</p>
                <InputText className="w-full mb-3" value={_entity?.responseText} onChange={(e) => setValByKey("responseText", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">System Id:</p>
                <InputText className="w-full mb-3" value={_entity?.systemId} onChange={(e) => setValByKey("systemId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Type:</p>
                <InputText className="w-full mb-3" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Role:</p>
                <InputText className="w-full mb-3" value={_entity?.role} onChange={(e) => setValByKey("role", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Model:</p>
                <InputText className="w-full mb-3" value={_entity?.model} onChange={(e) => setValByKey("model", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Stop Reason:</p>
                <InputText className="w-full mb-3" value={_entity?.stopReason} onChange={(e) => setValByKey("stopReason", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Stop Sequence:</p>
                <InputText className="w-full mb-3" value={_entity?.stopSequence} onChange={(e) => setValByKey("stopSequence", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Input Tokens:</p>
                <InputText className="w-full mb-3" value={_entity?.inputTokens} onChange={(e) => setValByKey("inputTokens", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Output Tokens:</p>
                <InputText className="w-full mb-3" value={_entity?.outputTokens} onChange={(e) => setValByKey("outputTokens", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Cost:</p>
                <InputText className="w-full mb-3" value={_entity?.cost} onChange={(e) => setValByKey("cost", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Status:</p>
                <InputText className="w-full mb-3" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Error:</p>
                <InputText className="w-full mb-3" value={_entity?.error} onChange={(e) => setValByKey("error", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(PromptsCreateDialogComponent);
