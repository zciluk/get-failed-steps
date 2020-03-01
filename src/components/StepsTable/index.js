import React from "react";
import { Table, Popup, Label } from "semantic-ui-react";
import _ from "lodash";

const StepsTable = ({ retrievedData, specsData }) => {
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
              <Table.Cell>
                <Popup
                  trigger={<Label basic>{rowData.test}</Label>}
                  content={specsData
                    .map(elem => {
                      if (elem[0] === rowData.test) return elem[1];
                      return "";
                    })
                    .filter((item, i, ar) => ar.indexOf(item) === i)}
                  inverted
                />
              </Table.Cell>
              <Table.Cell>{rowData.fail}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default StepsTable;
