import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import SeeFollowUpProcess from './SeeFollowUpProcess.js';
import './styles/FollowUpProcess.css'

//第一列的标题
{/*
numeric:控制对应对应span内容位置
disablePadding：控制padding
*/}

const rows = [
  { id: 'companyName', numeric: true, disablePadding: false, label: '公司名称' },
  { id: 'contractDate', numeric: true, disablePadding: false, label: '签单时间' },
  { id: 'signPerson', numeric: true, disablePadding: false, label: '签单人' },
  { id: 'customer', numeric: true, disablePadding: false, label: '联系人' },
  { id: 'businessTypes', numeric: true, disablePadding: false, label: '业务类型' },
  { id: 'actName', numeric: true, disablePadding: false, label: '当前流程节点' },
  { id: 'actAssignee', numeric: true, disablePadding: false, label: '当前流程处理人' },
  {
    id: 'updatePagebutton',
    numeric: false,
    disablePadding: false,
    label: '流程信息',

    Cell: ({ row }) =>
      (<SeeFollowUpProcess fetchFollowUpProcess={this.fetchFollowUpProcess} templeteId={row.tEMPLATE_ID} ></SeeFollowUpProcess>)
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
                className="FollowTableCell"
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