import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../constants.js';
import QueryPrivilegeManagement from './QueryPrivilegeManagement.js';
import { withRouter } from 'react-router-dom'
import EditPrivilegeManagement from './EditPrivilegeManagement'
import { confirmAlert } from 'react-confirm-alert';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';


let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: true, disablePadding: false, label: '名称' },
  { id: 'type', numeric: true, disablePadding: false, label: '类型' },
  { id: 'subtype', numeric: true, disablePadding: false, label: '子类型' },
  { id: 'subtype', numeric: true, disablePadding: false, label: '父节点' },
  { id: 'code', numeric: true, disablePadding: false, label: 'code' },
  { id: 'EditPrivilegeManagement', numeric: true, disablePadding: false, label: '修改' },
  { id: 'protein', numeric: true, disablePadding: false, label: '删除' },
  { id: 'Subordinate', numeric: true, disablePadding: false, label: '所属' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow >
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(    
            row => (
              <TableCell
                className="PrivilegTableCell"
                key={row.id}
                align="center"
                padding="none"
              >
                <Tooltip
                  title={row.label}
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>f
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip  title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

class TablesPrivilegeManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data:[],
            page:0,
            rowsPerPage: 5,
            map:[],
            NewqueryList:'',
            message:'',
            open: false,
        };
        this.filterFun     = this.filterFun.bind(this)
        this.fetchTemplate = this.fetchTemplate.bind(this)
    }

    componentDidMount=()=>{  
      this.fetchTemplate()
    }
   // 分页
   fetchTemplate = (queryList) => {
    let NewqueryList =[]
    NewqueryList.push(queryList)
    let followUpVo = new FormData();
    followUpVo.append("pageNum", this.state.page + 1)
    followUpVo.append("pageSize", this.state.rowsPerPage)
    fetch(SERVER_URL + '/usergroup/list', {
      mode: "cors",
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },
    })  
      .then((response) => response.json())
      .then((responseData)  => {
        console.log(responseData.data.list)
        if(queryList === null || queryList === undefined){
          this.setState({data: responseData.data.list},()=>{
          });
        }else{
            this.setState({data: NewqueryList},()=>{
          });   
        }
      })
      .catch(err => console.error(err));
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
 
  //跳转所属
  jumpToprivilegeSubordinate=(usergroupId)=>{
    this.props.history.push({
        pathname: '/PrivilegeSubordinate',
        query: {
          usergroupId: usergroupId,
        },
      })
  }   
   //提示框的显示判断
   handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  //左方树选择
  filterFun(){
      let state = this.state.data
      let newstate =[]
      for(var i=0;i<state.length;i++){
        if(state[i].name == this.props.label){
          // let NewparentId    = state[i].parentId  
          let NewUsergroupId = state[i].usergroupId
          for(var j=0;j<state.length;j++){
            if(state[j].usergroupId ==NewUsergroupId || state[j].parentId == NewUsergroupId){
                 newstate.push(state[j])
            }
          }
        }
      }
      return newstate
  }
  //确认是否删除
  confirmDelete = (id) => {
    let deleteID = []
    deleteID.push(id)
    confirmAlert({
      message: '确认是否删除?' + id,
      buttons: [
        {
          label: '是',
          onClick: () => this.onDelClick(deleteID)
        },
        {
          label: '否',
        }
      ]
    })
  }
  //删除
  onDelClick = (deleteID) => {
    fetch(SERVER_URL + '/usergroup/delete?ids=' + deleteID,
      { 
        mode: "cors",
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': '*/*',

        }
      })
      .then(res => {
        this.setState({ open: true, message: '删除成功' });
        this.fetchTemplate()
      })
      .catch(err => {
        this.setState({ open: true, message: 'Error when deleting' });
        console.error(err) 
      })
    }
    //修改
  // editTemplate(params) {
  //   let companyInformationVo = new FormData()
  //   if (params) {
  //     for (let key in params) {
  //       companyInformationVo.append(key, params[key])
  //     }
  //   }
  //   fetch(SERVER_URL + '/companyInformation/edit',
  //     {
  //       mode: "cors",
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Accept': 'application/json,text/plain,*/*'
  //       },
  //       body: companyInformationVo
  //     })
  //     .then(res => this.fetchTemplate())
  //     .catch(err => console.error(err))
  // }
  render() {
    let newData = this.filterFun()
    let linkStyle = { backgroundColor: '#c9302c', color: '#ffffff', height: '36px' }
    let linkStyletwo = { backgroundColor: '#7087AD', color: '#ffffff', height: '36px' }
    const { classes,label } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.data.length - page * rowsPerPage);
    return (
      <div>
        <div className="QueryPrivilegInto" >
          <QueryPrivilegeManagement fetchTemplate={this.fetchTemplate} />
        </div>
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.data.length}
            />
            <TableBody>
              {
                
                 stableSort((newData.length != 0 ? newData : data), getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => { 
                  const isSelected = this.isSelected(n.usergroupId); 
                  return (
                    <TableRow
                      className="PrivilegTableCell"
                      onClick={event => this.handleClick(event, n.usergroupId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.usergroupId}
                      selected={isSelected}
                    >
                      <TableCell className="PrivilegTableCell" padding="checkbox">
                         <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none"component="th" scope="row" >{n.name} </TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" >{n.type}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" >{n.subtype}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" >{n.parentId}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" >{n.code}</TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" ><EditPrivilegeManagement usergroupId={n.usergroupId}/></TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" >
                          <Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.usergroupId) }}>删除</Button>
                      </TableCell>
                      <TableCell className="PrivilegTableCell" align="center" padding="none" ><Button size="small" style={linkStyletwo} variant="text" color="primary"
                       onClick={() => { this.jumpToprivilegeSubordinate(n.usergroupId) }}>所属</Button></TableCell>
                    </TableRow>
                  );
                })
                }
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
          count={this.state.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
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
      </div>
    );
  }
}

TablesPrivilegeManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablesPrivilegeManagement);
