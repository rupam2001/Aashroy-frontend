import React from "react";
import logo from './logo.svg';
import onlinespt from './onlinespt.svg';

const DisplayCDetails = () => (

<div className="text-left p-10 ">
              <div className="text-5xl font-bold">Our<br/>Support<br/><br/>@<br/>
              </div>
              <div className="py-5 text-base space-y-4 text-gray-700 md:w-auto ">
              Email : aashroy@gmail.com
                <br/>
            Reg. Office at : 
            <br/>
            XYZ Lane<br/>
            YZ Street<br/>
            AZ, RT-100000<br/>
            Phone number : +91 - 10000 - 10000 
<br/> Twitter Link &nbsp; Insta Link &nbsp; FB Link &nbsp;<br/><br/>               
                  
                
              </div>
              
             

</div>);


const MemberCard = () => (

    <div className="text-left p-10 ">
                  
                 
    
    </div>);

function Comment(props) {
    return (
      <div className="pb-20 ">
              <div class="flex items-center justify-center">
            <div className="mb-10 rounded-full bg-white shadow-2xl"><img class="object-cover h-40 w-40" src={logo} alt="Homeless people"/></div>
            </div> 
        <div className="text-base space-y-4 text-gray-700 ">{props.name}</div>
        <div className="text-base space-y-4 text-blue-400  font-bold">
          {props.year}
        </div>
        <div className=" text-base space-y-4 text-blue-500  ">
          {props.branch}
        </div>
      </div>
    );
  }

 



const Contact = () => {
    return (
      <div className="flex flex-col w-screen h-auto  ">
          <div className="flex flex-row  ">
              <div className="lg:w-2/4 w-full">  <DisplayCDetails/></div>
              <div className="md:block w-2/4 hidden ">            
              <div className="bg-white h-full  bg-gradient-to-l from-blue-300 via-white to-white flex items-center justify-center  "><img class="object-cover" src={onlinespt} alt="Homeless people"/></div>
            </div>
              
              </div>


        <div className="flex flex-col justify-center bg-blue-700 h-44  ">
            <div className="text-center text-3xl text-white font-bold">Our Team</div>
            
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center h-auto text-center -mt-10">
       <div className="w-full"> <Comment
    name={'Forheen Ahmed'}
    year={'2nd year'}
    branch={'Instrumentation Engineering'}
  />     
  </div ><div className="w-full">
     <Comment
    name={'Forheen Ahmed'}
    year={'2nd year'}
    branch={'Instrumentation Engineering'}
  />   </div>
  <div className="w-full" >
     <Comment
    name={'Forheen Ahmed'}
    year={'2nd year'}
    branch={'Instrumentation Engineering'}
  />   </div>      
  <div className="w-full" >
     <Comment
    name={'Forheen Ahmed'}
    year={'2nd year'}
    branch={'Instrumentation Engineering'}
  />   </div>      
   </div>
      </div>
     
    );
  };
  
  export default Contact;