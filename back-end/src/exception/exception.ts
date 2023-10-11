export class Exception<
  TData extends Record<string, unknown> = null,
> extends Error {
  public message: string;

  public name: string;

  public stack: string;

  public metadata: TData;

  constructor(...args: TData extends null ? [] : [TData]) {
    super();

    this.metadata = args[0] as TData;

    const message = this.getMessage();

    super.message = message;
  }

  public getCode() {
    return this.getName()
      .map((name) => name.toUpperCase())
      .join('_');
  }

  public getMessage() {
    const [first, ...rest] = this.getName();

    return `${first} ${rest.map((part) => part.toLowerCase()).join(' ')}`;
  }

  private getName() {
    const name = this.constructor.name.match(/[A-Z][a-z]+/g);

    name.pop();

    return name;
  }
}
