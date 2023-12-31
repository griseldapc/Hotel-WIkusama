import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPencilSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import $ from "jquery";

export default class Room extends React.Component {

    constructor() {
        super()
        this.state = {
            room: [],
            typeroom: [],
            id_room: "",
            room_number: "",
            id_room_type: "",
            role: "",
            token: "",
            action: "",
            keyword: ""
        }

        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "admin" ||
                localStorage.getItem("role") === "resepsionis") {
                this.state.token = localStorage.getItem("token")
                this.state.role = localStorage.getItem("role")
            } else {
                window.alert("You're not admin or resepsionis!")
                window.location = "/"
            }
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClose = () => {
        $("#modal_room").hide()
    }

    _handleFilter = () => {
        let data = {
            keyword: this.state.keyword,
        }
        let url = "http://localhost:8080/room/find/filter"
        axios.post(url, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        room: response.data.data
                    })
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
            })
    }

    handleAdd = () => {
        $("#modal_room").show()
        this.setState({
            id_room: "",
            room_number: "",
            id_room_type: "",
            action: "insert"
        })
    }

    handleEdit = (item) => {
        $("#modal_room").show()
        this.setState({
            id_room: item.id_room,
            room_number: item.room_number,
            id_room_type: item.id_room_type,
            action: "update"
        })
    }

    handleSave = (e) => {
        e.preventDefault()

        let form = {
            id_room: this.state.id_room,
            room_number: this.state.room_number,
            id_room_type: this.state.id_room_type
        }

        if (this.state.action === "insert") {
            let url = "http://localhost:8080/room/add"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    this.getRoom()
                    this.handleClose()
                })
                .catch(error => {
                    console.log("error add data", error.response.status)
                    if (error.response.status === 500) {
                        window.alert("Failed to add data");
                    }
                })
        } else {
            let url = "http://localhost:8080/room/update/" + this.state.id_room
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    this.getRoom()
                    this.handleClose()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleDrop = (id) => {
        let url = "http://localhost:8080/room/delete/" + id
        if (window.confirm("Are you sure to delete this room")) {
            axios.delete(url, this.headerConfig())
                .then(response => {
                    console.log(response.data.message)
                    this.getRoom()
                })
                .catch(error => {
                    if (error.response.status === 500) {
                        window.alert("You can't delete this data");
                    }
                })
        }
    }

    getRoom = () => {
        let url = "http://localhost:8080/room"
        axios.get(url)
            .then(response => {
                this.setState({
                    room: response.data.data
                })
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getTypeRoom = () => {
        let url = "http://localhost:8080/room-type"
        axios.get(url)
            .then(response => {
                this.setState({
                    typeroom: response.data.data
                })
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    checkRole = () => {
        if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
            localStorage.clear()
            window.alert("You're not admin or resepsionis!")
            window.location = '/'
        }
    }

    componentDidMount() {
        this.getRoom()
        this.getTypeRoom()
        this.checkRole()
    }

    render() {
        return (
            <div class="flex flex-row min-h-screen dark:bg-[#F8F6F4] text-gray-800">
                <Sidebar />
                <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    {/* <Header /> */}
                    <div class="main-content flex flex-col flex-grow p-10 ml-60">
                        <h1 class="font-bold text-xl text-black-700">Daftar Room</h1>
                        <p class="text-gray-700">For Room in Opulent Hotel</p>

                        <div className="flex mt-2 flex-row-reverse mr-4">
                            <div className="flex rounded w-1/2 my-4">
                                <input
                                    type="text"
                                    className="w-2/3 block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Search..."
                                    name="keyword"
                                    value={this.state.keyword}
                                    onChange={this.handleChange}
                                    onKeyUp={this._handleFilter}
                                />
                                {/* <button className="w-1/8 ml-2 px-4 text-white bg-blue-100 border border-1 border-blue-600 rounded hover:bg-blue-200" onClick={this._handleFilter}>
                                    <FontAwesomeIcon icon={faSearch} color="blue" />
                                </button> */}
                                {this.state.role === "admin" &&
                                    <button className="w-1/3 ml-2 px-4 text-white bg-[#3C2A21] rounded hover:bg-[#765827]" onClick={() => this.handleAdd()}>
                                        <FontAwesomeIcon icon={faPlus} size="" /> Add
                                    </button>
                                }

                            </div>
                        </div>

                        <div className="flex flex-col mt-2 mr-4">
                            <div className="-my-2 mx-6 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        No
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Room Number
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Room Type
                                                    </th>
                                                    {this.state.role === "admin" &&
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Aksi
                                                        </th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {this.state.room.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{index + 1}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                Room-{item.room_number}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                                {item.room_type.name_room_type}
                                                            </span>
                                                        </td>
                                                        {this.state.role === "admin" &&
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <button class="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2" onClick={() => this.handleEdit(item)}>
                                                                    <FontAwesomeIcon icon={faPencilSquare} size="lg" />
                                                                </button>
                                                                <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded" onClick={() => this.handleDrop(item.id_room)}>
                                                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                                                </button>
                                                            </td>
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <footer class="footer px-4 py-2">
                        <div class="footer-content">
                            <p class="text-sm text-gray-600 text-center">© Brandname 2023. All rights reserved. <a href="https://twitter.com/iaminos"></a></p>
                        </div>
                    </footer>
                </main>

                {/* Modal Form */}
                <div id="modal_room" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center ">
                        <div class="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.handleClose()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black">Edit Room</h3>
                                <form class="space-y-6" onSubmit={(event) => this.handleSave(event)}>
                                    <div>
                                        <label for="room_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Room Number</label>
                                        <input type="text" name="room_number" id="room_number" value={this.state.room_number} onChange={this.handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-800" placeholder="Masukkan number of room" required />
                                    </div>
                                    <div>
                                        <label for="id_room_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Room Type</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="Jenis Room Type" name="id_room_type" value={this.state.id_room_type} onChange={this.handleChange} required>
                                            <option value="">Pilih Room Type</option>
                                            {this.state.typeroom.map((item, index) => (
                                                <option value={item.id_room_type}>{item.name_room_type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}