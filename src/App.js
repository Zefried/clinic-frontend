import {Routes, Route} from 'react-router-dom';
import { Home } from './Admin/Layouts/Home';
import { Profile } from './Admin/Layouts/Profile';
import { Test } from './Admin/Layouts/test';
import { Sync } from './Admin/Layouts/sync';
import { Login } from './Authentication/login';
import { AddTeam } from './Admin/Components/testFunctions/AddTeam';
import { AdminRouteGuard } from './Admin/RouteGuards/AdminRouteGuard';
import { VerifyEmail } from './Admin/protected/VerifyEmail';
import { Register } from './Authentication/register';
import { RegistrationTest } from './Test/RegistrationTest';
import { AddDoctors } from './Admin/Components/DoctorRegistration/AddDoctors';
import { ViewDoctors } from './Admin/Components/DoctorRegistration/ViewDoctors';
import { FullInformation } from './Admin/Components/DoctorRegistration/FullInformation';
import { DocCredentials } from './Admin/Components/DoctorRegistration/DocCredentials';
import { EditDoctor } from './Admin/Components/DoctorRegistration/EditDoctor';
import { AdminRegister } from './Admin/protected/CustomAppState/AdminRegister';
import { AdminLogin } from './Admin/Components/PublicComponents/AdminLogin';
import { UserRouteGuard } from './Admin/RouteGuards/UserRouteGuard';
import { TestAdminMiddleware } from './Admin/Components/testFunctions/TestAdminMiddleware';
import { DocPharmaReq } from './Admin/Components/PublicComponents/DocPharmaReq';
import { ViewPendingAccounts } from './Admin/Components/Pending Accounts Registration/ViewPendingAccounts';
import { FullInfoPendingAccounts } from './Admin/Components/Pending Accounts Registration/FullInfoPendingAccounts';
import { EditPendingAccounts } from './Admin/Components/Pending Accounts Registration/EditPendingAccounts';



function App() {

  return (
    <div className="App">
      
      <Routes>
       
        <Route path="profile" element={<Profile/>} />
        <Route path="test" element={<Test/>} />
        <Route path="sync" element={<Sync/>} />
        
        <Route path="/" element={<VerifyEmail/>} />
        <Route path="login" element={<UserRouteGuard>{<Login />}</UserRouteGuard>} />

        <Route path='testOne' element={<AdminRouteGuard/>} />

        <Route>
          <Route path='/sign-up' element={<Register/>}/>
          <Route path='/test-reg' element={<RegistrationTest/>}/>
        </Route>


        {/* Project routes starts from here above were just for testing */}
        
        {/* hidden route for self-interest */}
        <Route path="/register/7827379352" element={<AdminRegister/>} /> 
        <Route path="/doc-pharma" element={<DocPharmaReq/>} /> 
        {/* Route for admin login */}
        <Route path="/admin-login" element={<AdminLogin/>} />

        {/* All admin routes starts from here and are protected */}

        <Route path="admin" element={<AdminRouteGuard>{<Home/>}</AdminRouteGuard> }>
        
          {/* Doctor and pharm registration through admin panel - routes starts from here  */}
          <Route path='add-team' element={<AddTeam/>} />
          <Route path='add-doctors' element={<AddDoctors/>}/>
          <Route path='view-doctors' element={<ViewDoctors/>}/>
          <Route path='full-information/:id' element={<FullInformation/>}/>
          <Route path='doc-credentials/:id' element={<DocCredentials/>}/>
          <Route path='edit-doctor/:id' element={<EditDoctor/>}/>

          {/* Doctor and pharm registration application request routes starts from here  */}
          <Route path='pending-accounts' element={<ViewPendingAccounts/>}/>
          <Route path='pending-accounts/full-info/:id' element={<FullInfoPendingAccounts/>}/>
          <Route path='edit/pending-accounts/:id' element={<EditPendingAccounts/>}/>

      

        </Route>



      </Routes>




    </div>
  );
}

export default App;
