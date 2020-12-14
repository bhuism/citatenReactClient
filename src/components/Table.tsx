import React, {ReactNode, useEffect, useState} from "react";
import {Card} from "primereact/card";
import {IDataTableState} from "./IDatatable";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Paginator} from "primereact/paginator";
import {Toolbar} from "primereact/toolbar";

const BASE: string = 'https://api-citaten.odee.net/citaten';

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

    function getUrl(): string {
        return BASE + '?limit=' + requestParams.limit + '&offset=' + requestParams.offset + (requestParams.sort.length > 0 ? '&sort=' + requestParams.sort : "")
    }

    function doFetch() {
        setLoading(true);
        setSelected([]);
        fetch(getUrl())
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

    // eslint-disable-next-line
    useEffect(doFetch, [requestParams])

    function doDelete() {
        selected.forEach((s) => {
            fetch(BASE + '/' + s['uuid'],
                {method: 'DELETE'}
            ).finally(() => {
                doFetch();
            });
        })
    }

    function download() {
        window.location.href = getUrl();
    }

    function leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Reload" icon="pi pi-refresh" className="p-button-success p-mr-2" onClick={doFetch}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-mr-2" disabled={!selected || !selected.length} onClick={doDelete}/>
                <Button label="Export" icon="pi pi-upload" className="p-button-help p-mr-2" onClick={download}/>
            </React.Fragment>
        )
    }

    function rightToolbarTemplate() {
        return (
            <React.Fragment>
                <Paginator first={requestParams.offset}
                           rows={requestParams.limit}
                           totalRecords={requestParams.offset + requestParams.limit + 1}
                           rowsPerPageOptions={[5, 10, 25, 50]}
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
                <span className={key === requestParams.sort || '-' + key === requestParams.sort ? 'sorted' : ''}
                      onClick={
                          () => {

                              let sort = key;

                              if (key === requestParams.sort || '-' + key === requestParams.sort) {
                                  if (requestParams.sort.startsWith('-')) {
                                      sort = "";
                                  } else {
                                      sort = '-' + key;
                                  }
                              }

                              setRequestParams({...requestParams, sort: sort});

                          }
                      }>{key}</span>
            </React.Fragment>
        );
    }

    const widthMap = new Map([['uuid', '25%'], ['name', '60%'], ['spreker', '5%'], ['categorie', '5%']]);

    function getColumns(): ReactNode[] {

        const result: ReactNode[] = [];

        result.push(<Column key="checkboxcol" columnKey="checkboxcol" selectionMode="multiple" headerStyle={{width: '5%'}} frozen={true}/>);

        state.columns.forEach((col) => {
            result.push(<Column key={col.key} columnKey={col.key} field={col.key} header={header(col.key)} headerStyle={{width: widthMap.get(col.key)}}
                                className={'noOverflow'}/>);
        });

        return result;

    }

    return (
        <Card footer={props.name}>

            <Toolbar left={leftToolbarTemplate} right={rightToolbarTemplate} style={{'paddingLeft': '0', 'paddingRight': '0'}}/>

            <DataTable
                dataKey="uuid"
                value={state.rows}
                selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                loading={loading}
                className="p-datatable-sm"
                //                footer={'myfooter'}
            >
                {getColumns()}
            </DataTable>
        </Card>
    )
}

