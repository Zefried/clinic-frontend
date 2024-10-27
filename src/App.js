import {Routes, Route} from 'react-router-dom';
import { Home } from './Admin/Layouts/Home';
import { Login } from './Authentication/login';
import { AdminRouteGuard } from './Admin/RouteGuards/AdminRouteGuard';
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
import { DocPharmaReq } from './Admin/Components/PublicComponents/DocPharmaReq';
import { ViewPendingAccounts } from './Admin/Components/Pending Accounts Registration/ViewPendingAccounts';
import { FullInfoPendingAccounts } from './Admin/Components/Pending Accounts Registration/FullInfoPendingAccounts';
import { EditPendingAccounts } from './Admin/Components/Pending Accounts Registration/EditPendingAccounts';
import { AddLab } from './Admin/Components/LabComponents/AddLab';
import { ViewLab } from './Admin/Components/LabComponents/ViewLab';
import { LabInformation } from './Admin/Components/LabComponents/LabInformation';
import { LabCred } from './Admin/Components/LabComponents/LabCred';
import { AutoCompleteSearch } from './Admin/Components/testFunctions/AutoCompleteSearch';
import { AddLabUser } from './Admin/Components/LabComponents/LabEmploye/AddLabUser';
import { DocLogin } from './Admin/Components/PublicComponents/DocLogin';
import { LabLogin } from './Admin/Components/PublicComponents/LabLogin';
import { LabRouteGuard } from './Admin/RouteGuards/LabRouteGuard';
import { AddPatientRequest } from './Users/Components/PatientRegistrationRequest';
import { ViewAllPatient } from './Users/Components/ViewAllPatient';
import { ViewPendingPatient } from './Users/Components/ViewPendingPatient';
import { ViewAllPatientsAdmin } from './Admin/Components/PatientComponents/ViewAllPatientsAdmin';
import { ViewPendingPatientsAdmin } from './Admin/Components/PatientComponents/ViewPendingPatientsAdmin';
import { AddLabTestCategory } from './Admin/Components/LabComponents/LabMaster/AddLabTestCategory';
import { AddLabTest } from './Admin/Components/LabComponents/LabMaster/AddLabTest';
import { ViewTestCategory } from './Admin/Components/LabComponents/LabMaster/ViewTestCategory';
import { ViewLabTest } from './Admin/Components/LabComponents/LabMaster/ViewLabTest';
import { EditLabTestCategory } from './Admin/Components/LabComponents/LabMaster/EditLabTestCategory';
import { EditLabTest } from './Admin/Components/LabComponents/LabMaster/EditLabTest';
import { PaginationComponent } from './Admin/Components/testFunctions/paginationModule';
import { Replica } from './Admin/Components/testFunctions/Replica';
import { CrudAdd } from './Admin/Components/testFunctions/RegisterCRUD/CrudAdd';
import { CrudView } from './Admin/Components/testFunctions/RegisterCRUD/CrudView';
import { CrudEdit } from './Admin/Components/testFunctions/RegisterCRUD/CrudEdit';
import { CrudFullInfo } from './Admin/Components/testFunctions/RegisterCRUD/CrudFullInfo';
import { CrudChangePsw } from './Admin/Components/testFunctions/RegisterCRUD/CrudChangePsw';
import { EditLab } from './Admin/Components/LabComponents/EditLab';
import { AssignEmployee } from './Admin/Components/LabComponents/LabEmploye/AssignEmployee';
import { ViewLabEmployee } from './Admin/Components/LabComponents/LabEmploye/ViewLabEmployee';
import { InsertLabTest } from './Admin/Components/LabComponents/LabTests/InsertLabTest';
import { AssignTestToLab } from './Admin/Components/LabComponents/LabTests/AssignTest';



function App() {

  // redirection based on role and authentication status code starts here


  // ends here

  return (
    <div className="App">
      
      <Routes>
       
     
      {/* these routes are not related to the project just for initial test */}
     
        <Route path="login" element={<UserRouteGuard>{<Login />}</UserRouteGuard>} />

        <Route path='pagination' element={<PaginationComponent/>} />
        <Route path='replica' element={<Replica/>} />
   


        <Route>
          <Route path='/sign-up' element={<Register/>}/>
          <Route path='/test-reg' element={<RegistrationTest/>}/>
        </Route>

      {/* Ends here */}













      {/* Project routes starts from here above were just for testing */}
        
        {/* hidden route for self-interest */}
        <Route path="/register/7827379352" element={<AdminRegister/>} /> 
        <Route path="/user-registration" element={<DocPharmaReq/>} /> 
        {/* Route for admin login */}
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/user-login" element={<DocLogin/>} />
        <Route path="/lab-login" element={<LabLogin/>} />

        {/* /// testing fastCompo routes */}
        <Route path='/crudAdd' element={<CrudAdd />} />
        <Route path='/crudView' element={<CrudView />} />
        <Route path='/crudEdit/:id' element={<CrudEdit />} />
        <Route path='/crudFullInfo/:id' element={<CrudFullInfo />} />
        <Route path='/crudPsw/:id' element={<CrudChangePsw />} />
        {/* /// ends here */}





        {/* All admin routes starts from here and are protected */}

          <Route path="admin" element={<AdminRouteGuard>{<Home/>}</AdminRouteGuard> }>
          
            {/* Doctor and pharm registration through admin panel - routes starts from here  */}
            <Route path='add-doctors' element={<AddDoctors/>}/>
            <Route path='view-doctors' element={<ViewDoctors/>}/>
            <Route path='full-information/:id' element={<FullInformation/>}/>
            <Route path='doc-credentials/:id' element={<DocCredentials/>}/>
            <Route path='edit-doctor/:id' element={<EditDoctor/>}/>



            {/* Doctor and pharm registration application request routes starts from here  */}
            <Route path='pending-accounts' element={<ViewPendingAccounts/>}/>
            <Route path='pending-accounts/full-info/:id' element={<FullInfoPendingAccounts/>}/>
            <Route path='edit/pending-accounts/:id' element={<EditPendingAccounts/>}/>



            {/* Lab registration routes starts from here  */}
            <Route path='add-lab' element={<AddLab/>}/>
            <Route path='view-lab' element={<ViewLab/>}/>
            <Route path='edit-lab/:id' element={<EditLab/>}/>
            <Route path='lab-full-info/:id' element={<LabInformation/>}/>
            <Route path='lab-credentials/:id' element={<LabCred/>}/>
            <Route path='auto' element={<AutoCompleteSearch/>}/>



          
            {/* Adding Master Routes Starts here  */}

              {/* Lab employee registration routes starts from here  */}
              <Route path='add-lab-user' element={<AddLabUser/>}/>
              <Route path='assign-employee/:id' element={<AssignEmployee/>}/>
              <Route path='view-lab-employee' element={<ViewLabEmployee/>}/>


              {/* Lab testCategory and test master routes starts from here  */}
              <Route path='add-lab-test-category' element={<AddLabTestCategory/>}/>
              <Route path='add-lab-test' element={<AddLabTest/>}/>
              <Route path='view-test-category' element={<ViewTestCategory/>}/>
              <Route path='view-lab-test' element={<ViewLabTest/>}/>

                    {/* Lab edit and update routes */}
                    <Route path='edit-lab-test-category/:id' element={<EditLabTestCategory/>}/>
                    <Route path='edit-lab-test/:id' element={<EditLabTest/>}/>

            {/* Ends here  */}


            {/* Inserting tests in lab and other Activity Routes starts here */}
              <Route path='insert-lab-test' element={<InsertLabTest/>}/>
              <Route path='assign-test-compo/:id' element={<AssignTestToLab/>}/>



            {/* Ends here */}




            {/* Patient routes starts from here  */}
            <Route path='add-patient-request' element={<AddPatientRequest/>} />
            <Route path='view-all-patient' element={<ViewAllPatientsAdmin/>} />
            <Route path='view-pending-patient' element={<ViewPendingPatientsAdmin/>} />






          </Route>














          <Route path="user" element={<UserRouteGuard>{<Home/>}</UserRouteGuard>}>

            {/* patient registration request through user panel - routes starts from here  */}
            <Route path='add-patient-request' element={<AddPatientRequest/>} />
            <Route path='view-all-patient' element={<ViewAllPatient/>} />
            <Route path='view-pending-patient' element={<ViewPendingPatient/>} />

          </Route>

          <Route path="lab" element={<LabRouteGuard>{<Home/>}</LabRouteGuard>}>

          </Route>


      </Routes>




    </div>
  );
}

export default App;
