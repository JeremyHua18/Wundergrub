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

    sendAccountApprovedNotification (address) {
        return http.post(`/email/account/approve`, address);
    }

    sendAccountDeniedNotification (args) {
        return http.post(`/email/account/denial`, args);
    }
}

export default new WonderEmail();