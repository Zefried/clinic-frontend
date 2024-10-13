import React, { useEffect, useState } from 'react'
import axios from 'axios';
export const Sync = () => {

  const [time, setTime] = useState(0);
  const [data, setImportedData ] = useState();


    // data importing function is defined here

    const importData = () => {
      const start = Date.now();

      axios.post('http://localhost:8000/api/import', {
      }).then((res)=>{
          setImportedData(res.data);
          if(res.data.status === 'success'){  
            setTime((Date.now() - start) / 1000); // Time in seconds
          }
      }).catch((err)=>{
          console.log(err);
      })


    }



  return (
    <div>
      <div className='data-transfer-buttons'>
        <button className='btn btn-outline-primary m-5' onClick={importData}>Import</button>
        <button className='btn btn-outline-primary'>Export</button>
      </div>
      <p className='p-3 mb-2 bg-dark text-white m-4'>Real Time Performance: {time}sec</p>

      <div>
   {
    console.log(data)
   }
      </div>
    </div>
  )
}

