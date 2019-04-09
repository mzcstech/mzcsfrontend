import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddTemplate from './AddTemplate.js';
import EditTemplate from './EditTemplate.js';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import Topbar from './Topbar';

class Template extends Component {

    constructor(props) {
        super(props);
        this.state = { templates: [], open: false, message: '',TEMPLATE_ID:'' };
    }

    componentDidMount() {
        this.fetchTemplate();
    }
    //获取模板列表
    fetchTemplate = () => {
        fetch(SERVER_URL + '/template/list', {

            mode: "cors",
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    templates: responseData.data.list
                });
            })
            .catch(err => console.error(err));
    }
    //删除
    onDelClick = (id) => {
        fetch(SERVER_URL + '/template/delete/' + id,
            {
                mode: "cors",
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': '*/*'
                }
            })
            // fetch(SERVER_URL + 'cars/')
            .then(res => {
                this.setState({ open: true, message: '删除成功' });
                this.fetchTemplate()
            })
            .catch(err => {
                this.setState({ open: true, message: 'Error when deleting' });
                console.error(err)
            })
    }
    //确认是否删除
    confirmDelete = (id) => {
        confirmAlert({
            message: '确认是否删除?' + id,
            buttons: [
                {
                    label: '是',
                    onClick: () => this.onDelClick(id)
                },
                {
                    label: '否',
                }
            ]
        })
    }

    // 新增
    addTemplate(params) {
        let templateVo = new FormData()
        if (params) {
            for (let key in params) {
                templateVo.append(key, params[key])
            }
        }
        fetch(SERVER_URL + '/template/save',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'
                },
                body: templateVo
            }
        )
            .then(res => this.fetchTemplate())
            .catch(err => console.error(err))
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.templates];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ templates: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.templates[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }
    //修改
    editTemplate(params) {
        console.log(params)
        let templateVo = new FormData()
        if (params) {
            for (let key in params) {
                templateVo.append(key, params[key])
            }
        }
        console.log(templateVo)
        fetch(SERVER_URL + '/template/edit',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'                   
                },
                body: templateVo
            })
            .then(res => this.fetchTemplate())
            .catch(err => console.error(err))
    }
    // 修改
    updateTemplate(templateVo) {   
        fetch(SERVER_URL + '/template/edit',
            {
                mode: "cors",
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'                   
                },
                body: templateVo
            })
            .then(res =>
                this.setState({ open: true, message: 'Changes saved' })
            )
            .catch(err =>
                this.setState({ open: true, message: 'Error when saving' })
            )
    }
    handleClose = (event, reason) => {
        this.setState({ open: false });
    };
    //页面样式list字段配置
    render() {
        const columns = [{
            Header: 'tEMPLATE_ID',
            accessor: 'tEMPLATE_ID',
            Cell: this.renderEditable
        }, {
            Header: '输入框',
            accessor: 'uSER_ID',
            Cell: this.renderEditable
        }, {
            Header: '下拉框',
            accessor: 'tEMPLATE_SELECT',
            Cell: this.renderEditable
        }, {
            Header: '日期',
            accessor: 'tEMPLATE_DATE',
            Cell: this.renderEditable
        }, {
            Header: '日期时间',
            accessor: 'tEMPLATE_DATETIME',
            Cell: this.renderEditable
        }, {
            Header: '单选',
            accessor: 'tEMPLATE_RADIO',
            Cell: this.renderEditable
        }, {
            Header: '多选',
            accessor: 'tEMPLATE_CHECKBOX',
            Cell: this.renderEditable
        }, {
            Header: '文本框',
            accessor: 'tEMPLATE_TEXTAREA',
            Cell: this.renderEditable
        }, {
            id: 'updatePagebutton',
            sortable: false,
            filterable: false,
            width: 100,
            Cell: ({ row }) =>
                (<EditTemplate editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} />)                
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            Cell: ({ row }) => (<Button size="small" variant="text" color="primary" onClick={() => { this.confirmDelete(row.tEMPLATE_ID) }}>Delete</Button>)
        }
        ];
        const currentPath = this.props.location.pathname;
        return (
            <div className="App">
                <Topbar currentPath={currentPath} />
                <Grid container>
                    <Grid item><AddTemplate addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} /></Grid>
                </Grid>                              
                <ReactTable data={this.state.templates} columns={columns}
                    filterable={true} />
                <Snackbar
                    style={{ width: 300, color: 'green' }}
                    open={this.state.open} onClose={this.handleClose}
                    autoHideDuration={1500} message={this.state.message} />
            </div>
        );
    }
}

export default Template;