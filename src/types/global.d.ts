export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface Employee {
    id: number;
    name: string;
    salary: number;
  }

  type Person = {
    name: string;
    age: number;
  };

  type RequireAuthProps = {
    children?: React.ReactNode;
  };

  type AuthType = {
    user?: null;
    login: any;
    logout: any;
  };

  interface RootState {
    auth: any;
    isOn: boolean;
  }
}
