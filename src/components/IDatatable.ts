export interface IColumn {
    title: string;
    key: string;
}

export interface IDataTableState<T> {
    loading: boolean;
    columns: Array<IColumn>;
    rows: Array<T>;
}
