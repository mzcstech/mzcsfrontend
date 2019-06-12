import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import EditSocialSecurity from './EditSocialSecurity.js';
import ViewSocialSecurity from './ViewSocialSecurity.js';
import Button from '@material-ui/core/Button';
require('./styles/SocialSecurity.css')
require('./styles/SocialSecurityEnhancedTableHead.css')
//第一列的标题
{/*
numeric:控制对应对应span内容位置
disablePadding：控制padding
*/}

const rows = [
    { id: 'companyName', numeric: false, disablePadding: true, label: '公司名称' },
    { id: 'registeredArea', numeric: false, disablePadding: true, label: '注册区域' },
    { id: 'buyType', numeric: true, disablePadding: false, label: '购买类型' },
    { id: 'identityCardNumber', numeric: true, disablePadding: false, label: '已收身份证原件数量' },
    { id: 'saler', numeric: true, disablePadding: false, label: '签单人' },    
    {
        id: 'viewPagebutton',
        numeric: false,
        disablePadding: false,
        label: '查看',
        Cell: ({ row }) =>
            (<ViewSocialSecurity fetchTemplate={this.fetchTemplate} templeteId={row.socialSecurityId} ></ViewSocialSecurity>)
    },
    // {
    //     id: 'updatePagebutton',
    //     numeric: false,
    //     disablePadding: false,
    //     label: '修改',

    //     Cell: ({ row }) =>
    //         (<EditSocialSecurity editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} templeteId={row.socialSecurityId} />)
    // },
    // {
    //     id: 'delbutton',
    //     numeric: false,
    //     disablePadding: false,
    //     label: '删除',
    //     width: 70,
    //     Cell: ({ row }) => (<Button size="small" variant="text" color="primary" onClick={() => { this.confirmDelete(row.socialSecurityId) }}>删除</Button>)
    // }
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
                                className="socialsecurity"
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