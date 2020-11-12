import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions");
  }

  getPending() {
    return http.get("/transactions/pending");
  }

  getHistory(username) {
    return http.get(`/transactions/history/${username}`);
  }

  get(id) {
    return http.get(`/transactions/${id}`);
  }

  create(data) {
    return http.post("/transactions", data);
  }

  update(id, data) {
    return http.put(`/transactions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/transactions/${id}`);
  }

  deleteAll() {
    return http.delete(`/transactions`);
  }
}

export default new TransactionDataService();