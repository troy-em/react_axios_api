import React from "react"
import axios from 'axios'
import { useEffect, useState } from "react"

const UserAPI = () => {
    // const [userImg, setUserImg] = useState('')
    // const [userName, setUserName] = useState('')
    // const [userEmail, setUserEmail] = useState('')
    // const [userPhone, setUserPhone] = useState('')
    const [userDatas, setUserDatas] = useState([])
    const [userData, setUserData] = useState({
        Image: '',
        FullName: '',
        Email: '',
        Phone: ''
    })

    const getUser = () => {
        return axios.get('https://randomuser.me/api/?results=5')
        .then(function (response) {
          // handle success
            console.log(response.data.results)
            setUserDatas((usersDatas) => (response.data.results))
            let userDetails = response.data.results[0]
            // setUserImg((userImg) => (userDetails.picture.large))
            // setUserName((userName) => (`${userDetails.name.title} ${userDetails.name.first} ${userDetails.name.last}`))
            // setUserEmail((userEmail) => (userDetails.email))
            // setUserPhone((userPhone) => (userDetails.phone))

            // using spread operator to display a single user
            setUserData(previousState => {
                return { ...previousState,
                Image: userDetails.picture.large,
                FullName: `${userDetails.name.title} ${userDetails.name.first} ${userDetails.name.last}`,
                Email: userDetails.email,
                Phone: userDetails.phone,
                }
            })
          return userDetails
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }


    useEffect(() => {
        let timer = setTimeout(() => {
            getUser();
        }, 1000)
        return () => clearTimeout(timer)
    }, [] //remove the empty array to get a new user every 5 seconds
    )

    const listItems = userDatas.map((d) => (
        <div className="userscontainer">
            <div className="usersdiv">
                <img key={d.login.uuid} src={d.picture.large} alt="" />
                <p key={d.login.uuid}>{[ d.name.title, ' ', d.name.first, ' ', d.name.last]}</p>
                <p key={d.login.uuid}>{d.email}</p>
                <p key={d.login.uuid}>{d.phone}</p>
                <hr />
            </div>
        </div>
    ))

    return(
        <>
            <hr />
            <h1>User API Component</h1>
            <br />
            <img src={userData.Image} alt="" />
            <p><b style={{color: 'green'}}>Full Name: </b>{userData.FullName}</p>
            <p><b style={{color: 'green'}}>Email: </b>{userData.Email}</p>
            <p><b style={{color: 'green'}}>Phone: </b>{userData.Phone}</p>
            <button onClick={() => {
                getUser();
            }}>Get User</button>
            <p>||||||||||||||||||||||||| end of single user |||||||||||||||||||||||||||</p>
            <div>
                {listItems}
            </div>
        </>
    )
}

export default UserAPI