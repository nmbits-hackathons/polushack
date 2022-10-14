const withMock = <T>(mock: T, delay?: number) => {
  return new Promise<T>(resolve => setTimeout(() => resolve(mock), delay ?? 1000));
};

export default withMock;