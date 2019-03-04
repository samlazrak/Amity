import React from 'react';
import styled from 'styled-components';

const TableBodyWrapper = styled.tbody`
  font-size: 16px;
  margin-top: 5px;

  tr {
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: 0;
    }

    td {
      color: rgba(0, 0, 0, 0.7);
      padding: 10px 0;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

interface Column {
  label?: string;
  key: string;
  width?: string;
};

interface Props {
  rows: any[];
  columns: Column[];
};

export default (props: Props) => {
  const { columns, rows } = props;

  return (
    <TableBodyWrapper>
      {rows.map((row, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td style={{ width: column.width }} key={column.key}>{row[column.key]}</td>
          ))}
        </tr>
      ))}
    </TableBodyWrapper>
  );
};
