import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditOriginal from './EditOriginal';
import ViewOriginal from './ViewOriginal';
import Button from '@material-ui/core/Button';

//第一列的标题
{/*
numeric:控制对应对应span内容位置
disablePadding：控制padding
*/}

const rows = [
    { id: 'companyName', numeric: false, disablePadding: true, label: '原件名称' },
    { id: 'originalListString', numeric: true, disablePadding: false, label: '当前持有人' },
    { id: 'tEMPLATE_SELECT', numeric: true, disablePadding: false, label: '持有状态' },
    { id: 'remark', numeric: true, disablePadding: false, label: '备注' },
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '修改',
        Cell: ({ row }) =>
            (<ViewOriginal fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} ></ViewOriginal>)
    },
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '流转记录',
        Cell: ({ row }) =>
            (<ViewOriginal fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} ></ViewOriginal>)
    },
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '借出',
        Cell: ({ row }) =>
            (<ViewOriginal fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} ></ViewOriginal>)
    },
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '借入',
        Cell: ({ row }) =>
            (<ViewOriginal fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} ></ViewOriginal>)
    },
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '确认',

        Cell: ({ row }) =>
            (<EditOriginal editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} />)
    },
    {
        id: 'delbutton',
        numeric: false,
        disablePadding: false,
        label: '删除',
        Cell: ({ row }) => (<Button size="small" variant="text" color="primary" onClick={() => { this.confirmDelete(row.tEMPLATE_ID) }}>删除</Button>)
    }
];

// 列表头的渲染
class EnhancedTableHead extends React.Component {
    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead>
                <TableRow  >
                  
                    {rows.map(
                        row => (
                            <TableCell
                                className="TableCell"
                                key={row.id}
                                align="center"
                                padding="none"
                            >
                                {/*hover提示字符*/}
                                <Tooltip
                                    title={row.label}
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    {/*hover排列箭头*/}
                                    <TableSortLabel
                                        className="TableSortLabel"
                                        hideSortIcon={true}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}
// 数据类型检测
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};
export default EnhancedTableHead