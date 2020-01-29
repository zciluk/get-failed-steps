import React from "react";
import { Table } from "semantic-ui-react";

const StepsTable = ({ displayedData }) => {
  return (
    <Table collapsing color="teal">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name of test</Table.HeaderCell>
          <Table.HeaderCell>Number of Fails</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {displayedData
          .filter((item, i, ar) => ar.indexOf(item) === i)
          .map(rowData => (
            <Table.Row>
              <Table.Cell>{rowData}</Table.Cell>
              <Table.Cell>
                {displayedData.filter(x => x === rowData).length}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default StepsTable;
