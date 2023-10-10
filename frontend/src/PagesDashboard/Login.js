import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { Navigate } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email_user: "",
            password_user: "",
            isModalOpen: false,
            logged: false,
        }
        this.setState({ logged: true });
    }

    

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ logged: true });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email_user,
            password: this.state.password_user
        }
        let url = "http://localhost:8080/user/login"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id = response.data.data.id_user
                    let token = response.data.data.token
                    let role = response.data.data.role
                    let email = response.data.data.email
                    let user_name = response.data.data.user_name
                    localStorage.setItem("id", id)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    localStorage.setItem("username", user_name)
                    alert("Success Login")
                    window.location.href = "/dashboard"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Failed to login dashboard");
                }
            })
    }

    render() {
        if (this.state.logged) {
            // Redirect to the dashboard if the user is logged in.
            return <Navigate to="/dashboard" />;
        }

        return (
            <div className="dashboard1">
                <div className="flex flex-col h-screen dark:text-gray-100 " style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'
            }}>

                    <form class="bg-[#765827] shadow-md rounded-3xl px-8 pt-6 p-8 mx-auto w-1/3 mt-24" onSubmit={(e) => this.handleLogin(e)}>
                        <div className="mb-8 text-center">
                            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                            <p className="text-sm ">Sign in to access your account</p>
                        </div>
                        <div class="mb-4">
                            <label class="block  text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input class="shadow appearance-none border border rounded w-full text-gray-700 py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email_user" name="email_user" placeholder="Email" value={this.state.email_user} onChange={this.handleChange} required />
                        </div>
                        <div class="mb-6">
                            <label class="block  text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password_user" type="password" placeholder="Password" value={this.state.password_user} onChange={this.handleChange} required />
                        </div>
                        <div class="flex items-center justify-between">
                            <button class="bg-[#3C2A21] hover:bg-[#65451F] text-white font-bold py-2 mb-4 mt-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                {/* <div class="w-1/2 bg-gray-500 text-center">
                        <img src="/assets/loginnn.jpeg" className="w-screen h-screen" alt="" />
                    </div> */}
            </div>

        );
    }
}
