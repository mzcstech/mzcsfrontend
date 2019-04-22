import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from './Menu';
import Button from '@material-ui/core/Button';
import Menu1 from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { SERVER_URL } from '../constants.js';
import MenuList from '@material-ui/core/MenuList';
const logo = require('../images/logo.svg');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  }
})

class Topbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      menuDrawer: false,
      menus: [],
      anchorEl: null
    };
  }
  
  componentWillMount() {
    this.fetchTemplate();
  }
  //获取菜单
  fetchTemplate = () => {
    fetch(SERVER_URL + '/index/init_menu', {
      mode: "cors",
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData.data[0].subMenu);
        this.setState({
          menus: responseData.data
        });
        //单级菜单数据回显
        responseData.data[0].subMenu.forEach(element => {
          var ele = {
            label: '', pathname: ''
          }
          ele.label = element.menu_NAME;
          ele.pathname = element.menu_URL;
          var isExist = false;
          // console.log(Menu)
          Menu.forEach(item => {
            if (item.label === ele.label) {
              isExist = true;
            }
          })
          if (!isExist) {
            Menu.push(ele);//将后台返回的菜单保存到menu中
          }
        });
      })
      .catch(err => console.error(err));
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {  
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  current = () => {
    if (this.props.currentPath === '/home') {
      return 0
    }
    if (this.props.currentPath === '/dashboard') {
      return 1
    }
    if (this.props.currentPath === '/signup') {
      return 2
    }
    if (this.props.currentPath === '/wizard') {
      return 3
    }
    if (this.props.currentPath === '/cards') {
      return 4
    }
    if (this.props.currentPath === '/template') {
      return 5
    }
    if (this.props.currentPath === '/demo') {
      return 6
    }


  }
  handleClick(menu_ID,event){
    // console.log("menu_ID") 
    // console.log(event.currentTarget)   
    // console.log(menu_ID) 
    // console.log("menu_ID") 
    this.state.menus.forEach(element => {
      if(element.menu_ID==menu_ID){
      element.anchorEl =event.currentTarget   
    }  
    });
    this.setState({ anchorEl: event.currentTarget });
    
  };

  handleClose = () => {
    this.state.menus.forEach(element => {
      element.anchorEl=null
    });
    this.setState({ anchorEl: null });
  };
  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    // console.log(this.state.menus);
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={24} alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to='/' className={classes.link}>
                    <img width={20} src={logo} alt="" />
                    <span className={classes.tagline}>Material Sense</span>
                  </Link>
                </Typography>
              </div>
              {!this.props.noTabs && (
                <React.Fragment>
                  <div className={classes.productLogo}>
                    <Typography>
                      A material UI Template
                        </Typography>
                  </div>
                  <div className={classes.iconContainer}>
                    <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                      <AppBar title="Menu" />
                      <List>
                        {Menu.map((item, index) => (
                          <ListItem component={Link} to={{ pathname: item.pathname, search: this.props.location.search }} button key={item.label}>
                            <ListItemText primary={item.label} />
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                    <Tabs
                      value={this.current() || this.state.value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      {Menu.map((item, index) => (
                          <Tab key={index} component={Link} to={{ pathname: item.pathname, search: this.props.location.search }} classes={{ root: classes.tabItem }} label={item.label} />

                      ))}


                      {this.state.menus.map((menu) => (
                        <Button
                          aria-owns={this.state.anchorEl ? menu.menu_ID : undefined}
                          aria-haspopup="true"
                          onClick={this.handleClick.bind(this,menu.menu_ID)}
                         >{menu.menu_NAME}</Button>             
                      ))}
                      
                      {this.state.menus.map((menu) => (
                      <Menu1
                        id={menu.menu_ID}
                        anchorEl={menu.anchorEl}
                        open={Boolean(menu.anchorEl)}
                        onClose={this.handleClose} >

                        {menu.subMenu.map((subMenu,index) => (                          
                            // <MenuItem onClick={this.handleClose} >{subMenu.menu_NAME}</MenuItem> 
                              <Tab key={index} component={Link} to={{ pathname: subMenu.menu_URL, search: this.props.location.search }} classes={{ root: classes.tabItem }} label={subMenu.menu_NAME} />
                        ))}    
                                     
                      </Menu1>
                    ))}

                      {/* <Button
                        aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                      >
                        Open Menu
                      </Button> */}

                      {/* <Menu1
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}                      >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                      </Menu1> */}
                    </Tabs>
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))
