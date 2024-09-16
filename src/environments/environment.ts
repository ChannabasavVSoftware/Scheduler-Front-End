export const environment = {
    userAuthentication : false,
    useSignalR  : false,
    pkce: true,
    ISSUER: 'https://myappstest.halliburton.com/oauth2/default',
    CLIENT_ID: '0oa1lkvhinueYqcQm0h8',
    LOGIN_REDIRECT_URI: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email', 'address', 'phone', 'offline_access'],
    signalRUrl: window.location.protocol + "//" + window.location.hostname + ":52302/ServerRealtimeService",
    baseUrl: window.location.protocol + "//" + window.location.hostname +":52302/api/v3",
};
