import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'
import Template from './components/template/Template'
import Demo from './components/demo/Demo'
import CompanyInformation from './components/companyInformation/CompanyInformation'
import followUpProcess from './components/followUpProcess/FollowUpProcess'
import Original from './components/original/Original'
import OriginalProcessRecords from './components/original/OriginalProcessRecords'
import PrivilegeManagement from './components/privilegeManagement/PrivilegeManagement'
import privilegeSubordinate from './components/privilegeSubordinate/PrivilegeSubordinate'
import SocialSecurity from './components/socialsecurity/SocialSecurity'
export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/template' component={Template} />
        <Route exact path='/Demo' component={Demo} />
        <Route exact path='/companyInformation' component={CompanyInformation} />
        <Route exact path='/followUpProcess' component={followUpProcess} />
        <Route exact path='/Original' component={Original} />
        <Route exact path='/OriginalProcessRecords' component={OriginalProcessRecords} />
        <Route exact path='/PrivilegeManagement' component={PrivilegeManagement} />
        <Route exact path='/privilegeSubordinate' component={privilegeSubordinate} />
        <Route exact path='/socialSecurity' component={SocialSecurity}/>
      </Switch>
    </ScrollToTop>
  </HashRouter>
)
