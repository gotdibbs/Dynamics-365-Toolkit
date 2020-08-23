import { default as orgName } from './orgName';
import { default as dynamicsVersion } from './dynamicsVersion';
import { default as appName } from './appName';
import { default as userId } from './userId';
import { default as userName } from './userName';
import { default as securityRoles } from './securityRoles';
import { default as recordId } from './recordId';
import { default as logicalName } from './logicalName';
import { default as recordUrl } from './recordUrl';

// Export such that they're ordered
export default [
    dynamicsVersion,
    orgName,
    appName,
    userName,
    userId,
    securityRoles,
    recordUrl,
    recordId,
    logicalName
];