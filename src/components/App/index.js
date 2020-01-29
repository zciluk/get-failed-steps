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
    isSearching: false
  });
  const searchCall = searchTerm => {
    setState(prevState => ({
      ...prevState,
      isSearching: true,
      isError: false
    }));
    return API.get(
      `/projects/${state.projectID}/pipelines?updated_after=${state.selectedDate}T00:00:00Z&order_by=updated_at&sort=asc`,
      {
        headers: {
          "PRIVATE-TOKEN": state.apiKey
        }
      }
    )
      .then(res => {
        retriveJobs(res.data);
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
    Promise.all(callsCollection).then(() =>
      retrieveAndProcessArtifacts(jobsCollection)
    );
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
        displayedData: stepsContainer
      }));
    });
  };
  return (
    <Segment>
      <Segment inverted color="teal">
        <Grid divided="vertically">
          <Grid.Row columns={4}>
            <GridColumn>
              <Input
                icon="folder open"
                name="projectID"
                value={state.projectID}
                onChange={handleChange}
                placeholder="Project ID"
              />
            </GridColumn>
            <GridColumn>
              <Input
                icon="key"
                name="apiKey"
                value={state.apiKey}
                onChange={handleChange}
                placeholder="API key"
              />
            </GridColumn>
          </Grid.Row>
          <Grid.Row columns={4}>
            <GridColumn>
              <Input
                icon="clock"
                name="selectedDate"
                value={state.selectedDate}
                onChange={handleChange}
                placeholder="Selected Day"
              />
            </GridColumn>
            <GridColumn>
              <Button onClick={searchCall} color="black">
                Get results
              </Button>
            </GridColumn>
            <GridColumn></GridColumn>
          </Grid.Row>
        </Grid>
      </Segment>
      {!state.isError && state.displayedData.length !== 0 && (
        <Table color="teal">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name of test</Table.HeaderCell>
              <Table.HeaderCell>Number of Fails</Table.HeaderCell>
              <Table.HeaderCell>Test folder</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state.displayedData.map(rowData => (
              <Table.Row>
                <Table.Cell>{rowData}</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {state.isError && (
        <Message negative>
          <Message.Header>
            There was an error while doing API request
          </Message.Header>
        </Message>
      )}
      {state.isSearching && <Spinner />}
    </Segment>
  );
}

export default App;
