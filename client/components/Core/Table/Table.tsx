import React from 'react';
import TableHeader from './TableHeader';
import styled from 'styled-components';
import TableBody from './TableBody';

const TableWrapper = styled.div`
  table {
    table-layout: fixed;
    width: 100%;
    overflow: auto;
    background: #fff;
    border-spacing: 0;
    margin-bottom: -5px;
    border-collapse: collapse;
  }
`;

interface Column {
  label?: string;
  key: string;
  width?: string;
};

interface Props {
  columns: Column[];
  rows: any[];
  numberToShow?: number;
  sticky?: boolean;
};

class Table extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // maintain previous sorts by keeping rows in state
      rows: props.rows,
      numberToShow: this.props.rows.length,
      sortBy: null,
      asc: true,
    };
  }

  componentWillReceiveProps(props: Props, nextProps: Props) {
    this.setState({
      rows: nextProps.rows,
    });
  }

  changeSortBy = (sortBy: string) => {
    if (this.state.sortBy === sortBy) {
      return this.setState({
        asc: !this.state.asc,
      });
    }
  }

  render() {
    const numberToShow = this.props.numberToShow || this.state.numberToShow;
    const { columns. sticky } = this.props;
    const rows = this.state.rows.slice(0, numberToShow);

    if (this.state.sortBy) {
      rows.sort((a: string, b: string) => {
        const comparison = a.localeCompare(b);
        return this.state.asc ? comparison : !comparison;
      });
    }

    return (
      <TableWrapper>
        <table>
          <TableHeader sticky={sticky} columns={columns} changeSortBy={this.changeSortBy} />
          <TableBody columns={columns} rows={rows} />
        </table>
      </TableWrapper>
    );
  }
}

export default Table;
