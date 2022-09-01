import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/StarredRepo.css'
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Modal from "react-modal";
import { AiFillCaretDown } from 'react-icons/ai';
import ModalData from './ModalData';

  
Modal.setAppElement("#root");

const StarredRepo = () => {

    const [data, setData] = useState([])
    const [page, setPage  ] = useState(1)

    const [isOpen, setIsOpen] = useState(true);
        function toggleModal() {
            // console.log('yes')
            setIsOpen(!isOpen);
            // console.log(isOpen)
          }


    useEffect(()=>{
      getDataGit()
    },[page])
  
    const getDataGit = () => {
  
      axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`).then((res)=>{
        setData(res.data.items)
       
      })
  
    }

    const handleChange = (event, value) => {
        setPage(value);
      };

      const localDataPass = (singleData) => {
        // console.log('singleData:', singleData.owner.login)
        localStorage.setItem('NameOfUser', JSON.stringify(singleData.owner.login))
      }
  
  
  return (
    <>
        <div className='outerBox'>
            <h1>Most Starred Repo</h1>
            {data.map((singleData)=>{


            var date_json = singleData.updated_at; //assuming date_json will have the string json object.
            var dates = date_json.split("T");
            var dates1 = dates[1].split(".");
            var snow_date = dates[0]+" "+dates[1].replace('Z', "");


                return (
                    <div key={singleData.id} >

                        <div className='singleBox'>
                            <div className='one'>
                                {/* to show the User Image  */}
                                <img src={singleData.owner.avatar_url} alt="" className='imgBox' />
                            </div>
                            <div className='two'>
                                {/* To show the User Data  */}
                                <h1 className='removemargin'>{singleData.name}</h1>

                                {!singleData.description ? <p className='removemargin'>...........</p> : <p className='removemargin'>{singleData.description}</p>}

                                
                                <div className='botBox'>
                                    <div className='flexSize-1'>
                                        <Box component="span" sx={{  border: '2px dashed grey', padding:'5px 25px' }}>
                                            {singleData.stargazers_count}
                                        </Box>
                                    </div> 
                                    <div className='flexSize-2'>
                                        <Box component="span" sx={{  border: '2px dashed grey', padding:'5px 25px' }}>
                                            {singleData.open_issues_count}
                                        </Box>
                                    </div> 
                                    <div className='flexSize-3'>Last Pushed at <b>{snow_date}</b> by <b>{singleData.name}</b></div>
                                </div>
                            </div>
                            <div>
                                <AiFillCaretDown className='downArrow' onClick={()=>{
                                    toggleModal(); localDataPass(singleData)
                                }}/>
                                <p className='Click'>Click to open Modal</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className='PagiBox'>
             <Pagination count={8} page={page} onChange={handleChange} />
            </div>
        </div>



        <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <ModalData/>
        <button onClick={toggleModal}>Close modal</button>
      </Modal>
    </>
  )
}

export default StarredRepo