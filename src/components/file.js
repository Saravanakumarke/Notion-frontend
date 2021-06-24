import React, { useState,useEffect } from 'react';
import axios from 'axios'
import './file.css'
import one1 from './s.png'

export default function File() {

  const [searchvalue , setSearchvalue] = useState()
  const [data, setData] = useState([]);
  const [datafake, setDatafake] = useState([]);
  const [check , setCheck] = useState(false);
  const [btncheck , setBtncheck] = useState(false);
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((getData) =>
    {
      console.log(getData);
      setData(getData.data);
      setDatafake(getData.data);
    })
 } ,[])

  const onInputchange = (e) => {
    setSearchvalue(e.target.value)
}
 
const _onKeydown = (e) => {
    if (e.key === 'Enter') {
        filterList((searchvalue).toLowerCase(), true)
    }
}

const filterList = (searchvalue, filter) => {
    console.log(searchvalue)
    let lists = datafake;
    const filtered = lists.filter((x) => x.name.toLowerCase().startsWith(searchvalue))
    console.log(filtered)
    setData(filtered);
    if (filter) {
        setSearchvalue('')
    }
    if(filtered.length === 0)
    {
        alert("Nodata found")
        setData(datafake);
        
    }
    else
    {
        setCheck(true);
        setBtncheck(true);
    }
  
}

function refreshPage() {
  window.location.reload(false);
  setBtncheck(false)
}

  return (
      <>
     <div className="navbar">
      <div className="brandname">YourUni</div>
      <div className="link">
          <li className="product">Product</li>
          <li className="download">Download</li>
          <li className="pricing">Pricing</li>
      </div>
     </div>
     <div className="divclass" id="one">
           <div className="example headtitle" id="oneex">
                 <h2 className="h2new">Find the university that’s right for you.</h2>
                     <p className="pnew">Tenetur ex explicabo et illo. Recusandae fugit eius voluptatem. Voluptas atque autem totam.</p>     
             </div>
             <div className="example img-bg">
                <img src={one1} alt="sss" />
             </div>
      </div>
     <div className="searchbar">
         <input type = "text"
           className="search"
           placeholder="Search Name…"
           value = {searchvalue}
           onChange={onInputchange} 
           onKeyDown={_onKeydown}
          />
     </div>
   


     {data?.length > 0 ?
     <div className ="cards">
         {data.map((x) =>
         {
            return (  
         <div className ="listone" key={x.id}> 
         <p className = "textone">Name : {x.name}</p>
         <p className = "texttwo">{x.company.name}</p>
         <p className = "textlink">{x.website}</p>
         </div>  
           )
        }) }       
     </div>
     :
     check===true?
     <div className ="cards">
     <div className ="listone"> 
     <p className = "textone">Name : {data.name}</p>
     <p className = "texttwo">{data.address.street}</p>
     <p className = "textlink">{data.website}</p>
     </div> 
     </div>
     :
     <div>
       
     </div>
    }
     {btncheck === true?
     <div className="btn"><button className="backbtn" onClick={refreshPage}>Back</button></div>
     :null
     }
    </>
  );
}
