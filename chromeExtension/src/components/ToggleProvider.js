import React, {
    createContext,
    useState,
} from 'react';

const ToggleContext = createContext();
const { Provider } = ToggleContext;

const ToggleProvider = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return <Provider value={{ isExpanded, setIsExpanded }}>{children}</Provider>;
}

export {
    ToggleContext,
    ToggleProvider
};