import React from 'react'
import Sidebar from '../Components/Sidebar'
// import Header from '../Components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilSquare, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import LinesEllipsis from 'react-lines-ellipsis';
import axios from 'axios'

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            customer: [],
            typeroom: [],
            room: [],
            role: "",
            token: "",
            action: ""

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

    getUser = () => {
        let url = "http://localhost:8080/user";
        axios
            .get(url, this.headerConfig())
            .then((response) => {
                this.setState({
                    user: response.data.count,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getCustomer = () => {
        let url = "http://localhost:8080/customer/"
        axios.get(url)
            .then((response) => {
                this.setState({
                    customer: response.data.count
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getRoom = () => {
        let url = "http://localhost:8080/room"
        axios.get(url)
            .then(response => {
                this.setState({
                    room: response.data.count
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
        this.getUser();
        this.getCustomer();
        this.getRoom()
        this.getTypeRoom()
        this.checkRole()
    }

    render() {
        return (
            <div class="flex flex-row min-h-screen dark:bg-[#F8F6F4] text-gray-800">
                <Sidebar />
                <main class="main flex flex-col flex-grow transition-all duration-150 ease-in ml-60">
                    {/* <Header /> */}
                    <section>

                        <div className="dark:bg-[#F8F6F4]">
                            <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:px-10 lg:px-32 dark:text-gray-900 justify-center">
                                <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-900">Selamat datang di website penginapan hotel kami!</h1>
                                <p className="mt-10 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Selamat datang di Hotel Opulent, tempat di mana kemewahan dan kenikmatan berpadu dalam satu pengalaman yang tak terlupakan. Kami adalah tujuan yang sempurna bagi mereka yang menghargai kualitas, kenyamanan, dan perhatian terhadap detail. Dengan fasilitas mewah, layanan yang ramah, dan dekorasi yang elegan, kami berkomitmen untuk menjadikan setiap kunjungan Anda menjadi momen yang istimewa.

Di Hotel Opulent, Anda akan menemukan kamar-kamar yang indah, berbagai fasilitas yang memanjakan, dan restoran kami yang menghadirkan cita rasa kuliner yang luar biasa. Kami berupaya melebihi harapan Anda setiap saat, sehingga Anda bisa merasa seperti tamu istimewa yang kami hormati.</p>
                                <div className="flex flex-wrap justify-center">
                                    {/* <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50 ">Get started</button> */}
                                    <a href="/typeroom" type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-900 bg-[#3C2A21] text-white mx-auto">Get started</a>
                                </div>
                            </div>
                        </div>

                        <img src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500" />
                    </section>

                    <div class="grid grid-cols-3 gap-4">
                        {this.state.typeroom.map((item, index) => {
                            return (
                                <div class="col-span-1">


                                </div>
                            );
                        })}
                    </div>

                    <section className="dark:bg-[#F8F6F4] dark:text-gray-100">
	<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
		<a rel="noopener noreferrer" href="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-[#3C2A21]">
			<img src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGhvdGVsJTIwbG9iYnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline pt-3">Opulent Hotel</h3>
				<span className="text-xs dark:text-gray-400">Berdiri sejak tahun 2005</span>
				<p className='pt-8'>Kami bangga mempersembahkan destinasi yang sempurna bagi Anda untuk menikmati pengalaman menginap yang tak terlupakan. Dalam website kami, Anda akan menemukan informasi lengkap tentang hotel kami, fasilitas yang kami tawarkan, serta berbagai penawaran khusus yang dapat membuat liburan Anda lebih istimewa.</p>
			</div>
		</a>
		<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-[#3C2A21]">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20020708-21d6fa05dcbe3f0c0d681db922796741.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-360,q-40,w-550" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Deluxe King</h3>
					<span className="text-xs dark:text-gray-400">4rb Mengesankan</span>
					<p>Kamar Deluxe King kami adalah pilihan yang sempurna untuk Anda yang mencari kenyamanan dan kemewahan. Dengan tempat tidur king-size yang luas, Anda akan merasakan tidur nyaman seperti di istana. Kamar ini dilengkapi dengan fasilitas kamar mandi pribadi, TV layar datar, minibar, meja kerja, dan akses Wi-Fi gratis. Nikmati pengalaman menginap yang istimewa dengan pemandangan yang menakjubkan dan layanan kami yang ramah.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-[#3C2A21]">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10013035-1200x872-FIT_AND_TRIM-0e58851eee9cce30a0f8ab3e5da36269.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-360,q-40,w-550" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Junior Suite Room</h3>
					<span className="text-xs dark:text-gray-400">4,1rb Mengesankan</span>
					<p>Junior Suite Room adalah pilihan sempurna untuk para tamu yang mencari kenyamanan ekstra dan ruang yang luas. Kamar ini dilengkapi dengan tempat tidur king-size yang nyaman, ruang tamu terpisah, dan pemandangan yang menakjubkan. Fasilitas termasuk kamar mandi pribadi, TV layar datar, minibar, dan Wi-Fi gratis. Kami yakin pengalaman menginap Anda di Junior Suite Room akan menjadi yang tak terlupakan.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-[#3C2A21]">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/3000000/2460000/2450100/2450038/1c981cf1_z.jpg?_src=imagekit&tr=dpr-2,c-at_max,h-360,q-40,w-550" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Executive Suite Room</h3>
					<span className="text-xs dark:text-gray-400">4,2rb Mengesankan</span>
					<p>Executive Suite Room adalah pilihan terbaik untuk para tamu yang menginginkan pengalaman menginap yang istimewa. Kamar ini menawarkan ruang yang luas dan nyaman dengan desain yang elegan, serta dilengkapi dengan fasilitas modern, termasuk tempat tidur king-size, ruang tamu pribadi, kamar mandi mewah dengan bathtub jacuzzi, layanan concierge eksklusif, dan akses ke lounge eksekutif dengan sarapan dan minuman ringan sepanjang hari.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-[#3C2A21] hidden sm:block">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10003029-c1e99771507282cde5301d4c3346c861.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-360,q-40,w-550" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Superior Twin</h3>
					<span className="text-xs dark:text-gray-400">4,3rb Mengesankan</span>
					<p>Kamar Superior Twin kami adalah pilihan yang sempurna untuk tamu yang mencari kenyamanan dan fleksibilitas. Kamar ini dilengkapi dengan dua tempat tidur single yang nyaman, sehingga cocok untuk perjalanan bersama teman atau keluarga. Fasilitas tambahan termasuk kamar mandi pribadi, TV layar datar, meja kerja, dan Wi-Fi gratis. Nikmati kenyamanan dan kualitas tinggi selama menginap di kamar Superior Twin kami.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-[#3C2A21] hidden sm:block">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10000082-8de15cb9b2b802824388731ee20fd68b.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-360,q-40,w-550" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Superior King Bed</h3>
					<span className="text-xs dark:text-gray-400">4,4rb Mengesankan</span>
					<p>Kamar Superior King Bed adalah pilihan yang sempurna untuk para tamu yang mencari kenyamanan dan kemewahan. Dengan tempat tidur king-size yang luas, Anda dapat bersantai dengan nyaman. Kamar ini juga dilengkapi dengan fasilitas modern seperti kamar mandi pribadi, TV layar datar, dan akses Wi-Fi gratis. Nikmati kenyamanan dan kemewahan selama menginap di kamar ini.</p>
				</div>
			</a>
			<a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-[#3C2A21] hidden sm:block">
				<img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10000082-174accaba64f3b06790ab210ec8b2069.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-360,q-40,w-550" />
				<div className="p-6 space-y-2">
					<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">Garden Wing Suite One Bedroom</h3>
					<span className="text-xs dark:text-gray-400">4,5rb Mengesankan</span>
					<p>Kamar Garden Wing Suite One Bedroom adalah pilihan sempurna untuk Anda yang mencari pengalaman menginap yang mewah dan nyaman. Dengan satu kamar tidur yang luas, Anda dapat bersantai dengan penuh kenyamanan. Kamar ini juga menawarkan akses langsung ke taman yang indah, sehingga Anda dapat menikmati keindahan alam saat Anda menginap.</p>
				</div>
			</a>
		</div>
	</div>
</section>


                    <footer class="footer px-4 py-2">
                        <div class="footer-content">
                            <p class="text-sm text-gray-600 text-center">© Brandname 2023. All rights reserved. <a href="https://twitter.com/iaminos"></a></p>
                        </div>
                    </footer>
                </main>
            </div>
        );
    }
}