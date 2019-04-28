import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Topbar from '../Topbar';
import LoanOriginal from './LoanOriginal'
import BorrowOriginal from './BorrowOriginal'
import OriginalTableHead from './OriginalTableHead';
import OriginalProcessRecords from './OriginalProcessRecords';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import AddOriginal from './AddOriginal.js';
import OriginalConfirmed from './OriginalConfirmed.js';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import { SERVER_URL } from '../../constants.js';
import './styles/Original.css'

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
      data: [
      ],
      page: 0,
      rowsPerPage: 5,
      total: 0,
      message: '',
      open: false,
      companyInformationId: ''

    };
  }
  // 保存id
  componentWillMount() {
    // console.log(typeof(this.props.location.query.companyInformationId))
    let recvParam;
    if (this.props.location.query != undefined) {
      recvParam = this.props.location.query.companyInformationId
      sessionStorage.setItem('data', recvParam);
    } else {
      recvParam = sessionStorage.getItem('data');
    }
    this.setState({
      companyInformationId: recvParam
    })
  }
  // componentWillUpdate =()=>{
  //   this.state.companyInformationId=this.props.location.query.companyInformationId
  // }

  componentDidMount = () => {
    this.fetchTemplate();
  }
  //提示框的显示判断
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  // 新增
  addTemplate(params) {
    let original = new FormData()
    if (params) {
      for (let key in params) {
        original.append(key, params[key])
      }
    }
    console.log(params)
    fetch(SERVER_URL + '/original/save',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: original
      }
    )
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))

  }
  //修改
  editTemplate(params) {
    console.log(params)
    let companyInformationVo = new FormData()
    if (params) {
      for (let key in params) {
        companyInformationVo.append(key, params[key])
      }
    }
    console.log(companyInformationVo)
    fetch(SERVER_URL + '/companyInformation/edit',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: companyInformationVo
      })
      .then(res => this.fetchTemplate())
      .catch(err => console.error(err))
  }
  //删除
  onDelClick = (id) => {
    fetch(SERVER_URL + '/original/delete/' + id,
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
  //分页
  fetchTemplate = () => {   
    let originalQueryVo = new FormData();
    originalQueryVo.append("companyInformationId", this.state.companyInformationId)
    originalQueryVo.append("pageNum", this.state.page + 1)
    originalQueryVo.append("pageSize", this.state.rowsPerPage)
    fetch(SERVER_URL + '/original/list', {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },
      body: originalQueryVo
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData.data.list,
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
      this.setState(state => ({ selected: state.data.map(n => n.originalId) }));
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
    console.log(event)
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
    let linkReadonlyStyle = { backgroundColor: 'D1D1D1', color: '#ffffff', height: '36px' }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
    const currentPath = this.props.location.pathname;
    return (
      <Paper className={classes.root}>
        <Topbar currentPath={currentPath} />
        <div className={classes.tableWrapper}>
          <font>原件详情列表</font>
        </div>
        <Grid container>
          <div className="QueryTemplate">
            <Grid item><AddOriginal addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} companyInformationId={this.state.companyInformationId} /></Grid>
          </div>
        </Grid>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            {/* 头列表页组件展示 */}
            <OriginalTableHead
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
                  const isSelected = this.isSelected(n.originalId);
                  // 便利显示列表页面
                  return (
                    <TableRow
                      className=""
                      hover
                      onClicock={event => this.handleClick(event, n.originalId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.originalId}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell className="TableCell" component="th" scope="row" align="center" padding="none">{n.originalName}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none">{n.originalHolder}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none">{n.originalHoldStatus}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none">{n.remark}</TableCell>
                      <TableCell className="TableCell" align="center" padding="none"><OriginalProcessRecords id={n.originalId} /></TableCell>
                      <TableCell className="TableCell" align="center" padding="none">
                        {n.hasLoanOutAuthorized ? (
                          <LoanOriginal id={n.originalId} fetchTemplate={this.fetchTemplate}/>
                        ) : (
                            <Button size="small" style={linkReadonlyStyle} variant="text" disabled="true">借出</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none">
                        {n.hasLoanInAuthorized ? (
                          <BorrowOriginal id={n.originalId} fetchTemplate={this.fetchTemplate}/>
                        ) : (
                            <Button size="small" style={linkReadonlyStyle} variant="text" disabled="true">借入</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none">
                        {n.hasLoanOutConfirmed ? (
                          <OriginalConfirmed id={n.originalId} fetchTemplate={this.fetchTemplate}/>
                        ) : (
                            <Button size="small" style={linkReadonlyStyle} variant="text" disabled="true">确认</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCell" align="center" padding="none"><Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.originalId) }}>删除</Button></TableCell>
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
