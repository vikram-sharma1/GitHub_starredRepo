import React from 'react'
import GitHubCalendar from 'react-github-calendar';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';


const ModalData = () => {
    const [username, setUsername] = useState('grubersjoe');

    let NameofUser = JSON.parse(localStorage.getItem('NameOfUser'))
    console.log('NameofUser:', NameofUser)


  return (
    <>
        <div>
            <h4>User Activity Graph</h4>
            <img src={`https://activity-graph.herokuapp.com/graph?username=${NameofUser}&bg_color=0D1117&color=5BCDEC&line=5BCDEC&point=FFFFFF&hide_border=true`} alt="" width='95%'/>

            <GitHubCalendar username="vikram-sharma1" />
        </div>
    </>
  )
}

export default ModalData