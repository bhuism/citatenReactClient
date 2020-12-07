import React, {ReactNode, useEffect, useState} from "react";
import {Card} from "primereact/card";
import {IDataTableState} from "./IDatatable";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toolbar} from 'primereact/toolbar';
import {Paginator} from "primereact/paginator";

const BASE: string = 'https://api.citaten.odee.net/citaten';

interface TableProps {
    name: string;
}

interface RequestParams {
    offset: number
    limit: number
    sort: string
}

export const Table: React.FC<TableProps> = (props: TableProps) => {

    const [requestParams, setRequestParams] = useState<RequestParams>({limit: 10, offset: 0, sort: ""});
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState<IDataTableState<{}>>({
        columns: [],
        rows: []
    });

    function doFetch() {
        setLoading(true);
        setSelected([]);
        fetch(BASE + '?limit=' + requestParams.limit + '&offset=' + requestParams.offset + (requestParams.sort.length > 0 ? '&sort=' + requestParams.sort : ""))
            .then(result => result.json())
            .then((result) => {
                setState({
                    columns: [
                        {title: 'Id', key: 'uuid'},
                        {title: 'Name', key: 'name'},
                        {title: 'Spreker', key: 'spreker'},
                        {title: 'Categorie', key: 'categorie'}
                    ],
                    rows: result
                })
            })
            .finally(() => setLoading(false))
            .catch(console.log);
    }

    useEffect(doFetch, [requestParams])

    function doDelete() {
        selected.forEach((s) => {
            fetch(BASE + '/' + s['uuid'],
                {method: 'DELETE'}
            ).finally(() => {
                setSelected([]);
                doFetch();
            });
        })
    }

    function leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Reload" icon="pi pi-refresh" className="p-button-success p-mr-2" onClick={doFetch}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger"
                        disabled={!selected || !selected.length}
                        onClick={doDelete}/>
            </React.Fragment>
        )
    }

    function rightToolbarTemplate() {
        return (
            <React.Fragment>
                <Paginator first={requestParams.offset}
                           rows={requestParams.limit}
                           totalRecords={requestParams.offset + requestParams.limit + 1}
                           rowsPerPageOptions={[5, 10, 25]}
                           onPageChange={(e) => setRequestParams({
                               offset: e.first,
                               limit: e.rows,
                               sort: requestParams.sort
                           })}/>
            </React.Fragment>
        )
    }

    function header(key: string) {
        return (
            <React.Fragment>
                <span onClick={
                    () => {

                        let sort = key;

                        if (key === requestParams.sort || '-' + key === requestParams.sort) {
                            if (requestParams.sort.startsWith('-')) {
                                sort = "";
                            } else {
                                sort = '-' + key;
                            }
                        }

                        setRequestParams({offset: requestParams.offset, limit: requestParams.limit, sort: sort});

                    }
                }>{key}</span>
            </React.Fragment>
        );
    }

    function getColumns(): ReactNode[] {

        let result: ReactNode[] = [];

        result.push(<Column key="checkboxcol" selectionMode="multiple" headerStyle={{width: '3rem'}}/>);


        state.columns.forEach((col) => {
            result.push(<Column key={col.key} field={col.key} header={header(col.key)}/>);
        });


        return result;

    }

    return (
        <Card footer={props.name}>

            <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}/>

            <DataTable
                dataKey="uuid"
                value={state.rows}
                selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                loading={loading}
                className="p-datatable-sm p-datatable-gridlines"
            >
                {getColumns()}
            </DataTable>
        </Card>
    )
}

