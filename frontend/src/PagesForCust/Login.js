import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'


export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email_customer: "",
            password_customer: "",
            isModalOpen: false,
            logged: false,
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
            email: this.state.email_customer,
            password: this.state.password_customer
        }
        let url = "http://localhost:8080/customer/login"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id = response.data.data.id_customer
                    let token = response.data.data.token
                    let role = response.data.data.role
                    let email = response.data.data.email
                    localStorage.setItem("id", id)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    alert("Success Login")
                    window.location.href = "/home"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Failed to login Opulent");
                }
            })
    }

    render() {
        return (
            <div className="dashboard1">
                <div className="flex flex-col h-screen dark:text-gray-100 " style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
                        <form class="bg-[#765827] shadow-md rounded-3xl px-8 pt-6 p-8 mx-auto w-1/3 mt-16" onSubmit={(e) => this.handleLogin(e)}>
                        <div className="mb-8 text-center">
                            <h1 className="my-3 text-4xl font-bold">Selamat Datang di Hotel Opulent</h1>
                            <p className="text-sm ">Silahkan login untuk memesan kamar di Hotel Opulent</p>
                        </div>
                            {/* <p class="text-gray-700 text-sm font-normal mb-6 text-center">Silahkan login untuk memesan kamar di Hotel Slippy</p> */}
                            <div class="mb-4">
                                <label class="block text-sm font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email_customer" name="email_customer" placeholder="Email" value={this.state.email_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="mb-6">
                                <label class="block  text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password_customer" name="password_customer" type="password" placeholder="Password" value={this.state.password_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-[#3C2A21] hover:bg-[#65451F] text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Login
                                </button>
                            </div>
                            <p class="text-sm font-normal  text-center mt-3 ">
                                Don’t have an account yet? <a href="registercust" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</a>
                            </p>

                        </form>
                    </div>
                    {/* <div class="w-1/2 bg-gray-500 text-center">
                        <img src="/assets/PhotoInLogin.png" className="w-screen h-screen" alt="" />
                    </div> */}
                </div>
        );
    }
}
