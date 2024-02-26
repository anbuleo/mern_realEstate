import React, { useState } from 'react'
export  const MeetingDataContext =  React.createContext(null)

function MeetingContext({children}) {
    let [meetingData,SetMeetingData] = useState([])

    const updateMeetingList = (i)=>{
      let newData = [...meetingData]
        newData.splice(i,1)
        SetMeetingData(newData)
    }


  return <MeetingDataContext.Provider value={{meetingData,SetMeetingData,updateMeetingList}} >
    {children}
  </MeetingDataContext.Provider>
}

export default MeetingContext