import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestContext from "../contexts/RequestContext";

export const RequestProvider = (props) => {
  const [requests, setRequests] = useState([]);
  const baseUrl = "http://localhost:3001/requests";

  useEffect(() => {
    async function fetchData() {
      await getAllRequests();
    }
    fetchData();
  }, []);

  async function getAllRequests() {
    try {
      const response = await axios.get(baseUrl);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  function getRequest(id) {
    return requests.find((request) => request.helpId === parseInt(id));
  }

  async function addRequest(request) {
    try {
      const response = await axios.post(baseUrl, request);
      await getAllRequests();
      return response.data;
    } catch (error) {
      console.error("Error adding request:", error);
    }
  }

  async function updateRequest(id, request) {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, request);
      await getAllRequests();
      return response.data;
    } catch (error) {
      console.error("Error updating request:", error);
    }
  }

  async function deleteRequest(id) {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      await getAllRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  }

  return (
    <RequestContext.Provider
      value={{
        requests,
        getAllRequests,
        getRequest,
        addRequest,
        updateRequest,
        deleteRequest,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
};
