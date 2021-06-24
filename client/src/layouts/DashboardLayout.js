import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, PageAlert, Page } from '../vibe';
import Logo from '../assets/images/vibe-logo.svg';
import nav from '../_nav';
import routes from '../views';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import { useHistory } from 'react-router-dom';

import { gql, useLazyQuery } from '@apollo/client';

import authCookies from '../util/authCookies';
import { AuthContext } from '../util/AuthContext';

import SiteLoading from '../views/util/SiteLoading';

const MOBILE_SIZE = 992;

const GET_OWN_PROFILE = gql`
  query getOwnProfile {
    getOwnProfile {
      email
      username
      admin
    }
  }
`;

function DashboardLayout(props) {
  const [getOwnProfile, { called, loading, data }] = useLazyQuery(GET_OWN_PROFILE, {
    onCompleted(result) {
      //DATA IS HERE
      console.log('data!');
      setNameOfUser(result.getOwnProfile[0].username);
      //check if user is admin
      if (result.getOwnProfile[0].admin) setAdmin(true);
      else setAdmin(false);
    },
    onError(err) {
      console.log(err);
    },
  });

  const [token, setToken] = useContext(AuthContext);
  const [nameOfUser, setNameOfUser] = useState();

  let history = useHistory();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);

  //is admin?
  const [admin, setAdmin] = useState(true); //TODO: do it smarter way

  //check if user is logged in
  useEffect(() => {
    console.log('Dashboard loaded!');
    //setting token context
    const Ctoken = authCookies.getAuthCookies();
    if (!Ctoken) return history.push('/login');
    setToken(Ctoken);

    //gets users info and check if token is valid
    getOwnProfile();
  }, []);

  var once = false; //TODO: make smarter
  useEffect(() => {
    if (once) if (!token) return history.push('/login');
    once = true;
    if (token === 'emergency') {
      history.push('/login');
      setToken(undefined);
    }
  }, [token]);

  function logOut() {
    authCookies.removeAuthCookies();
    setToken(undefined);
    history.push('/login');
  }

  const handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      setSidebarCollapsed(false);
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (isMobile && props.location.pathname !== props.location.pathname) {
      toggleSideCollapse();
    }
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSideCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return <SiteLoading />;
  }
  return (
    <>
      <div className={`app ${sidebarCollapsed ? 'side-menu-collapsed' : ''}`}>
        <PageAlert />
        <div className="app-body">
          <SidebarNav
            nav={nav}
            logo={Logo}
            logoText="School Tool"
            isSidebarCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSideCollapse}
            admin={admin}
            {...props}
          />
          <Page>
            <Header toggleSidebar={toggleSideCollapse} isSidebarCollapsed={sidebarCollapsed} routes={routes} {...props}>
              {/* header */}
              <React.Fragment>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    Signed in as: <b>{nameOfUser}</b>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/account">
                      Account
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={logOut}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </React.Fragment>
              {/* header end */}
            </Header>
            <PageContent>
              {/* This are the routes  TODO:*/}
              <Switch>
                {routes.map((page, key) =>
                  page.admin && admin === false ? null : (
                    <Route exact path={page.path} component={page.component} key={key} />
                  )
                )}
                <Redirect from="/" to="/home" />
              </Switch>
            </PageContent>
          </Page>
        </div>
        <Footer>
          <span>Copyright © {new Date().getFullYear()} TomixUG. All rights reserved.</span>
          <span className="ml-auto hidden-xs">
            <Link to="/privacy">Privacy Policy</Link>
          </span>
        </Footer>
      </div>
    </>
  );
}

export default DashboardLayout;
