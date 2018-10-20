export default class GoogleOAuth {
    initialized: boolean;
    constructor();
    refreshGoogleToken(): Promise<{}>;
    private _refreshGoogleTokenImpl;
}
