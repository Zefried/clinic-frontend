



  public function adminLogin(Request $request)
    {

        try{

            $validator = Validator::make($request->all(), [
                'email' => 'required|',
                'password' => 'required|',
            ]);
    
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => '400',
                    'validation_error' => $validator->messages(),
                ]);
            }

            $credentials = $request->only('email', 'password');

            // Check if the user exists
            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid email or password',
                ]);
            }

            // Revoking all previous tokens (optional)
            $user->tokens()->delete();

            if($user->role === 'admin'){
                // Creating a new token for the user with admin ability
                $token = $user->createToken('auth_token', ['admin'])->plainTextToken;
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authorized to access this route',
                ]);
            }
           
            return response()->json([
                'status' => 200,
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user, 
                'role' => $user->role,
            ], 200);

        }catch(Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'fatal error during login',
                'error' => $e->getMessage(),
            ]);
        }
       
    }


    public function docPharmaLogin(Request $request)
    {

        try{

            $validator = Validator::make($request->all(), [
                'email' => 'required|',
                'password' => 'required|',
            ]);
    
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => '400',
                    'validation_error' => $validator->messages(),
                ]);
            }

            $credentials = $request->only('email', 'password');

            // Check if the user exists
            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid email or password',
                ]);
            }

            // Revoking all previous tokens (optional)
            $user->tokens()->delete();

            if($user->role === 'user'){
                // Creating a new token for the user with admin ability
                $token = $user->createToken('auth_token', ['user'])->plainTextToken;
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authorized to access this route',
                ]);
            }
           
            return response()->json([
                'status' => 200,
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user, 
                'role' => $user->role,
            ], 200);

        }catch(Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'fatal error during login',
                'error' => $e->getMessage(),
            ]);
        }
       
    }

    public function labLogin(Request $request)
    {

        try{

            $validator = Validator::make($request->all(), [
                'email' => 'required|',
                'password' => 'required|',
            ]);
    
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => '400',
                    'validation_error' => $validator->messages(),
                ]);
            }

            $credentials = $request->only('email', 'password');

            // Check if the user exists
            $user = User::where('email', $credentials['email'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid email or password',
                ]);
            }

            // Revoking all previous tokens (optional)
            $user->tokens()->delete();

            if($user->role === 'lab'){
                // Creating a new token for the user with admin ability
                $token = $user->createToken('auth_token', ['lab'])->plainTextToken;
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authorized to access this route',
                ]);
            }
           
            return response()->json([
                'status' => 200,
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user, 
                'role' => $user->role,
            ], 200);

        }catch(Exception $e){
            return response()->json([
                'status' => 500,
                'message' => 'fatal error during login',
                'error' => $e->getMessage(),
            ]);
        }
       
    }