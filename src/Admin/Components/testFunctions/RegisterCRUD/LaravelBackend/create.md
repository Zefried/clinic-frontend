







////////////////////////////////////////////////

Model Relationship Example Starts here

    public function googleAuthUser(){
        return $this->hasOne(GoogleAuthUser::class);
    }

    public function doctorUserData() {
        return $this->hasOne(Doctors_userData::class, 'user_id');
    }

    public function labAccount() {
        return $this->hasOne(LabModel::class, 'user_id');
    }


ends here

////////////////////////////////////////////////



















//////////////////////////////////////////////

Middleware example starts here


 public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if the user is not authenticated or doesn't have the 'user' role
        if (!$user || $user->role !== 'user') {
            return response()->json([
                'status' => 403,
                'message' => !$user ? 'User not found or not authenticated' : 'Unauthorized Access: User or Admin only',
            ], 403);
        }

        return $next($request);
        
    }

Ends here

/////////////////////////////////////////////










///////////////////////////////////////////////////////////////////////////////////////////////////
Route starts

Note:: ensure we use a custom controller folder 

Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function(){

    // Route for direct user registration 
    Route::post('/admin/add-user', [RegisterController::class, 'userAdd']);
 
});


Route ends 
///////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////

Controller Function Logic Format For Future Different Requirements 


    public function addAUser(request $request){
        
        
        DB::beginTransaction(); 

        $validator = Validator::make($request->all(), [
            // enter the fields name
        ]);

        if($validator->fails()){
            return response()->json(['validation_error'=> $validator->messages()]);
        }


        try{

            $userAccount = User::create([

                // example fields must included

                'name' => $request->input('name'),
                'user_type' => $request->input('profession'),
                'email' => $request->input('email'),
                'password' => $request->input('password'), // plain text based psw client requirement 
                'pswCred' => $request->input('pswCred'), // for retrieval
                'role' => 'user',
                'phone' => $request->input('phone'),
                'designation' => $request->input('profession'),
                'unique_user_id' => $this->generateUniqueUserId(),
            ]);

            if($userAccount){

                $userFullInfoTable = UserFullInfoTable::create([

                    // example fields must included 
                        'name' => $docAccount->name,
                        'user_type' => $docAccount->user_type,
                        'user_id' => $docAccount->id,  // Foreign key
                        'unique_user_id' =>  $docAccount->unique_user_id,
                ]);

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => 'Account created successfully',
                    'docData' => [$docAccount, $doctorUserData],
                ]);
            
            }


        }catch(Exception $e){
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'error' => 'Database error: ' . $e->getMessage(),
                'message' => 'Please try registering with a unique email or Phone number, one already exist'
            ]); 
        }   
            
    }


Controller Function Logic Format Ends here
/////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////

Other function


 public function fetchDoctors(Request $request) {
        try {
           
            $recordsPerPage = $request->query('recordsPerPage', 10);
    
            // Fetch paginated data from the model
            $doctorsData = Doctors_userData::where('account_request', '!=', 'pending')
                ->where('disable_status', '!=', '1')
                ->paginate($recordsPerPage);
    
            if ($doctorsData->isEmpty()) {
                return response()->json([
                    'status' => 204,
                    'message' => 'No user found',
                ]);
            }
    
            return response()->json([
                'status' => 200,
                'listData' => $doctorsData->items(), // Return the paginated items
                'message' => 'Total user data found: ' . $doctorsData->total(), // Use total count
                'total' => $doctorsData->total(),
                'current_page' => $doctorsData->currentPage(),
                'last_page' => $doctorsData->lastPage(),
                'per_page' => $doctorsData->perPage(),
            ]);
    
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500,
                'message' => 'Failed to fetch user data',
            ]);
        }
    }
    

    public function fetchSingeDoctor($id, request $request){

        // $user = $request->user();

        // return response()->json($user);

        try{
            $doctorsData = Doctors_userData::where('id', $id)->get();

            if ($doctorsData->isEmpty()) {
                return response()->json([
                    'status' => 204,
                    'message' => 'No User found',
                ]);
            }

            return response()->json([
                'status' => 200,
                'doc_data' => $doctorsData,
                'message' => 'Total Users data found: ' . $doctorsData->count(),
            ]);

        }catch(Exception $e){

            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500,
                'message' => 'failed to fetch User data',
            ]);
        }
    }

    public function fetchDoctorsCred($id){

        try{

            $doctor = User::select('name', 'email', 'pswCred')->find($id);

            if ($doctor) {
                return response()->json([
                    'status' => 200,
                    'success' => true,
                    'data' => $doctor
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }

        }catch(Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'error on fetching user credentials',
                'error' => $e->getMessage(),
            ]);
        }

    }

    public function changeDocPsw($id, Request $request){

        try {
                $newPsw = User::where('id', $id)->update([
                    'password' => bcrypt($request->input('pswCred')),
                    'pswCred' => $request->input('pswCred'),
                ]); //

                if($newPsw){
                    return response()->json([
                        'status' => 200,
                        'success' => true,
                        'message' => 'Password updated successfully'
                    ]);
                }else{
                    return response()->json([
                        'status' => 404,
                        'success' => false,
                        'message' => 'User not found'
                    ]);
                }
    
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Error updating password, Contact developer',
                'error' => $e->getMessage(),
            ]);
        }

       
       
    }

    public function updateDoctorData($id, Request $request) {
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|',
            'phone' => 'required|'
        ]);

        if($validator->fails()){
            return response()->json(['validation_error' => $validator->messages()]);
        }
    
        DB::beginTransaction(); 

        try{

            $userAccountData = Doctors_userData::find($request->id);

            $userAccountData->update([
                // not updating email since its in 2 different tables - not imp
                    'name' => $request->input('name'),
                    'age' => $request->input('age'),
                    'phone' => $request->input('phone'),
                
                    'sex' => $request->input('sex'),
                    'relativeName' => $request->input('relativeName'),
                    'registrationNo' => $request->input('registrationNo'),
                    'village' => $request->input('village'),

                    'po' => $request->input('po'),
                    'ps' => $request->input('ps'),
                    'pin' => $request->input('pin'),
                    'district' => $request->input('district'),

                    'buildingNo' => $request->input('buildingNo'),
                    'landmark' => $request->input('landmark'),
                    'workDistrict' => $request->input('workDistrict'),
                    'state' => $request->input('state'),

                //  'user_type' => $request->input('profession'),
                //  'designation' => $request->input('profession'), 
                //  designation and user_type must not be edited due to db relationships 
                ]);

            
            if($userAccountData){

                // not updating email since its in 2 different tables - not imp
            
                $user =  User::where('id', $request->user_id)->first();
            
                $user->update([
                        'name' => $request->input('name'),
                        'user_type' => $request->input('profession'),
                        'phone' => $request->input('phone'),
                        'designation' => $request->input('profession'),
                ]);

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => 'Account updated Successfully',
                ]);
            } 

        }catch(Exception $e){
            DB::rollback();
            return response()->json([
                'status' => 500,
                'message' => 'Fatal Error during update, please register the user again',
                'error' => $e->getMessage(),
            ]);
        }
        

    
    }
    
    public function disableDoctorData($id) {
        DB::beginTransaction();
    
        try {
            $docWorkData = Doctors_userData::find($id);
    
            // Check if the doctor data exists
            if (!$docWorkData) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Doctor data not found'
                ]);
            }
    
            // Update the doctor's disable status
            $docDataUpdated = $docWorkData->update([
                'disable_status' => 1,
            ]);
    
            // Check if the doctor data update was successful
            if ($docDataUpdated) {
                // Fetch the associated user data
                $userData = User::where('id', $docWorkData->user_id);
    
                // Update the user's disable status
                $updated = $userData->update([
                    'disable_status' => 1,
                ]);
    
                // Check if the user data update was successful
                if ($updated) {
                    DB::commit();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Item disabled successfully'
                    ]);
                } else {
                    // If the user update fails, roll back and return error
                    DB::rollBack();
                    return response()->json([
                        'status' => 500,
                        'message' => 'Failed to update user disable status'
                    ]);
                }
            } else {
                // If the doctor data update fails, roll back and return error
                DB::rollBack();
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed to update doctor disable status'
                ]);
            }
    
        } catch (Exception $e) {
            // Rollback transaction and return error on exception
            DB::rollBack();
            return response()->json([
                'status' => 500,
                'message' => 'Fatal error',
                'error' => $e->getMessage(),
            ]);
        }
    }
    


    // this function is being used to find doctor or work based on email, name, phone, location

    public function autoSearchUser(request $request){
  
        $query = $request->input('query');
        
   
        if (empty($query)) {
            return response()->json(['suggestions' => []]);
        }


        $suggestions = Doctors_userData::where('disable_status', '!=', '1')
        ->where(function($subQuery) use ($request) {
            $searchQuery = $request->input('query');
            $subQuery->where('phone', 'like', '%' . $searchQuery . '%')
                    ->orWhere('email', 'like', '%' . $searchQuery . '%')
                    ->orWhere('name', 'like', '%' . $searchQuery . '%')
                    ->orWhere('workDistrict', 'like', '%' . $searchQuery . '%');
        })
        ->take(10) 
        ->get(['phone', 'email', 'name', 'workDistrict', 'id']);

        return response()->json(['suggestions' => $suggestions]);
    }
    



    // controller specific helpers 

    //helper function to double check and generate a unique user id for every account
    private function generateUniqueUserId() {
        do {
            $uniqueUserId = 'USER-' . strtoupper(uniqid()); // Generating a new unique ID
        } while (User::where('unique_user_id', $uniqueUserId)->exists()); // Checking for uniqueness
        
        return $uniqueUserId; 
    }   