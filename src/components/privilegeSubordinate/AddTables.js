import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SERVER_URL } from '../../constants.js';
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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import './styles/privilegeSubordinate.css'
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

  const userrows = [
    { id: 'name', numeric: false, disablePadding: true, label: '姓名' },
    { id: 'calories', numeric: true, disablePadding: false, label: '电话' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'number' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'number' },

  ];
  const privilerows = [
    { id: 'name', numeric: false, disablePadding: true, label: '名称' },
    { id: 'type', numeric: true, disablePadding: false, label: '类型' },
    { id: 'subtype', numeric: true, disablePadding: false, label: '子类型' },
    { id: 'code', numeric: true, disablePadding: false, label: 'code' },
  ];

class AddTablesHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
  
    let titleres = []
    if(this.props.processUrl ==='/usergroup/findUsersByUsergroup?usergroupId='){
      titleres = userrows
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
                className='AddTablesTitle'
                key={row.id}
                align="center"
                padding="none"
                // sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
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

AddTablesHead.propTypes = {
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
let addUserid = []
class AddTables extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      total:'',
    };
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
 //分页
 componentDidMount(){
   this.fetchTemplate()
 }
 fetchTemplate = () => {
  let RequestUrl = ''
  if(this.props.processUrl === '/usergroup/findUsersByUsergroup?usergroupId=' ){
      RequestUrl = '/usergroup/findUsersUnselected?usergroupId='
  }else{
      RequestUrl = '/usergroup/findPrivilegesUnselected?usergroupId='
  }
  let companyinformationQueryVo = new FormData();
  companyinformationQueryVo.append("pageNum", this.state.page + 1)
  companyinformationQueryVo.append("pageSize", this.state.rowsPerPage)
  fetch(SERVER_URL + RequestUrl + this.props.usergroupId, {
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
        data: responseData.data.list,
        // page: responseData.data.varList.pageNum - 1,
        // rowsPerPage: responseData.data.varList.pageSize,
        // total: responseData.data.varList.total
      });
    })
    .catch(err => console.error(err));
}
//选中当前要添加的用户

handisSelected=(userId)=>
{
  addUserid.push(userId)
  this.props.addTemplateData(addUserid)
}
  render() {
    if(this.props.emptyArray === false){
      addUserid=[]
    }
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page ,total} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <AddTablesHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              processUrl={this.props.processUrl}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.userId);
                  return (
                    this.props.processUrl==='/usergroup/findUsersByUsergroup?usergroupId='?
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.userId)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.userId}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} className='AddTablesTitle' onClick={()=>{this.handisSelected(n.userId)}} />
                      </TableCell>
                      <TableCell className='AddTablesTitle' component="th" scope="row" padding="none" align="center">{n.name}</TableCell>
                      <TableCell className='AddTablesTitle' padding="none" align="center">{n.phone}</TableCell>
                      <TableCell className='AddTablesTitle' padding="none" align="center">{n.number}</TableCell>
                      <TableCell className='AddTablesTitle' padding="none" align="center">{n.lastLogin}</TableCell>
                    </TableRow>
                      :
                     <TableRow
                     hover
                     onClick={event => this.handleClick(event, n.privilegeId)}
                     role="checkbox"
                     aria-checked={isSelected}
                     tabIndex={-1}
                     key={n.privilegeId}
                     selected={isSelected}
                     >
                     <TableCell padding="checkbox">
                       <Checkbox checked={isSelected}  className='AddTablesTitle' onClick={()=>{this.handisSelected(n.privilegeId)}} />
                     </TableCell>
                     <TableCell  className='AddTablesTitle' component="th" scope="row" padding="none" align="center">{n.name}</TableCell>
                     <TableCell  className='AddTablesTitle' padding="none" align="center">{n.type}</TableCell>
                     <TableCell  className='AddTablesTitle' padding="none" align="center">{n.code}</TableCell>
                     <TableCell  className='AddTablesTitle' padding="none" align="center">{n.tenantId}</TableCell>
                   </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
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

AddTables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTables);