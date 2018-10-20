export default class FacebookOAuth {
    initialized: boolean;
    constructor();
    refreshFacebookToken(): Promise<{}>;
    private _refreshFacebookTokenImpl;
}
