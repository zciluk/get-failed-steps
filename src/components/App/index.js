import React, { useState } from "react";
import {
  Segment,
  Input,
  Grid,
  GridColumn,
  Table,
  Button,
  Message
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import API from "../../apis";
import Spinner from "../Spinner";

function App() {
  const [state, setState] = useState({
    displayedData: "",
    apiKey: process.env.REACT_APP_API_KEY,
    projectID: process.env.REACT_APP_PROJECT_ID,
    isError: false,
    selectedDate: new Date().toISOString().substring(0, 10),
    isSearching: false,
    pipelinesNumber: null,
    jobsNumber: null,
    testFailsNumber: null
  });
  const searchCall = searchTerm => {
    setState(prevState => ({
      ...prevState,
      isSearching: true,
      isError: false,
      pipelinesNumber: null,
      jobsNumber: null,
      testFailsNumber: null
    }));
    let nextDayDate = new Date(state.selectedDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    return API.get(
      `/projects/${state.projectID}/pipelines?updated_after=${state.selectedDate}T00:00:00Z&order_by=updated_at&sort=asc&updated_before=${nextDayDate}T00:00:00Z`,
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
            console.log(returnedSteps);
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
      <Segment inverted color="teal">
        <Grid divided="vertically">
          <Grid.Row columns={3}>
            <GridColumn>
              <Input
                icon="gitlab"
                name="projectID"
                value={state.projectID}
                onChange={handleChange}
                placeholder="Project ID"
                label={{ basic: true, content: "Project ID" }}
                labelPosition="left"
              />
            </GridColumn>
            <GridColumn>
              <Input
                icon="key"
                name="apiKey"
                value={state.apiKey}
                onChange={handleChange}
                placeholder="API key"
                label={{ basic: true, content: "API key" }}
                labelPosition="left"
              />
            </GridColumn>
            <GridColumn>
              <Input
                icon="clock"
                name="selectedDate"
                value={state.selectedDate}
                onChange={handleChange}
                placeholder="Selected Day"
                label={{ basic: true, content: "Day to check" }}
                labelPosition="left"
                type="date"
              />
            </GridColumn>
          </Grid.Row>
          <Grid.Row columns="2">
            <GridColumn>
              {}
              <Button onClick={searchCall} color="black">
                Get results
              </Button>
            </GridColumn>
            <GridColumn></GridColumn>
          </Grid.Row>
        </Grid>
      </Segment>
      <Grid columns="equal">
        <GridColumn width="8">
          {!state.isError &&
            !state.isSearching &&
            state.displayedData.length !== 0 && (
              <Table collapsing color="teal">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name of test</Table.HeaderCell>
                    <Table.HeaderCell>Number of Fails</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {state.displayedData
                    .filter((item, i, ar) => ar.indexOf(item) === i)
                    .map(rowData => (
                      <Table.Row>
                        <Table.Cell>{rowData}</Table.Cell>
                        <Table.Cell>
                          {
                            state.displayedData.filter(x => x === rowData)
                              .length
                          }
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
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
              <p>Check for date: {state.selectedDate} </p>
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
