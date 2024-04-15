import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
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

const UserPromptsSavedCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            chatAiId: _entity?.chatAiId,
            savedUserid: _entity?.savedUserid,
            configid: _entity?.configid,
            prompt: _entity?.prompt,
            others: _entity?.others,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("userPromptsSaved").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info userPromptsSaved created successfully" });
        props.onCreateResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
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

    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="userPromptsSaved-create-dialog-component">
            <div>
                <p className="m-0">Chat Ai Id:</p>
                <InputText className="w-full mb-3" value={_entity?.chatAiId} onChange={(e) => setValByKey("chatAiId", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Saved Userid:</p>
                <InputText className="w-full mb-3" value={_entity?.savedUserid} onChange={(e) => setValByKey("savedUserid", e.target.value)}  />
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
                <p className="m-0">Others:</p>
                <InputText className="w-full mb-3" value={_entity?.others} onChange={(e) => setValByKey("others", e.target.value)}  />
            </div>
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

export default connect(mapState, mapDispatch)(UserPromptsSavedCreateDialogComponent);
