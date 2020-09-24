import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import { StoreContext } from './StoreProvider';
import ReactJson from 'react-json-view';

async function loadEntityData() {
    const xrm = window.__GOTDIBBS_TOOLBOX__.context.Xrm;
    let id = null;

    try {
        id = xrm.Page.data.entity.getId();
    }
    catch {}

    if (!id) {
        return 'Failed to load record details, could not determine current record ID';
    }

    const logicalName = xrm.Page.data.entity.getEntityName();

    if (!logicalName) {
        return 'Failed to load record details, could not determine current record logical name';
    }

    const metadata = await xrm.Utility.getEntityMetadata(logicalName);

    if (!metadata) {
        return 'Failed to load record details, could not retrieve entity metadata';
    }

    let response = await fetch(`${xrm.Page.context.getClientUrl()}/api/data/v9.0/${metadata.EntitySetName}(${id.substr(1, 36)})`);

    return await response.json();
}

export default function EntityDataModal() {
    const { state, actions } = useContext(StoreContext);
    const [data, setData] = useState('');

    useEffect(() => {
        const handler = (e) => {
            if (event.key === 'Escape') {
                actions.toggleEntityDataModal();
            }
        };

        if (state.isEntityDataModalOpen) {
            window.addEventListener('keydown', handler);

            loadEntityData().then(setData);
        }

        return () => window.removeEventListener('keydown', handler);
    }, [state.isEntityDataModalOpen]);

    if (!state.isEntityDataModalOpen) {
        return null;
    }

    function close() {
        actions.toggleEntityDataModal();
    }

    return (
        <div className="gotdibbs-toolbox-modal-container">
            <div className="gotdibbs-toolbox-modal">
                <div className="gotdibbs-toolbox-modal-header">
                    <h1>Entity Data</h1>
                    <span className="gotdibbs-toolbox-action gotdibbs-toolbox-close" onClick={close}>&#10006;</span>
                </div>

                <div className="gotdibbs-toolbox-modal-body" style={{ overflow: 'auto' }}>
                    {(typeof data === 'object') ? (
                        <ReactJson src={data}
                            theme="monokai"
                            iconStyle="triangle"
                            collapseStringsAfterLength={36} />
                    ) : data}
                </div>

                <div className="gotdibbs-toolbox-modal-buttons">
                    <button className="gotdibbs-toolbox-modal-button" onClick={close} data-testid="cancel-entity-data-modal">Close</button>
                </div>
            </div>
        </div>
    );
}