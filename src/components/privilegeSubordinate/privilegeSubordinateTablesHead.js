import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import './styles/privilegeSubordinate.css'

//第一列的标题
{/*
numeric:控制对应对应span内容位置
disablePadding：控制padding
*/}

const rows = [
  { id: 'staffName', numeric: true, disablePadding: false, label: '姓名' },
  { id: 'username', numeric: true, disablePadding: false, label: 'username' },
  {
    id: 'updatePagebutton',
    numeric: false,
    disablePadding: false,
    label: '查询',

    // Cell: ({ row }) =>
    //   (<SeeFollowUpProcess fetchFollowUpProcess={this.fetchFollowUpProcess} templeteId={row.tEMPLATE_ID} ></SeeFollowUpProcess>)
  },
  {
    id: 'deletePagebutton',
    numeric: false,
    disablePadding: false,
    label: '删除',
  }
];

// 列表头的渲染
class PrivilegeSubordinateTablesHead extends React.Component {
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow  >
          {rows.map(
            row => (
              <TableCell
                className="PrivilegeHeadCell"
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
PrivilegeSubordinateTablesHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default PrivilegeSubordinateTablesHead