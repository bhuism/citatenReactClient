import React, {useEffect, useState} from "react";
import {IDataTableState} from "./IDatatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Paginator} from "primereact/paginator";
import {Toolbar} from "primereact/toolbar";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";

const BASE: string = 'https://api-citaten.odee.net';
const API_CITATEN: string = BASE + '/citaten';
const API_AUTHOR: string = BASE + '/sprekers';
const API_GENRE: string = BASE + '/categorien';

interface TableProps {
    name: string;
}

interface RequestParams {
    offset: number
    limit: number
    sort: string
    globalSearch: string
}

export const Table: React.FC<TableProps> = (props: TableProps) => {

    const [requestParams, setRequestParams] = useState<RequestParams>({limit: 10, offset: 0, sort: "", globalSearch: ""});
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<IDataTableState<{}>>({
        columns: [],
        rows: []
    });

    function getUrl(): string {
        return API_CITATEN + '?limit=' + requestParams.limit + '&offset=' + requestParams.offset + (requestParams.sort.length > 0 ? '&sort=' + requestParams.sort : "") + (requestParams.globalSearch.length > 0 ? '&query=' + requestParams.globalSearch : "");
    }

    function doFetch() {
        setLoading(true);
        setSelected([]);
        fetch(getUrl())
            .then(result => result.json())
            .then((result) => {
                setState({
                    columns: [
                        {title: 'Id', key: 'id'},
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
            fetch(API_CITATEN + '/' + s['id'],
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
                <div style={{'textAlign': 'left'}}>
                    <InputText type="search" onInput={(e) => {
                        const value = e.currentTarget.value;
                        if (value && value.length > 2) {
                            setRequestParams({...requestParams, globalSearch: e.currentTarget.value});
                        } else {
                            if (requestParams.globalSearch !== "") {
                                setRequestParams({...requestParams, globalSearch: ""});
                            }
                        }
                    }} placeholder="Search"/>
                </div>
            </React.Fragment>
        )
    }

    function colHeader(key: string) {
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

    function tableHeader() {
        return (<Toolbar left={leftToolbarTemplate} right={rightToolbarTemplate} style={{'padding': '0'}}/>);
    }

    function tableFooter() {
        return (<Toolbar left={() => props.name} right={bottomRight} style={{'padding': '0'}}/>
        );
    }

    function bottomRight() {
        return (<Paginator first={requestParams.offset}
                           rows={requestParams.limit}
                           totalRecords={state.rows.length < requestParams.limit ? state.rows.length : requestParams.offset + requestParams.limit + 1}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           onPageChange={(e) => setRequestParams({...requestParams, offset: e.first, limit: e.rows})}/>);
    }

    function idColumn(id: any): any {
        return <a href={API_CITATEN + '/' + id}>{id}</a>;
    }

    function authorColumn(id: any): any {
        return <a href={API_AUTHOR + '/' + id}>{id}</a>;
    }

    function genreColumn(id: any): any {
        return <a href={API_GENRE + '/' + id}>{id}</a>;
    }

    return (
        <DataTable
            dataKey="id"
            header={tableHeader()}
            footer={tableFooter()}
            value={state.rows}
            selection={selected} onSelectionChange={(e) => setSelected(e.value)}
            loading={loading}
            className="p-datatable-sm"
        >
            <Column key="checkboxcol" columnKey="checkboxcol" selectionMode="multiple" headerStyle={{width: '5%'}} frozen={true}/>
            <Column key={'id'} columnKey={'id'} field={'id'} header={colHeader('id')} headerStyle={{width: '25%'}} className={'noOverflow'}
                    body={(row: any) => idColumn(row['id'])}/>
            <Column key={'name'} columnKey={'name'} field={'name'} header={colHeader('name')} headerStyle={{width: '60%'}} className={'noOverflow'}/>
            <Column key={'spreker'} columnKey={'spreker'} field={'spreker'} header={colHeader('spreker')} headerStyle={{width: '5%'}}
                    className={'noOverflow'} body={(row: any) => authorColumn(row['spreker'])}/>
            <Column key={'categorie'} columnKey={'categorie'} field={'categorie'} header={colHeader('categorie')} headerStyle={{width: '5%'}}
                    className={'noOverflow'} body={(row: any) => genreColumn(row['categorie'])}/>

        </DataTable>
    )
}

