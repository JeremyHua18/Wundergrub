import axios from "axios";

const localURL = "http://localhost:8080/api"
const cloudURL = "http://ec2-100-26-161-246.compute-1.amazonaws.com:8080/api"

export default axios.create({
  baseURL: cloudURL,
  headers: {
    "Content-type": "application/json"
  }
});