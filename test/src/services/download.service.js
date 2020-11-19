import http from "../http-common";

class DownloadDataService {
  getURL(data) {
    return http.post("/download", data);
  }

  getFileContent(data) {
    return http.post("/download/file", data);
  }
}

export default new DownloadDataService();