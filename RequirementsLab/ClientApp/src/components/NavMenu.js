import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import composeStyles from '../utils/composeStyles';
import { AppTheme } from '../utils/colors';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './NavMenu.css';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: AppTheme.navBg,
  },
  navLink: {
    color: AppTheme.navText,
    '&:hover, &:focus': {
      color: AppTheme.navTextHovered,
    },
  },
  logoBar: {
    fontSize: '2em',
    color: AppTheme.navText,
    '&:hover, &:focus': {
      color: AppTheme.navTextHovered,
    },
  },
  hamburger: {
    color: AppTheme.navText,
    cursor: 'pointer',
    '&:hover, &:focus': {
      color: AppTheme.navTextHovered,
    },
  },
  logo: {
    height: '2.5em',
    margin: '0 0.5em',
  },
  topMenuGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  balancer: {
    width: '30px',
    height: '30px',
  },
  navigation: {
    flexGrow: '0',
    position: 'absolute',
    right: '0',
    [theme.breakpoints.down('xs')]: {
      position: 'unset',
    },
  },
  navContainer: {
    justifyContent: 'center !important',
    position: 'relative',
  },
}));

export class NavMenuComponent extends React.Component {
  state = {
      isOpen: false,
  };

  render() {
    const classes = this.props.classes;

    // navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3

    return (
      <header>
        <Navbar className={composeStyles([
          classes.navbar,
          'navbar-expand-sm',
          'navbar-toggleable-sm',
          'border-bottom',
          'box-shadow',
          'mb-3',
        ])}>
          <Container className={classes.navContainer}>
            <div className={classes.topMenuGroup}>
              <div className={classes.balancer} />

              <NavbarBrand
                tag={Link}
                className={composeStyles([
                  classes.logoBar,
                  //'mx-auto',
                ])}
                to="/">
                <img src="logo.jpg" alt="logo" className={classes.logo} />
              </NavbarBrand>

              <MenuIcon
                onClick={this.toggle}
                className={composeStyles([
                  classes.hamburger,
                  'd-sm-none',
                ])}
                fontSize="large"
              />
            </div>

            <Collapse className={composeStyles([
              "d-sm-inline-flex",
              "flex-sm-row-reverse",
              classes.navigation,
            ])} isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className={classes.navLink} to="/">Домівка</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className={classes.navLink} to="/tasks">Завдання</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className={classes.navLink} to="/profile"><AccountCircleIcon/></NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
}

export default function NavMenu() {
  const classes = useStyles();

  return (
    <NavMenuComponent classes={classes} />
  );
}
