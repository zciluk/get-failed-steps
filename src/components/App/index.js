import React, { useState } from "react";
import { Segment, Grid, GridColumn, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import API from "../../apis";
import Spinner from "../Spinner";
import StepsTable from "../StepsTable";
import FormHeader from "../FormHeader";

function App() {
  const urlParameters = new URLSearchParams(window.location.search);
  const [state, setState] = useState({
    displayedData: "",
    apiKey: process.env.REACT_APP_API_KEY,
    projectID: urlParameters.get("projectId"),
    isError: false,
    selectedDate: new Date().toISOString().substring(0, 10),
    isSearching: false,
    pipelinesNumber: null,
    jobsNumber: null,
    testFailsNumber: null,
    dateOfCheck: null,
    startHour: "00:00",
    endHour: "23:59"
  });
  const searchCall = searchTerm => {
    setState(prevState => ({
      ...prevState,
      isSearching: true,
      isError: false,
      pipelinesNumber: null,
      jobsNumber: null,
      testFailsNumber: null,
      dateOfCheck: state.selectedDate
    }));
    let nextDayDate = new Date(state.selectedDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    return API.get(
      `/projects/${state.projectID}/pipelines?updated_after=${state.selectedDate}T${state.startHour}:00Z&order_by=updated_at&sort=asc&updated_before=${nextDayDate}T${state.endHour}:00Z`,
      {
        headers: {
          "PRIVATE-TOKEN": state.apiKey
        }
      }
    )
      .then(res => {
        retriveJobs(res.data);
        setState(prevState => ({
          ...prevState,
          pipelinesNumber: res.data.length
        }));
      })
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          isError: true,
          isSearching: false
        }));
      });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "selectedDate") {
      setState(prevState => ({
        ...prevState,
        [name]: value.substring(0, 10)
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const retriveJobs = receivedPipelines => {
    let jobsCollection = [];
    let callsCollection = [];
    receivedPipelines.forEach(pipeline => {
      callsCollection.push(
        API.get(`/projects/${state.projectID}/pipelines/${pipeline.id}/jobs`, {
          headers: {
            "PRIVATE-TOKEN": state.apiKey
          }
        })
          .then(res => {
            res.data.forEach(job => {
              jobsCollection.push(job.id);
            });
          })
          .catch(error => {
            console.log("Error retrieving pipeline jobs data");
          })
      );
    });
    Promise.all(callsCollection).then(() => {
      retrieveAndProcessArtifacts(jobsCollection);
      setState(prevState => ({
        ...prevState,
        jobsNumber: jobsCollection.length
      }));
    });
  };
  const retrieveAndProcessArtifacts = receivedJobs => {
    let stepsContainer = [];
    let callsCollection = [];
    const regExp = /(?<=Failed Step: ).*?\n/g;
    receivedJobs.forEach(jobId => {
      callsCollection.push(
        API.get(`/projects/${state.projectID}/jobs/${jobId}/trace`, {
          headers: {
            "PRIVATE-TOKEN": state.apiKey
          }
        })
          .then(async res => {
            const returnedSteps = res.data.match(regExp);
            if (returnedSteps !== null) {
              await stepsContainer.push(...returnedSteps);
            }
          })
          .catch(error => {
            console.log("Error retrieving trace from jobs");
          })
      );
    });
    Promise.all(callsCollection).then(() => {
      setState(prevState => ({
        ...prevState,
        isError: false,
        isSearching: false,
        displayedData: stepsContainer,
        testFailsNumber: stepsContainer.length
      }));
    });
  };
  return (
    <Segment>
      <FormHeader
        projectID={state.projectID}
        apiKey={state.apiKey}
        selectedDate={state.selectedDate}
        handleChange={handleChange}
        searchCall={searchCall}
        startHour={state.startHour}
        endHour={state.endHour}
      ></FormHeader>
      <Grid columns="equal">
        <GridColumn width="8">
          {!state.isError &&
            !state.isSearching &&
            state.displayedData.length !== 0 && (
              <StepsTable displayedData={state.displayedData}></StepsTable>
            )}
          {state.isError && (
            <Message negative>
              <Message.Header>
                There was an error while doing API request. Check if API
                key/Project ID is correct.
              </Message.Header>
            </Message>
          )}
          {state.isSearching && <Spinner />}
        </GridColumn>
        <GridColumn width="4">
          {!state.isError && state.pipelinesNumber !== null && (
            <Message>
              <p>Check for date: {state.dateOfCheck} </p>
              <p>Pipelines retrieved: {state.pipelinesNumber} </p>
              {state.jobsNumber !== null && (
                <p> Jobs retrieved: {state.jobsNumber} </p>
              )}
              {state.testFailsNumber !== null && (
                <p> Failed steps: {state.testFailsNumber} </p>
              )}
            </Message>
          )}
        </GridColumn>
      </Grid>
    </Segment>
  );
}

export default App;
