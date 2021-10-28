import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import composeStyles from '../utils/composeStyles';
import { AppTheme } from '../utils/colors';
import MenuIcon from '@material-ui/icons/Menu';
import './NavMenu.css';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: AppTheme.navBg,
  },
  navLink: {
    color: AppTheme.navText,
    '&:hover, &:focus': {
      color: AppTheme.navTextHovered,
    },
  },
  logo: {
    color: AppTheme.navText,
    fontSize: '1.5em',
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
});

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
          <Container>
            <NavbarBrand
              tag={Link}
              className={composeStyles([
                classes.logo,
                //'mx-auto',
              ])}
              to="/">
              LP NU
            </NavbarBrand>

            <MenuIcon
              onClick={this.toggle}
              className={composeStyles([
                classes.hamburger,
                'd-sm-none',
              ])}
              fontSize="large"
            />

            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className={classes.navLink} to="/">Home</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className={classes.navLink} to="/counter">Counter</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} className={classes.navLink} to="/fetch-data">Fetch data</NavLink>
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
