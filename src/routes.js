import React,{Suspense,lazy} from 'react'
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
import ViewSocialSecurity from './components/socialsecurity/ViewSocialSecurity'
import HousingFund from './components/housingFund/HousingFund'
import GeneralContract from './components/generalContract/GeneralContract'
import PrivilegeController from './components/PrivilegeController/index'
import changeUserPribilege from './components/changeUserPribilege/index'

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
          <Route exact path='/viewSocialSecurity/:socialSecurityId' component ={ViewSocialSecurity}/>
          <Route exact path='/housingFund' component={HousingFund}/>
          <Route exact path='/generalContract' component={GeneralContract}/>
          <Route exact path='/PrivilegeController' component={PrivilegeController}/>
          <Route exact path='/changeUserPribilege' component={changeUserPribilege}/>
        </Switch> 
    </ScrollToTop>
  </HashRouter>
)
