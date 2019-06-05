import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditgeneralContract from './EditGeneralContract.js';
import ViewgeneralContract from './ViewGeneralContract.js';
import Button from '@material-ui/core/Button';
require('./styles/GeneralContract.css')
require('./styles/GeneralContractEnhancedTableHead.css')
//第一列的标题
{/*
numeric:控制对应对应span内容位置
disablePadding：控制padding
*/}

const rows = [
    { id: 'companyName', numeric: false, disablePadding: true, label: '客户名称' },    
    { id: 'contractType', numeric: true, disablePadding: false, label: '合同类型' },
    { id: 'contractCreateDate', numeric: true, disablePadding: false, label: '合同登记日' },
    { id: 'registerArea', numeric: true, disablePadding: false, label: '注册区域' },
    { id: 'contractDate', numeric: true, disablePadding: false, label: '合同签订日期' },    
    { id: 'contractPrice', numeric: true, disablePadding: false, label: '合同金额' },  
    { id: 'advancesReceived', numeric: true, disablePadding: false, label: '预收款' },  
    { id: 'finalPayment', numeric: true, disablePadding: false, label: '尾款' },      
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '查看',
        Cell: ({ row }) =>
            (<ViewgeneralContract fetchTemplate={this.fetchTemplate} generalContractId={row.generalContractId} ></ViewgeneralContract>)
    },
    {
        id: 'updatePagebutton',
        numeric: false,
        disablePadding: false,
        label: '修改',

        Cell: ({ row }) =>
            (<EditgeneralContract editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={row.generalContractId} />)
    },
    {
        id: 'delbutton',
        numeric: false,
        disablePadding: false,
        label: '删除',
        width: 70,
        Cell: ({ row }) => (<Button size="small" variant="text" color="primary" onClick={() => { this.confirmDelete(row.generalContractId) }}>删除</Button>)
    }
];

// 列表头的渲染
class GeneralContractEnhancedTableHead extends React.Component {
    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead>
                <TableRow  >
                  
                    {rows.map(
                        row => (
                            <TableCell
                                className="TableCellCUM"
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
GeneralContractEnhancedTableHead.propTypes = {
    //numSelected: PropTypes.number.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
   // onSelectAllClick: PropTypes.func.isRequired,
    //rowCount: PropTypes.number.isRequired,
};
export default GeneralContractEnhancedTableHead