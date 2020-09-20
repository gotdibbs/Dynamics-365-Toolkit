import React, {
    useContext,
    useEffect,
    useState
} from 'react';

export default function AlertContainer({ data, remove }) {
    const [isHovering, setIsHovering] = useState(false);

    function close() {
        remove(data.id);
    }

    function toggleHover() {
        setIsHovering(prev => !prev);
    }

    useEffect(() => {
        if (isHovering) {
            return;
        }

        let timeout = setTimeout(() => {
            close();
        }, 6000);

        return () => clearTimeout(timeout);
    }, [isHovering]);

    return (
        <div className="gotdibbs-toolbox-alert" onMouseOver={toggleHover} onMouseOut={toggleHover}>
            {data.message}
            <span className="gotdibbs-toolbox-action" onClick={close}>&#10006;</span>
        </div>
    );
}