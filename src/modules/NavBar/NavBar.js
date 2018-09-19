// import React from "react";
// import { Container, Menu } from "semantic-ui-react";

// export default class NavigationMenu extends React.Component {
//   state = { fixed: false }
//   constructor(props){
//     super(props);
//     this.handleScroll = this.handleScroll.bind(this);
//   }
//   componentDidMount() {
//     window.addEventListener('scroll', this.handleScroll);
//   }

// componentWillUnmount() {
//     window.removeEventListener('scroll', this.handleScroll);
// }

// handleScroll(event) {
//     this.setState({
//       fixed: window.scrollY > 439
//     });
// }
//   render(){
//     return(
//       <nav>
//         <Menu className={this.state.fixed ? "top fixed" : ""} style={{background: "#ebdac6"}} size="big">
//           <Container>
//             <Menu.Item as="a" href="#">Pano</Menu.Item>
//             <Menu.Item as="a" href="#">Yapılacaklar</Menu.Item>
//             <Menu.Item as="a" href="#">Alışveriş</Menu.Item>
//             <Menu.Item as="a" href="#">Hizmetler</Menu.Item>
//             <Menu.Item as="a" href="#">Davetli Listesi</Menu.Item>
//             <Menu.Item as="a" href="#">Takvim</Menu.Item>
//           </Container>
//         </Menu>
//       </nav>
//     );
//   }
// }

import { AppBar, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import StarIcon from '@material-ui/icons/Star';
import _ from "lodash";
import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./NavBar.css";


const drawerWidth = 240;
const nav = [
  { text: "PANO", url: "/" },
  { text: "YAPILACAKLAR", url: "/tasks" },
  { text: "ALIŞVERİŞ", url: "/shopping" },
  { text: "HİZMETLER", url: "/services" },
  { text: "DAVETLİ LİSTESİ", url: "/guests" },
  { text: "TAKVİM", url: "/calendar" },
]

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class NavBar extends React.Component {
  state = {
    mobileOpen: false,
    tab: nav.indexOf(nav.filter(i => i.url === this.props.location.pathname)[0]),
    fixed: false,
  };
    constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
      }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(event) {
        this.setState({
          fixed: window.scrollY > document.querySelector(".Hero").offsetHeight
        });
    }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleTabSwitch = index => {
    this.setState({tab: index})
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <List>
        {nav.map(i => 
        <ListItem 
          button
          key={_.uniqueId()}
          component={Link}
          to={i.url}
          onClick={this.handleDrawerToggle}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={i.text} />
        </ListItem> )}
        </List>        
      </div>
    );

    return (
      <React.Fragment>
        <AppBar position={this.state.fixed ? "fixed": "static"} style={{background: "#ffefdc", color: "#ff6e6e"}} id="NavBar">
        <div className="ui container">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Menüyü aç"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.navIconHide}>
                Menü
              </Typography>
              <Hidden smDown implementation="css">
                <Tabs value={this.state.tab}>
                  { nav.map((i, ind) => 
                      <Tab
                        component={Link}
                        to={i.url}
                        label={i.text} 
                        key={_.uniqueId()} 
                        onClick={() => this.handleTabSwitch(ind)}  
                        className="NavBarItem"
                      />
                    ) }
                </Tabs>
              </Hidden> 
            </Toolbar>
          </div>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </React.Fragment>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(NavBar));