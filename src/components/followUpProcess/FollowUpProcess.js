import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Topbar from '../Topbar';
import SeeFollowUpProcess from './SeeFollowUpProcess.js';
import QueryFollowUpProcess from './QueryFollowUpProcess.js';
import EnhancedTableHead from './FollowUpProcessTableHead.js';
import Grid from '@material-ui/core/Grid';
import { SERVER_URL } from '../../constants.js'
import './styles/FollowUpProcess.css'
// 对应列表项的id

//整体样式
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map(el => el[0]);
}
class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      total: 0,
      message: '',
      open: false,
      procInstId: '',
      NewresponseData: {},
      valueInput: '',
      processUrl: '/commerce/listProcessByUser',
      map:[]
    };
  }  
  //根据选择业务类型跳转页面
  handleUrl = (val) => {
    this.setState({ processUrl: val }, () => {
      this.state.page = 0
      this.fetchTemplate()
    })
  }
  //公司名称查询
  handleValue = (val) => {
    this.setState({ valueInput: val }, () => {
      this.fetchTemplate()
    })

  }
  //按钮搜索查询
  handleSearch = (val) => {
    this.fetchTemplate()

  }
  


  //组件御载时触发
  componentDidMount = () => {

    this.fetchTemplate();
  }
  //提示框的显示判断
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };


  //分页
  fetchTemplate = (processUrl) => {
      let followUpVo = new FormData();
      followUpVo.append("pageNum", this.state.page + 1)
      followUpVo.append("pageSize", this.state.rowsPerPage)
      followUpVo.append("companyName", this.state.valueInput)
      fetch(SERVER_URL + this.state.processUrl, {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: followUpVo
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          this.setState({
            data: responseData.data.list,
            map:responseData.data.map,
            page: responseData.data.pageNum - 1,
            rowsPerPage: responseData.data.pageSize,
            total: responseData.data.total
          });
        })
        .catch(err => console.error(err));
    }

  //clickbox相关函数
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.tEMPLATE_ID) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };
  // 页面更改时触发回调
  handleChangePage = (event, page) => {
    this.state.page = page;
    this.fetchTemplate();
  };
  // 每页的行数更改时触发回调
  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.fetchTemplate();
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render() {
    let linkStyle = { backgroundColor: '#c9302c', color: '#ffffff', height: '36px' }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
    const currentPath = this.props.location.pathname;
    return (
      <Paper className={classes.root}>
        <Topbar currentPath={currentPath} />
        <Grid container>
          <div className="QueryFollowUpProcess">
            <div className="QueryFollowUpProcessInto" >
              <QueryFollowUpProcess map={this.state.map} handleUrl={this.handleUrl} handleValue={this.handleValue} handleSearch={this.handleSearch} NewresponseData={this.state.NewresponseData} />
            </div>
          </div>
        </Grid>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            {/* 头列表页组件展示 */}
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={this.state.total}
            />
            <TableBody >
              {/* {stableSort(data, getSorting(order, orderBy)) */}
              {stableSort(data)
                .slice(0, rowsPerPage)
                .map(n => {
                  // 遍历显示列表页面
                  return (
                    <TableRow
                      hover
                      onClicock={event => this.handleClick(event, n.excutionId)}
                      role="checkbox"
                      key={n.excutionId}
                    >
                      <TableCell className="TableCell" align="center" padding="none" title={n.companyName}>{n.companyName}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.contractDate}>{n.contractDate}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.signPerson}>{n.signPerson}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.customer}>{n.customer}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.businessTypes}>{n.businessTypes}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.actName}>{n.actName}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none" title={n.actAssignee}>{n.actAssignee}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none"  ><SeeFollowUpProcess  fetchFollowUpProcess={this.fetchFollowUpProcess} procInstId={n.procInstId} /></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}

            </TableBody>
            <Snackbar
              style={{ width: 300, color: 'green' }}
              open={this.state.open}
              onClose={this.handleClose}
              autoHideDuration={1500}
              message={this.state.message}
            />
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.total}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
