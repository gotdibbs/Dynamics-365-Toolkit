import React, { useContext, useEffect } from 'react';
import { StoreContext } from './StoreProvider';
import { useForm } from 'react-hook-form';
import * as Fathom from 'fathom-client';

const guidRegex = /(^{[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}}$)|(^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$)/i;

async function openSolution(solutionUniqueName) {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

    const response = await fetch([
        xrm.Page.context.getClientUrl(),
        '/api/data/v8.2/solutions?$select=solutionid&$filter=uniquename eq \'', solutionUniqueName, '\''
    ].join(''), {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0'
        }
    });

    if (!response || !response.ok && response.status != 200) {
        alert('Invalid response received from solution retrieval request');
        Honeybadger.notify({
            message: 'Error encountered while attempting to open a solution',
            context: { xrm: !!xrm },
            params: { solutionName: solutionName }
        });
        return;
    }

    const json = await response.json();

    if (!json || !json.value || !json.value.length || !json.value[0].solutionid) {
        alert('Could not locate the specified solution');
        return;
    }

    window.open([
        xrm.Page.context.getClientUrl(), '/tools/solution/edit.aspx?id=', json.value[0].solutionid
    ].join(''), '_blank');

    Fathom.trackGoal('G8YW7GJJ', 0);
}

export default function OpenObjectModal() {
    const { state, actions } = useContext(StoreContext);
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        const handler = (e) => {
            if (event.key === 'Escape') {
                actions.toggleOpenObjectModal();
            }
        };

        if (state.isOpenObjectModalOpen) {
            window.addEventListener('keydown', handler);
        }

        return () => window.removeEventListener('keydown', handler);
    }, [state.isOpenObjectModalOpen]);

    if (!state.isOpenObjectModalOpen) {
        return null;
    }

    function close() {
        actions.toggleOpenObjectModal();
    }

    function open(data) {
        let xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;

        if (state.openObjectModalData.type === 'record') {
            window.open([
                xrm.Page.context.getClientUrl(),
                '/main.aspx?pagetype=entityrecord&etn=', data.logicalName, data.id ? '&id=' + data.id : ''
            ].join(''), '_blank');

            actions.toggleOpenObjectModal();

            Fathom.trackGoal('7YHT3JKI', 0);
        }
        else if (state.openObjectModalData.type === 'list') {
            window.open([
                xrm.Page.context.getClientUrl(),
                '/main.aspx?pagetype=entitylist&etn=', data.logicalName
            ].join(''), '_blank');

            actions.toggleOpenObjectModal();

            Fathom.trackGoal('IJGSMM1T', 0);
        }
        else if (state.openObjectModalData.type === 'solution') {
            openSolution(data.solutionUniqueName);

            actions.toggleOpenObjectModal();
        }
        else if (state.openObjectModalData.type === 'field') {
            let field = window.__GOTDIBBS_TOOLBOX__.context.Xrm.Page.getControl(data.fieldLogicalName);
            if (!data.fieldLogicalName || !field) {
                return alert('Failed to find field on this form.');
            }

            let section = field.getParent();
            if (section) {
                let tab = section.getParent();
                if (tab) {
                    tab.setVisible(true);
                    tab.setDisplayState('expanded');
                }
                section.setVisible(true);
            }

            field.setFocus();

            actions.toggleOpenObjectModal();
            // Keep out of the way in this case
            actions.toggleExpanded();

            Fathom.trackGoal('AWYB6DBW', 0);
        }
    }

    const title = state.openObjectModalData.type === 'record' ?
        'Open Record' : state.openObjectModalData.type === 'list' ?
        'Open Record List' : state.openObjectModalData.type === 'solution' ?
        'Open Solution': state.openObjectModalData.type === 'field' ?
        'Focus Field' : 'Unknown error, please file a bug report';

    return (
        <div className="gotdibbs-toolbox-modal-container">
            <div className="gotdibbs-toolbox-modal">
                <div className="gotdibbs-toolbox-modal-header">
                    <h1>{title}</h1>
                    <span className="gotdibbs-toolbox-action gotdibbs-toolbox-close" onClick={close}>&#10006;</span>
                </div>

                <form onSubmit={handleSubmit(open)}>

                    <div className="gotdibbs-toolbox-modal-body">
                        {state.openObjectModalData.type === 'record' || state.openObjectModalData.type === 'list' ? (
                            <div className="gotdibbs-toolbox-modal-form-field">
                                <label>Record Logical Name <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" name="logicalName" ref={register({ required: true })} autoFocus data-testid="recordlogicalname" />
                                {errors.logicalName && (<span style={{ color: 'red' }}>Record Logical Name is required</span>)}
                            </div>
                        ) : null}

                        {state.openObjectModalData.type === 'record' ? (
                            <div className="gotdibbs-toolbox-modal-form-field">
                                <label>Record Id</label>
                                <input type="text" name="id" ref={register({ pattern: guidRegex })} data-testid="recordid" />
                                {errors.id && (<span style={{ color: 'red' }}>ID must be a valid GUID</span>)}
                            </div>
                        ) : null}

                        {state.openObjectModalData.type === 'solution' ? (
                            <div className="gotdibbs-toolbox-modal-form-field">
                                <label>Solution Unique Name <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" name="solutionUniqueName" ref={register({ required: true })} autoFocus data-testid="solutionuniquename" />
                                {errors.solutionUniqueName && (<span style={{ color: 'red' }}>Solution Unique Name is required</span>)}
                            </div>
                        ) : null}

                        {state.openObjectModalData.type === 'field' ? (
                            <div className="gotdibbs-toolbox-modal-form-field">
                                <label>Field Logical Name <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" name="fieldLogicalName" ref={register({ required: true })} autoFocus data-testid="fieldLogicalName" />
                                {errors.fieldLogicalName && (<span style={{ color: 'red' }}>Field Logical Name is required</span>)}
                            </div>
                        ) : null}
                    </div>

                    <div className="gotdibbs-toolbox-modal-buttons">
                        <button type="submit" className="gotdibbs-toolbox-modal-button" data-testid="openobject">Go</button>
                        <button className="gotdibbs-toolbox-modal-button inverted" onClick={close} data-testid="cancelopenobject">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}