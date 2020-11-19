import http from "../http-common";

class DownloadDataService {
  getURL(data) {
    return http.post("/download", data);
  }
}

export default new DownloadDataService();