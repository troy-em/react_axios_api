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
    }, [] //remove the empty array to get a new user every 1 second
    )

    const multipleUsers = userDatas.map((d) => (
        <div id="userscontainer" className="userscontainer">
            <div id="usersdiv" className="usersdiv">
                <img key={d.picture.large} src={d.picture.large} alt="" />
                <p key={d.name.first}>{[ d.name.title, ' ', d.name.first, ' ', d.name.last]}</p>
                <p key={d.email}>{d.email}</p>
                <p key={d.phone}>{d.phone}</p>
                <button style={{margin:'6px', backgroundColor: '#f4c095'}}>Follow</button>
                <button style={{margin:'6px', backgroundColor: '#1d7874'}}>View Account</button>
                {/* <hr /> */}
            </div>
        </div>
    ))

    return(
        <>
            <h1>React User Component</h1>
            <p>The api uses axios to fetch random user data from <b style={{color: '#1d7874'}}>https://randomuser.me/api/</b></p>
            <hr />
            <p style={{color: '#f4c095'}}>||||||||||||||||||||||||| single User Fetch |||||||||||||||||||||||||||</p>
            <br />
            <img src={userData.Image} alt="" />
            <p><b style={{color: '#1d7874'}}>Full Name: </b>{userData.FullName}</p>
            <p><b style={{color: '#1d7874'}}>Email: </b>{userData.Email}</p>
            <p><b style={{color: '#1d7874'}}>Phone: </b>{userData.Phone}</p>
            <button onClick={() => {
                // clearDiv()
                getUser()
            }}>Refresh</button>
            <p style={{color: '#f4c095'}}>||||||||||||||||||||||| Multiple Users Fetch ||||||||||||||||||||||||||</p>
            <div>
                {multipleUsers}
            </div>
        </>
    )
}

const clearDiv = () => {
    const myNode = document.getElementById("userscontainer");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

export default UserAPI