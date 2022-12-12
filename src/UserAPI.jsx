import React from "react"
import axios from 'axios'
import { useEffect, useState } from "react"

const UserAPI = () => {
    // const [userImg, setUserImg] = useState('')
    // const [userName, setUserName] = useState('')
    // const [userEmail, setUserEmail] = useState('')
    // const [userPhone, setUserPhone] = useState('')
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
            let userDetails = response.data.results[0]
            // setUserImg((userImg) => (userDetails.picture.large))
            // setUserName((userName) => (`${userDetails.name.title} ${userDetails.name.first} ${userDetails.name.last}`))
            // setUserEmail((userEmail) => (userDetails.email))
            // setUserPhone((userPhone) => (userDetails.phone))

            // using spread operator
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
        }, 5000)
        return () => clearTimeout(timer)
    })

    return(
        <>
            <hr />
            <h2>User API Component</h2>
            <br />
            <img src={userData.Image} alt="" />
            <p><b style={{color: 'green'}}>Full Name: </b>{userData.FullName}</p>
            <p><b style={{color: 'green'}}>Email: </b>{userData.Email}</p>
            <p><b style={{color: 'green'}}>Phone: </b>{userData.Phone}</p>
            <button onClick={() => {
                getUser();
            }}>Get User</button>
        </>
    )
}

export default UserAPI