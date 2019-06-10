import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../constants.js'
import EditPrivilegeSubordinate from './EditPrivilegeSubordinate'
import { withStyles } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { confirmAlert } from 'react-confirm-alert';
import './styles/privilegeSubordinate.css'
let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

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
  // stabilizedThis.sort((a, b) => {
  //   const order = cmp(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  
}

const users = [
  { id: 'name', numeric: false, disablePadding: true, label: '姓名' },
  { id: 'phone', numeric: true, disablePadding: false, label: '电话' },
  { id: 'emine', numeric: true, disablePadding: false, label: '邮箱' },
  { id: 'query', numeric: true, disablePadding: false, label: '最后登录' },
  // { id: 'delete', numeric: true, disablePadding: false, label: '删除' },
];
const privilerows = [
  { id: 'name', numeric: false, disablePadding: true, label: '名称' },
  { id: 'type', numeric: true, disablePadding: false, label: '类型' },
  { id: 'subtype', numeric: true, disablePadding: false, label: '子类型' },
  { id: 'query', numeric: true, disablePadding: false, label: 'code' },
  { id: 'suoshu', numeric: true, disablePadding: false, label: '所属' },
];
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    let titleres = []
    if(this.props.processUrl ==='/usergroup/findUsersByUsergroup?usergroupId='){
      titleres = users
    }else{
      titleres = privilerows
    }
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {titleres.map(
            row => (
              <TableCell
                className={this.props.processUrl ==='/usergroup/findUsersByUsergroup?usergroupId='?'PrivilegTableCellUserTitle':'PrivilegTableCellPrivilegTitle'}
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
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              {/* <DeleteIcon  onClick={confirmDelete}/> */}
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
let Userids =[]
class PrivilegeSubordinateTablesHead extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [],
      page: 0,
      total: 0,
      rowsPerPage: 5,
      processUrl:this.props.processUrl,
      usergroupId:'',
      UseridsState:[]
    };
    this.fetchTemplate = this.fetchTemplate.bind(this)
    this.editTemplate  = this.editTemplate.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
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
    let newSelected = []
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
    this.state.page = page;
    this.fetchTemplate()
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.fetchTemplate()
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount(){
    this.props.onRef(this)
    this.fetchTemplate()
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.processUrl !==this.props.processUrl  ){
      return false
    }else{
      return true
    }
  }
  //父组件porps改变之后执行
  componentWillReceiveProps=(nextProps)=>{
    this.setState({usergroupId:nextProps.usergroupId},()=>{
      this.fetchTemplate()
    })
  }
  fetchTemplate = () => {
    this.setState({
      data: []
    })
    let followUpVo = new FormData();
    followUpVo.append("pageNum", this.state.page + 1)
    followUpVo.append("pageSize", this.state.rowsPerPage)
    followUpVo.append("companyName", this.state.valueInput)
    fetch(SERVER_URL + this.props.processUrl + this.state.usergroupId, {
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
          map:responseData.data.map,
          page: responseData.data.pageNum - 1,
          rowsPerPage: responseData.data.pageSize,
          total: responseData.data.total
        },()=>{this.render()});
      })
      .catch(err => console.error(err));
  } 
  
  //修改权限
  editTemplate(params) {
    let privilegeInformationVo = new FormData()
    if (params) {
      for (let key in params) {
        privilegeInformationVo.append(key, params[key])
      }
    }
    fetch(SERVER_URL + '/privilege/update',
      {
        mode: "cors",
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Accept': 'application/json,text/plain,*/*'
        },
        body: privilegeInformationVo
      })
      .then(res => { 
        this.fetchTemplate()
      })
      .catch(err => console.error(err))
  }
  //多选删除
  handisUserSelectDelete=(e,addUserid)=>
  { 
    if(e.target.checked === true){
      Userids.push(addUserid)
      this.setState({UseridsState:Userids},()=>{
      })  
    }else{
      Userids.splice(addUserid,1)
      this.setState({UseridsState:Userids},()=>{
      })
    }
  }
  //确认是否删除
  confirmDelete = () => {
    confirmAlert({
      message: '确认是否删除?',
      buttons: [
        {
          label: '是',
          onClick: () => this.onDelClickCheckbox()
        },
        {
          label: '否',
        }
      ]
    })
  }
  render(){
    let linkStyle = { backgroundColor: '#2196F3', color: '#ffffff', height: '36px' }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page ,total} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log(this.state.UseridsState)
    return (
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
              rowCount={data.length}
              processUrl ={this.props.processUrl}
              confirmDelete={this.confirmDelete}
            />
       
          <TableBody>
           { 
            (this.props.processUrl == '/usergroup/findUsersByUsergroup?usergroupId=')?
              stableSort(data).slice(0, rowsPerPage).map((n,index) => {
               const isSelected = this.isSelected(n.userId); 
               return (
                 <TableRow
                   className="PrivilegTableCellUser"
                   style={{width:'100%'}}
                   onClick={event => this.handleClick(event, n.userId)}
                   role="checkbox"
                   aria-checked={isSelected}
                   tabIndex={-1}
                   key={n.userId}
                   selected={isSelected}
                 >
                   <TableCell className="PrivilegTableCellUser" padding="checkbox">
                       <Checkbox key={index} checked={isSelected} onChange={(e)=>{this.handisUserSelectDelete(e,n.masterAccessOperationMappingId)}} />
                   </TableCell>
                   <TableCell className="PrivilegTableCellUser" align="center" padding="none"component="th" scope="data" key={index} >{n.name} </TableCell>
                   <TableCell className="PrivilegTableCellUser" align="center" padding="none" key={index}>{n.phone}</TableCell>
                   <TableCell className="PrivilegTableCellUser" align="center" padding="none" key={index}>{n.email}</TableCell>
                   <TableCell className="PrivilegTableCellUser" align="center" padding="none" key={index}>{n.lastLogin}</TableCell>
              {/* <TableCell className="PrivilegTableCell" align="center" padding="none" >
                     <Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.userId) }}>删除</Button>
                   </TableCell> */}
                 </TableRow>
               ); 
             })
             :
             stableSort(data)
               .slice(0, rowsPerPage)
                .map((n) => { 
                  const isSelected = this.isSelected(n.privilegeId); 
                  return (
                    <TableRow
                      className="PrivilegTableCellPrivileg"
                      onClick={event => this.handleClick(event, n.privilegeId)}
                      role="checkbox" 
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.privilegeId}
                      selected={isSelected}
                    >
                      <TableCell className="PrivilegTableCellPrivileg" padding="checkbox">
                          <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell className="PrivilegTableCellPrivileg" align="center" padding="none"component="th" scope="data" >{n.name} </TableCell>
                      <TableCell className="PrivilegTableCellPrivileg" align="center" padding="none" >{n.type}</TableCell>
                      <TableCell className="PrivilegTableCellPrivileg" align="center" padding="none" >{n.subType}</TableCell>
                      <TableCell className="PrivilegTableCellPrivileg" align="center" padding="none" >{n.code}</TableCell>
                      {/* <TableCell className="PrivilegTableCellPrivileg" align="center" padding="none" >
                        <EditPrivilegeSubordinate privilegeId={n.privilegeId} editTemplate={this.editTemplate}></EditPrivilegeSubordinate>
                      </TableCell>   */}
                      <TableCell className="PrivilegTableCellPrivileg" align="center" padding="none" >
                        <Button size="small" style={linkStyle} variant="text" color="primary" onClick={() => { this.confirmDelete(n.privilegeId) }}>所属</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
             }
             {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
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
    );
  }
}

PrivilegeSubordinateTablesHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivilegeSubordinateTablesHead);