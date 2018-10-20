import { AWS } from '@aws-amplify/core';
/**
* Analytics instance options
*/
export interface AnalyticsOptions {
    appId: string;
    platform?: string;
    clientId?: string;
    region?: string;
    credentials?: AWS.Credentials & AWS.CognitoIdentityCredentials;
}
export interface EventAttributes {
    [key: string]: any;
}
export interface EventMetrics {
    [key: string]: number;
}
export interface pageViewTrackOpts {
    enable: boolean;
    type?: string;
    eventName?: string;
    provider?: string;
    attributes?: EventAttributes | Function;
    getUrl?: Function;
}
export interface EventTrackOpts {
    enable: boolean;
    events?: Array<string>;
    selectorPrefix?: string;
    provider?: string;
    attributes?: EventAttributes | Function;
}
export interface SessionTrackOpts {
    enable: boolean;
    attributes?: EventAttributes | Function;
    provider?: string;
}
