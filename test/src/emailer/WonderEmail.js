import http from "../http-common";

class WonderEmail {
    sendResetPasswrodCode (address) {
        return http.get(`/email/${address}`);
    }

    sendNotificationForEditTransaction (args) {
        var data = args;
        return http.post(`/email/transaction`, data);
    }
}

export default new WonderEmail();