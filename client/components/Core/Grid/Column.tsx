import React from 'react';

interface Props {
  children: any;
};

export default (props: Props) => (
  <div className="column">
    {props.children}
  </div>
);
