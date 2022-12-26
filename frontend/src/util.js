
export const BACKEND_URL = "http://localhost:5001/api";

export const getError = (error) =>{
    return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
}
