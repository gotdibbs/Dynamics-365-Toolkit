import { default as copyRecordId } from './copy-record-id';
import { default as copyRecordLink } from './copy-record-link';
import { default as enableCommandChecker } from './open-ribbon-debugger';
import { default as focusField } from './focus-field';
import { default as openPerformanceReport } from './open-performance-report';
import { default as populateRequiredFields } from './populate-required-fields';
import { default as showAllFields } from './show-all-fields';
import { default as showDirtyFields } from './show-dirty-fields';
import { default as showEntityData } from './show-entity-data';
import { default as showRecordProperties } from './show-record-properties';
import { default as toggleSchemaNames } from './toggle-schema-names';
import { default as unlockAllFields } from './enable-all-fields';

// Export such that they're ordered
export default [
    copyRecordId,
    copyRecordLink,
    enableCommandChecker,
    focusField,
    openPerformanceReport,
    populateRequiredFields,
    showAllFields,
    showDirtyFields,
    showEntityData,
    showRecordProperties,
    toggleSchemaNames,
    unlockAllFields
];