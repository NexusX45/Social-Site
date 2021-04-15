import React from 'react'
import axios from 'axios'
import {useHistory }from 'react-router-dom';

export default function Search(props:any){
    const [users, setUsers] = React.useState([{name:"", _id:""}])
    React.useEffect(()=>{
        axios.get(`/api/search/${props.match.params.q}`).then((res)=>{
            console.log(res);
            setUsers(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    return (
        <div className="container">
            <div className="h4 mt-3 mx-auto">Users</div>
            {users.map((item)=>(
                <UsersTile name={item.name} id={item._id}/>
            ))}
        </div>
    )
}

function UsersTile(props:any){
    const history = useHistory();

const handleClick = (id:any) =>{
    history.push(`/author/${id}`);
}
    return(
        <div className="card my-1" onClick={()=>handleClick(props.id)} style={{cursor:"pointer"}}>
            <div className="h4 mx-3 my-3">
                {props.name}
            </div>
        </div>
    )
}