import http from "../http-common";

class WonderEmail {
    sendResetPasswrodCode (address) {
        return http.get(`/email/${address}`);
    }
}

export default new WonderEmail();