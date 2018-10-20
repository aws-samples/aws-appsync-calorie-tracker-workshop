import { SessionTrackOpts } from '../types';
export default class SessionTracker {
    private _tracker;
    private _hasEnabled;
    private _config;
    constructor(tracker: any, opts: any);
    private _envCheck;
    private _trackFunc;
    private _sendInitialEvent;
    configure(opts?: SessionTrackOpts): SessionTrackOpts;
}
