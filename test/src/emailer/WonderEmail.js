import http from "../http-common";

class WonderEmail {
    sendResetPasswrodCode (address) {
        return http.get(`/email/${address}`);
    }

    sendNotificationForEditTransaction (args) {
        var data = args;
        return http.post(`/email/transaction/edit`, data);
    }

    sendNotificationForEditHarvest (args) {
        var data = args;
        return http.post(`/email/harvest/edit`, data);
    }

    sendNotificationForDenyTransaction (args) {
        var data = args;
        return http.post(`/email/transaction/denial`, data);
    }

    sendNotificationForDenyHarvest (args) {
        var data = args;
        return http.post(`/email/harvest/denial`, data);
    }
}

export default new WonderEmail();