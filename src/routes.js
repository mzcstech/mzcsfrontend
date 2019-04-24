import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Main from './components/Main'
import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'
import Template from './components/template/Template'
import Demo from './components/demo/Demo'
import CompanyInformation from './components/companyInformation/CompanyInformation'
import followUpProcess from './components/followUpProcess/FollowUpProcess'
import Original from './components/original/Original'
export default props => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/wizard' component={Wizard} />
        <Route exact path='/cards' component={Cards} />
        <Route exact path='/template' component={Template} />
        <Route exact path='/Demo' component={Demo} />
        <Route exact path='/companyInformation' component={CompanyInformation} />
        <Route exact path='/followUpProcess' component={followUpProcess} />
        <Route exact path='/Original' component={Original} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
)
