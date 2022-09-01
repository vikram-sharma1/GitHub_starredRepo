import React from 'react'

const ModalData = () => {

    let NameofUser = JSON.parse(localStorage.getItem('NameOfUser'))
    console.log('NameofUser:', NameofUser)


  return (
    <>
        <div>
            <h4>User Activity Graph</h4>
            <img src={`https://activity-graph.herokuapp.com/graph?username=${NameofUser}&bg_color=0D1117&color=5BCDEC&line=5BCDEC&point=FFFFFF&hide_border=true`} alt="" width='95%'/>
        </div>
    </>
  )
}

export default ModalData