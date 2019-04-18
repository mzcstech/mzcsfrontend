import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditTemplate from './EditTemplate.js';
import SeeTemplate from './SeeTemplate.js';
import Button from '@material-ui/core/Button';

require('./Template.css')
require('./styles/EnhancedTableHead.css')
//第一列的标题
{/*
numeric:控制对应对应span内容位置
disablePadding：控制padding
*/}

const rows = [
  { id: 'tEMPLATE_ID',      numeric: false,disablePadding: true,  label: 'tEMPLATE_ID' },
  { id: 'uSER_ID',          numeric: true, disablePadding: false, label: '输入框' },
  { id: 'tEMPLATE_SELECT',  numeric: true, disablePadding: false, label: '下拉框' },
  { id: 'tEMPLATE_DATE',    numeric: true, disablePadding: false, label: '日期' },
  { id: 'tEMPLATE_DATETIME',numeric: true, disablePadding: false, label: '日期时间' },
  { id: 'tEMPLATE_RADIO',   numeric: true, disablePadding: false, label: '单选' },
  { id: 'tEMPLATE_CHECKBOX',numeric: true, disablePadding: false, label: '多选' },
  { id: 'tEMPLATE_TEXTAREA',numeric: true, disablePadding: false, label: '文本框' },
  {
    id: 'updatePagebutton',
    numeric: false,
    disablePadding: false,
    label: '查看',
  
    Cell: ({ row }) =>
        (<SeeTemplate fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} ></SeeTemplate>)                
},
{
    id: 'updatePagebutton',
    numeric: false,
    disablePadding: false,
    label: '修改',
  
    Cell: ({ row }) =>
        (<EditTemplate editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={row.tEMPLATE_ID} />)                
}, 
{
    id: 'delbutton',
    numeric: false,
    disablePadding: false,
    label: '删除',
    width:70,
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
          <TableCell padding="checkbox" className="TableCellCheckbox">
            <Checkbox 
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
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
                  title="Sort"
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
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,

  rowCount: PropTypes.number.isRequired,
};
export default EnhancedTableHead