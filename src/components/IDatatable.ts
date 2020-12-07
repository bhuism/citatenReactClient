export interface IColumn {
    title: string;
    key: string;
}

export interface IDataTableState<T> {
    columns: Array<IColumn>;
    rows: Array<T>;
}
