import React from "react";
import { Segment, Input, Grid, Button, GridColumn } from "semantic-ui-react";
const FormHeader = ({
  projectID,
  apiKey,
  selectedDate,
  handleChange,
  searchCall
}) => {
  return (
    <Segment inverted color="teal">
      <Grid divided="vertically">
        <Grid.Row columns={3}>
          <GridColumn>
            <Input
              icon="gitlab"
              name="projectID"
              value={projectID}
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
              value={apiKey}
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
              value={selectedDate}
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
  );
};

export default FormHeader;
