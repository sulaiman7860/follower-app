"use client"
import { useState } from "react";
import axios from "axios";
// https://api.github.com/users/naveed-rana/
export default function Github() {
    const [userName, setUserName] = useState(null)
    const [followers, setFollowers] = useState([])
    const [data, setData] = useState(null)
    const onChangeHandler = (e) => {
        setUserName(e.target.value)
    }
    const onClickHandler = async () => {
        setFollowers([])
        
        let response = await fetch(`https://api.github.com/users/${userName}`)
        response = await response.json()
        setData(response)
        console.log(response);

    }
    const onFollowerHandler = async () => {
        let response = await axios.get(data.followers_url)
        console.log("response", response.data);
        setFollowers(response.data)

    }
    return (
       <main>
         <div className="container">
          <div className="row">
            <div className="col-8 offset-2">
            <div className="card1 py-5 text-center" >
           
            <label htmlFor="userName" className="h3 text-light">Enter UserName:</label>
            <input type="text" className="form-control" placeholder="Search" onChange={onChangeHandler} />
            <button className="px-4 py-2 rounded mt-2" onClick={onClickHandler}>Search</button>
            <hr />
          

            {data &&
                <div className="text-light mt-5">
                    <h1>Github user</h1>
                    <img src={data.avatar_url} width={100} alt="" />
                    <p>bio: {data.bio} - {data.followers}</p>
                    <button className="px-4 py-2 rounded my-3" onClick={onFollowerHandler}>Get followers</button>
                    <hr />
                </div>
            }


            {followers.length >= 1 &&

            <table className="text-light w-75 mx-auto">
                <tr >
                    <th>Id</th>
                    <th>Avator</th>
                    <th>Name</th>
                    <th>Type</th>
                    <hr />
                </tr>
                {followers.map((element) => {
                    return (
                        <tr >
                            <td>{element.id}</td>
                            <td> <img src={element.avatar_url} className="rounded-circle" width={50} alt="" /></td>
                            <td>{element.login}</td>
                            <td>{element.type}</td>
                        </tr>
                    )
                })}

            </table>
}

        </div>
            </div>
          </div>
        </div>
       </main>
    )
}