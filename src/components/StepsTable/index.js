import React from "react";
import { Table } from "semantic-ui-react";
import _ from "lodash";

const StepsTable = ({ retrievedData }) => {
  return (
    <Table collapsing color="teal">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name of test</Table.HeaderCell>
          <Table.HeaderCell>Number of Fails</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {_.sortBy(retrievedData, ["fail"])
          .reverse()
          .map(rowData => (
            <Table.Row key={rowData.test}>
              <Table.Cell>{rowData.test}</Table.Cell>
              <Table.Cell>{rowData.fail}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default StepsTable;
