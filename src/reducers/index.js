
export default (state = { count: 0 }, action) => {
  const { count } = state;

  switch (action.type) {
  case 'INCREMENT':
    return { count: count + 1 };
  case 'DECREMENT':
    return { count: count - 1 };
  default:
    return state;
  }
};
