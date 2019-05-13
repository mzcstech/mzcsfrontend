import React from 'react';
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
import AddCompanyInformation from './AddCompanyInformation.js';
import EditCompanyInformation from './EditCompanyInformation.js';
import ViewCompanyInformation from './ViewCompanyInformation.js';
import QueryCompanyInformationl from './QueryCompanyInformationl'
import CompanyInformationEnhancedTableHead from './CompanyInformationEnhancedTableHead.js';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { SERVER_URL } from '../../constants.js';
import './styles/CompanyInformation.css'
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
      QX: {
        add: "",
        edit: "",
        del: "",
        cha: ""
      },
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
      total: 0,
      message: '',
      open: false,
      TEMPLATE_ID: '',
      companyInformationgetCount: [],
      display_holdCount: 'none',
      display_loanInCount: 'none',
      display_outgoingCount: 'none',
      display_toBeConfirmedCount: 'none',
    };
  }
  componentWillMount() {
    this.companyInformationGetCount()
  }
  componentDidMount = () => {
    this.fetchTemplate();
    this.showhide()
  }
  //提示框的显示判断
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  //显示提示数量
  companyInformationGetCount() {
    fetch(SERVER_URL + '/companyInformation/getCount',
      {
        mode: "cors",
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
      }
    )
      .then((response) => response.json())
      .then(res => {
        this.setState({ companyInformationgetCount: res.data }, () => {
          if (this.state.companyInformationgetCount.holdCount != 0) {
            this.setState({ display_holdCount: 'flex' }, () => {
            })
          } else {
            this.setState({ display_holdCount: 'none' }, () => {
            })
          }
          if (this.state.companyInformationgetCount.outgoingCount != 0) {
            this.setState({ display_outgoingCount: 'flex' }, () => {
            })
          } else {
            this.setState({ display_outgoingCount: 'none' }, () => {
            })
          }
          if (this.state.companyInformationgetCount.loanInCount != 0) {
            this.setState({ display_loanInCount: 'flex' }, () => {
            })
          } else {
            this.setState({ display_loanInCount: 'none' }, () => {
            })
          }
          if (this.state.companyInformationgetCount.toBeConfirmedCount != 0) {
            this.setState({ display_toBeConfirmedCount: 'flex' }, () => {
            })

          } else {
            this.setState({ display_toBeConfirmedCount: 'none' }, () => {
            })
          }
        })
      })
      .catch(err => console.error(err))
  }

  // 新增
  addTemplate(params) {
    let companyinformationVo = new FormData()
    if (params) {
      for (let key in params) {
        companyinformationVo.append(key, params[key])
      }
    }
    console.log(companyinformationVo)
    fetch(SERVER_URL + '/companyInformation/save',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: companyinformationVo
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
    fetch(SERVER_URL + '/companyInformation/delete/' + id,
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
      message: '确认是否删除?',
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
  //跳转到原件管理List页面
  jumpToOriginalList = (id, name) => {
    //window.location.href='/#/original?companyInformationId='+id;    

    this.props.history.push({
      pathname: '/Original',
      query: {
        companyInformationId: id,
        companyName: name
      },
    })
  }

  //分页
  fetchTemplate = (companyName, originalHolder, originalOutStatus) => {
    this.setState({
      data: []
    })
    if (companyName == undefined && originalHolder == undefined && originalOutStatus == undefined) {
      companyName = ''
      originalHolder = ''
      originalOutStatus = ''
    }
    let companyinformationQueryVo = new FormData();
    companyinformationQueryVo.append("pageNum", this.state.page + 1)
    companyinformationQueryVo.append("pageSize", this.state.rowsPerPage)
    companyinformationQueryVo.append("companyName", companyName)
    companyinformationQueryVo.append("originalHolder", originalHolder)
    companyinformationQueryVo.append("originalOutStatus", originalOutStatus)
    fetch(SERVER_URL + '/companyInformation/list', {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },
      body: companyinformationQueryVo
    })
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          QX: {
            add: responseData.data.QX.add,
            edit: responseData.data.QX.edit,
            del: responseData.data.QX.del,
            cha: responseData.data.QX.cha
          },
          data: responseData.data.varList.list,
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
    console.log(event)
    this.state.page = page;
    this.fetchTemplate();
  };
  // 每页的行数更改时触发回调
  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.fetchTemplate();
  };
  //提示数字信息显示判断
  showhide() {

  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render() {
    let companyInformationgetCount = this.state.companyInformationgetCount
    let display_holdCount = this.state.display_holdCount
    let display_outgoingCount = this.state.display_outgoingCount
    let display_loanInCount = this.state.display_loanInCount
    let display_toBeConfirmedCount = this.state.display_toBeConfirmedCount
    let linkStyle = { backgroundColor: '#c9302c', color: '#ffffff', height: '36px' }
    let linkStyletwo = { backgroundColor: '#7087AD', color: '#ffffff', height: '36px' }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
    const currentPath = this.props.location.pathname;
    return (
      <Paper className={classes.root}>
        <Topbar currentPath={currentPath} />
        <AppBar style={{ height: '60px' }} position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography style={{ paddingLeft: '28px' }} variant="h7" color="inherit" noWrap>
              公司原件信息列表
              </Typography>
            <div className="QueryTemplateInto" >
              <QueryCompanyInformationl fetchTemplate={this.fetchTemplate} />
            </div>
          </Toolbar>
        </AppBar>
        <Grid container>
          <div className="QueryTemplate">
            <Grid item>
              {this.state.QX.add == "1" ? (
                <AddCompanyInformation addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} />
              ) : (
                  <Button size="small" style={linkStyle} variant="text" disabled="true" >新增</Button>
                )}

            </Grid>
            <div className="QueryTemplateInto" >
              <div style={{ display: display_holdCount }} className="QueryTemplateIntoNumber">
                <div>持有原件数量</div>
                <Badge className="Badgenumber" badgeContent={companyInformationgetCount.holdCount} max={99} color="secondary"></Badge>
              </div>
              <div style={{ display: display_outgoingCount }} className="QueryTemplateIntoNumber">
                <div>出库中数量</div>
                <Badge className="Badgenumber" badgeContent={companyInformationgetCount.outgoingCount} max={99} color="secondary"></Badge>
              </div>
              <div style={{ display: display_loanInCount }} className="QueryTemplateIntoNumber">
                <div>待借入数量</div>
                <Badge className="Badgenumber" badgeContent={companyInformationgetCount.loanInCount} max={99} color="secondary"></Badge>
              </div>
              <div style={{ display: display_toBeConfirmedCount }} className="QueryTemplateIntoNumber">
                <div>需确认条数</div>
                <Badge className="Badgenumber" badgeContent={companyInformationgetCount.toBeConfirmedCount} max={99} color="secondary"></Badge>
              </div>
            </div>
          </div>
        </Grid>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            {/* 头列表页组件展示 */}
            <CompanyInformationEnhancedTableHead
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
                  const isSelected = this.isSelected(n.tEMPLATE_ID);
                  // 便利显示列表页面
                  return (
                    <TableRow
                      className=""
                      hover
                      onClicock={event => this.handleClick(event, n.tEMPLATE_ID)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.tEMPLATE_ID}
                    >
                      <TableCell className="TableCellCUM" component="th" scope="row" align="center" padding="none" title={n.companyName}>{n.companyName}</TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none" title={n.originalListString}>{n.originalListString}</TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none" title={n.originalInformation}>{n.originalInformation}</TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none" title={n.remark}>{n.remark}</TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none"><Button size="small" style={linkStyletwo} variant="text" color="primary" onClick={() => { this.jumpToOriginalList(n.companyInformationId, n.companyName) }}>原件管理</Button></TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none">
                        {this.state.QX.cha == "1" ? (
                          <ViewCompanyInformation fetchTemplate={this.fetchTemplate} companyInformationId={n.companyInformationId} />
                        ) : (
                            <Button size="small" style={linkStyle} variant="text" disabled="true" >查看</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none">
                        {this.state.QX.edit == "1" ? (
                          <EditCompanyInformation editTemplate={this.editTemplate} fetchTemplate={this.fetchTemplate} companyInformationId={n.companyInformationId} />
                        ) : (
                            <Button size="small" style={linkStyle} variant="text" disabled="true" >修改</Button>
                          )}
                      </TableCell>
                      <TableCell className="TableCellCUM" align="center" padding="none">
                        {this.state.QX.del == "1" ? (
                          <Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.companyInformationId) }}>删除</Button>
                        ) : (
                            <Button size="small" style={linkStyle} variant="text" disabled="true" >删除</Button>
                          )}

                      </TableCell>
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
