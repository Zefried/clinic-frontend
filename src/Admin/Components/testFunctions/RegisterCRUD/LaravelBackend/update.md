


Format 


  public function updateLabUser($id, Request $request) {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'registrationNo' => 'required|string',
            'buildingNo' => 'required|string',
            'district' => 'required|string',
            'landmark' => 'required|string',
            'state' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['validation_error' => $validator->messages()]);
        }
    
        DB::beginTransaction();
    
        try {

            $accountData = LabModel::where('id', $id)->first();

            $updateAccountData = $accountData->update([
                ''
            ]);


            if($updateAccountData){
                $userAccount = User::where('id', $updateAccountData->user_id)->first();

                $userAccount->update([

                ]);
            }
            
            
            DB::commit();
    
            return response()->json([
                'status' => 200,
                'message' => 'User and Lab details updated successfully',
            ]);
    
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'status' => 500,
                'message' => 'Fatal Error during update',
                'error' => $e->getMessage(),
            ]);
        }
    }