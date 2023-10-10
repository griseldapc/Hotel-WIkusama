import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

export default class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            nik_customer: "",
            customer_name: "",
            address_customer: "",
            email_customer: "",
            password_customer: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = (e) => {
        e.preventDefault()
        
        let data = {
            nik : this.state.nik_customer,
            customer_name : this.state.customer_name,
            address : this.state.address_customer,
            email : this.state.email_customer,
            password : this.state.password_customer
        }
        let url = "http://localhost:8080/customer/register"
        axios.post(url, data)
            .then(res => {
                window.alert("Success to Register")
                window.location.href = "/logincust"
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500) {
                    window.alert("Failed Register as Customer");
                }
            }) 
    }

    render() {
        return (
            <div className="dashboard1">
                <div className="flex flex-col h-screen dark:text-gray-100 " style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'
            }}>
                        <form class="bg-[#765827] shadow-md rounded-3xl px-8 pt-4 p-3 mx-auto w-1/3 mt-2" onSubmit={(e) => this.handleRegister(e)}>
                            <p class="text-white text-2xl font-bold mb-4 text-center">Register to Opulent Hotel</p>
                            <p class="text-white text-sm font-normal mb-6 text-center">Silahkan Register sebagai Customer Hotel Opulent</p>
                            <div class="">
                                <label class="block  text-sm font-bold mb-2" for="email">
                                NIK
                            </label>
                            <input class="shadow appearance-none border border rounded w-full text-gray-700 py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nik_customer" name="nik_customer" placeholder="NIK" value={this.state.nik_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="">
                                <label class="block  text-sm font-bold mb-2" for="email">
                                Nama Lengkap
                            </label>
                            <input class="shadow appearance-none border border rounded w-full text-gray-700 py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="customer_name" name="customer_name" placeholder="Nama Lengkap" value={this.state.customer_name} onChange={this.handleChange} required />
                            </div>
                            <div class="">
                                <label class="block  text-sm font-bold mb-2" for="email">
                                Alamat
                            </label>
                            <input class="shadow appearance-none border border rounded w-full text-gray-700 py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="address_customer" name="address_customer" placeholder="Alamat" value={this.state.address_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="">
                                <label class="block  text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input class="shadow appearance-none border border rounded w-full text-gray-700 py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email_customer" name="email_customer" placeholder="Email" value={this.state.email_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="mb-2">
                                <label class="block  text-sm font-bold mb-2" for="email">
                                Password
                            </label>
                            <input class="shadow appearance-none border border rounded w-full text-gray-700 py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password_customer" name="password_customer" type="password" placeholder="Password" value={this.state.password_customer} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                            <button class="bg-[#3C2A21] hover:bg-[#65451F] text-white font-bold py-2 mb-4 mt-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                Register
                            </button>
                        </div>

                        </form>
                    </div>
                    {/* <div class="w-1/2 bg-gray-500 text-center">
                        <img src="/assets/PhotoInLogin.png" className="w-screen h-screen" alt="" />
                    </div> */}
                </div>
            
        );
    }
}
