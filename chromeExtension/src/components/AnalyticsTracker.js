import { useEffect } from 'react';
import * as Fathom from 'fathom-client';

export default function AnalyticsTracker({ children }) {
    if (process.env.NODE_ENV === 'development') {
        return children;
    }

    useEffect(() => {
        Fathom.load(process.env.FATHOM_SITE_ID);
        Fathom.trackPageview();
    }, []);

    return children;
}