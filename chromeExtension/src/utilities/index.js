import { default as copyRecordId } from './copy-record-id';
import { default as copyRecordLink } from './copy-record-link';
import { default as enableAllFields } from './enable-all-fields';
import { default as focusField } from './focus-field';
import { default as openPerformanceReport } from './open-performance-report';
import { default as openRibbonDebugger } from './open-ribbon-debugger';
import { default as populateRequiredFields } from './populate-required-fields';
import { default as showAllFields } from './show-all-fields';
import { default as showDirtyFields } from './show-dirty-fields';
import { default as showRecordProperties } from './show-record-properties';
import { default as toggleSchemaNames } from './toggle-schema-names';

// Export such that they're ordered
export default [
    copyRecordId,
    copyRecordLink,
    enableAllFields,
    focusField,
    openPerformanceReport,
    openRibbonDebugger,
    populateRequiredFields,
    showAllFields,
    showDirtyFields,
    showRecordProperties,
    toggleSchemaNames
];