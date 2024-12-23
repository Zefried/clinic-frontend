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
import { AddPatientRequest } from './Users/Components/Patient/CRUD/PatientRegistrationRequest';
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
import { ViewAssignedTest } from './Admin/Components/LabComponents/LabTests/ViewAssignedTest';
import { ViewInsertedTest } from './Admin/Components/LabComponents/LabTests/ViewInsertedTest';
import { AddPatientLocation } from './Users/Components/Patient/PatientLocation/AddPatientLocation';
import { ViewAllPatient } from './Users/Components/Patient/CRUD/ViewAllPatient';
import { ViewPatientLocation } from './Users/Components/Patient/PatientLocation/ViewPatientLocation';
import { PatientViewCard } from './Users/Components/Patient/CRUD/PatientViewCard';
import { ViewPatientFullInfo } from './Users/Components/Patient/CRUD/ViewPatientFullInfo';
import { AssignPatientStepOne } from './Users/Components/Patient/PatientAssigningFlow/AssignPatientStepOne';
import { AssignPatientStepTwo } from './Users/Components/Patient/PatientAssigningFlow/AssignPatientStepTwo';
import { AssignPatientStepThree } from './Users/Components/Patient/PatientAssigningFlow/AssignPatientStepThree';
import { ViewAssignedPatient } from './Users/Components/Patient/PatientAssigningFlow/ViewAssignedPatient';
import { HospitalLogin } from './Admin/Components/PublicComponents/HospitalLogin';
import { HospitalGuard } from './Admin/RouteGuards/HospitalGuard';
import { ViewAssignedPatientLab } from './LabHos/components/ViewAssignedPatientLab';
import { AssignPatientEntry } from './LabHos/components/AssignPatientEntry';
import { ViewPaidPatient } from './LabHos/components/ViewPaidPatient';
import { ViewPaidPatientBill } from './LabHos/components/ViewPaidPatientBill';
import { AssignedPatientFullInfo } from './LabHos/components/AssignedPatientFullInfo';
import { ViewLabHosDashboard } from './LabHos/components/ViewLabHosDashboard';
import { ViewPaidPatientToAdmin } from './Users/Components/Patient/PatientAssigningFlow/ViewPaidPatientToAdmin';



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
        <Route path="/hospital-login" element={<HospitalLogin/>} />       

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
              <Route path='view-inserted-test' element={<ViewInsertedTest/>}/>
              <Route path='view-assigned-test/:id' element={<ViewAssignedTest/>}/>



            {/* Ends here */}




            {/* Patient routes starts from here  */}
            <Route path='add-patient-request' element={<AddPatientRequest/>} />
            <Route path='view-all-patient' element={<ViewAllPatient/>} />
            






          </Route>














          <Route path="user" element={<UserRouteGuard>{<Home/>}</UserRouteGuard>}>
          
            {/* patient registration request through user panel - routes starts from here  */}
            <Route path='add-patient-request' element={<AddPatientRequest/>} />
            <Route path='view-all-patient' element={<ViewAllPatient/>} />


            {/* patient addition operations routes (edit / disable / card / full info) starts here */}
            <Route path='view-patient-card/:id' element={<PatientViewCard/>} />
            <Route path='view-patient-full-info/:id' element={<ViewPatientFullInfo/>} />

            {/* ends here */}

            
            {/* patient registration request through user panel - routes starts from here  */}
            <Route path='add-patient-location' element={<AddPatientLocation/>} />
            <Route path='view-patient-location' element={<ViewPatientLocation/>} />


            {/* Patient Assigning flow starts here  */}
            <Route path='assign-patient-step-one/:id' element={<AssignPatientStepOne/>} />
            <Route path='assign-patient-step-two' element={<AssignPatientStepTwo/>} />
            <Route path='assign-patient-step-three' element={<AssignPatientStepThree/>} />
                {/* view assigned patient data */}
                <Route path='view-assigned-patient' element={<ViewAssignedPatient/>} />
                <Route path='view-paid-patient' element={<ViewPaidPatientToAdmin/>} />

            {/* Patient Assigning flow ends here */}

          </Route>

          <Route path="lab" element={<LabRouteGuard>{<Home/>}</LabRouteGuard>}>
                <Route path='view-assigned-patient-lab' element={<ViewAssignedPatientLab />} />
                <Route path='view-paid-patient' element={<ViewPaidPatient />} /> 
                <Route path='assigned-patient-entry-lab/:id' element={<AssignPatientEntry />} /> 
                <Route path='view-assigned-patient-full-info/:id' element={<AssignedPatientFullInfo />} /> 

                {/* paid patient bill data  */}
                <Route path='view-paid-patient-bill/:id' element={<ViewPaidPatientBill />} /> 

                {/* dashboard route for both lab and hospital  */}
                <Route path='view-lab-dashboard' element={<ViewLabHosDashboard />} /> 
          
          </Route>


          <Route path="hospital" element={<HospitalGuard>{<Home/>}</HospitalGuard>}>
                <Route path='view-assigned-patient-hospital' element={<ViewAssignedPatientLab />} />
                <Route path='view-paid-patient' element={<ViewPaidPatient />} /> 
          </Route>

          
      </Routes>




    </div>
  );
}

export default App;
