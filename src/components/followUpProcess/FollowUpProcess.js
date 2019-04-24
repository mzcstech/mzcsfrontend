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
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import Topbar from '../Topbar';
import AddFollowUpProcess from './AddFollowUpProcess.js';
import EditFollowUpProcess from './EditFollowUpProcess.js';
import SeeFollowUpProcess from './SeeFollowUpProcess.js';
import QueryFollowUpProcess from './QueryFollowUpProcess.js';
import EnhancedTableHead from './FollowUpProcessTableHead.js';
import Button from '@material-ui/core/Button';
import { confirmAlert } from 'react-confirm-alert';
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
  constructor(props){
      super(props)
      this.state = {
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
        total:0,
        message: '',
        open: false,
        TEMPLATE_ID:'',
        NewresponseData:{}
      };
  }
  //render渲染前加载
  componentWillMount(){
    console.log('componentWillMount')
    let templateVo = new FormData()
    fetch(SERVER_URL + this.props.proc,
    {
        mode: "cors",
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': '*/*'                  
        },
        body: templateVo
    })
    .then((response) => response.json())
    .then((responseData) => {
       this.setState({
        NewresponseData:responseData.data.list
       }) 
    })
    .catch(err =>{
        console.log(err,'失败')
    })
  }

  //组件御载时触发
  componentDidMount= () => {
   
    this.fetchTemplate();
  }
//提示框的显示判断
handleClose = (event, reason) => {
  this.setState({ open: false });
};
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


//分页
fetchTemplate = () => {
  let followUpVo = new FormData();  
  followUpVo.append("pageNum",this.state.page+1) 
  followUpVo.append("pageSize",this.state.rowsPerPage) 
  fetch(SERVER_URL + '/commerce/listProcessByUser', {
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
          this.setState({
              data: responseData.data.list,
              page:responseData.data.pageNum-1,
              rowsPerPage:responseData.data.pageSize,
              total:responseData.data.total
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
    this.state.page=page;    
    this.fetchTemplate();
  };
// 每页的行数更改时触发回调
  handleChangeRowsPerPage = event => {    
    this.state.rowsPerPage=event.target.value;
    this.fetchTemplate();
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render() {
   
    let linkStyle = {backgroundColor: '#c9302c',color:'#ffffff',height:'36px'}
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.total - page * rowsPerPage);
    const currentPath = this.props.location.pathname;
    return (
      <Paper className={classes.root}>
      <Topbar currentPath={currentPath} />
        <Grid container>
            <div className="QueryFollowUpProcess">
                <Grid item><AddFollowUpProcess addTemplate={this.addTemplate} fetchTemplate={this.fetchTemplate} /></Grid>
                <div className="QueryFollowUpProcessInto" >
                    <QueryFollowUpProcess NewresponseData={this.state.NewresponseData} />
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
                  const isSelected = this.isSelected(n.procInstId);
                  // 便利显示列表页面
                  return (
                    <TableRow
                      hover
                      onClicock={event => this.handleClick(event, n.procInstId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.procInstId}
                      selected={isSelected}
                    >
                      <TableCell className="TableCell" align="center"   padding="none" title={n.procInstId}>{n.procInstId}</TableCell>
                      <TableCell className="TableCell" align="center"   padding="none"  title={n.companyName}>{n.companyName}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.contractDate}>{n.contractDate}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.signPerson}>{n.signPerson}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.customer}>{n.customer}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.businessTypes}>{n.businessTypes}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.actName}>{n.actName}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  title={n.actAssignee}>{n.actAssignee}</TableCell>
                      <TableCell className="TableCell" align="center"  padding="none"  ><SeeFollowUpProcess  fetchTemplate={this.fetchTemplate} templeteId={n.procInstId} /></TableCell>
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
          rowsPerPageOptions={[5, 10, 25 ]}
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