export default (component: any, e: any) => {
  const errors = Object.assign({}, component.state.errors, { [e.target.name]: null });
  component.setState({
    [e.target.name]: e.target.value,
    errors,
  });
};
