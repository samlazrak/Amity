import React from 'react';
import styled from 'styled-components';

const TableHeaderWrapper = styled.thead`

  th {
    text-align: left;
    background: #fff;
    text-transform: capitalize;
    position: relative;
    will-change: transform;
    border-bottom: 1px solid #e7e7e7;
    padding: 8px 0 8px 0;
    font-size: 14px;
    letter-spacing: .05em;
    color: #7983A4;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface Column {
  label?: string;
  key: string;
  width?: string;
};

interface Props {
  columns: Column[];
  changeSortBy: Function;
  sticky?: boolean;
};

class TableHeader extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  componentDidMount() {
    if (!!this.props.sticky) {
      const container = document.querySelector('.container');
      container.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (!!this.props.sticky) {
      const container = document.querySelector('.container');
      container.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = () => {
    const tableHeader = document.getElementById('table-header');
    const tableRect = tableHeader.getBoundingClientRect();
    const offset = tableRect.top < 0 ? Math.abs(tableRect.top) : 0;
    const headers = tableHeader.getElementsByTagName('th');

    for (let i = 0; i < headers.length; i++) {
      headers[i].style.transform = `translate(0, ${offset}px)`;
    }
  }

  render() {
    return (
      <TableHeaderWrapper offset={this.state.offset} id="table-header">
        <tr>
          {this.props.columns.map((column) => (
            <th style={{ width: column.width }} key={column.key}>{column.label || column.key}</th>
          ))}
        </tr>
      </TableHeaderWrapper>
    );
  }
}

export default TableHeader;
