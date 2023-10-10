import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBed , faSwimmingPool} from "@fortawesome/free-solid-svg-icons";

export default class Services extends React.Component {
    render() {
        return (
            <div>
                <Navbar />


                <section className=" dark:bg-[#F8F6F4] dark:text-gray-100">
                <div className="text-center pb-8 pt-8">
                    <p className='p-8 text-5xl font-bold text-black'>The <span className="text-[#765827]">Services</span> You Get From Opulent</p>
                    <p className="mr-64 ml-64  text-gray-600 text-xl">Hotel ini menyediakan berbagai layanan termasuk layanan kamar 24 jam, restoran eksklusif, layanan concierge, pusat kebugaran, dan kolam renang yang indah untuk para tamu menikmati selama menginap.</p>
                </div>
	<div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10 pb-8">
		
		<div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
			<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-[#3C2A21]">
				<p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
					Tempat kemewahan yang nyaman dan elegan dengan dekorasi berkelas, perabotan mewah, dan pemandangan spektakuler. Dilengkapi dengan fasilitas modern seperti TV, Wi-Fi cepat, dan kenyamanan tidur luar biasa, tempat sempurna untuk bersantai dan merayakan momen istimewa.
					
				</p>
			</div>
			<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-[#765827]dark:text-gray-900">
				<img src="/assets/sleeping.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-3xl p-3 dark:bg-gray-500 dark:bg-[#765827]" />
				<p className="text-xl font-semibold leadi text-black">High Quality</p>
				<p className="text-sm uppercase text-black">Room</p>
			</div>
		</div>
		
		<div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
			<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-[#3C2A21]">
				<p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
					Restoran kami adalah surga kuliner yang menggoda lidah dengan hidangan lezat dari seluruh dunia. Dengan suasana elegan dan pemandangan yang memikat, kami menawarkan rasa yang tak tertandingi. Staf berpengalaman kami siap memenuhi semua keinginan Anda.
					
				</p>
			</div>
			<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-[#765827]dark:text-gray-900">
				<img src="/assets/cutlery.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-3xl p-3 dark:bg-gray-500 dark:bg-[#765827]" />
				<p className="text-xl font-semibold leadi text-black">High Quality</p>
				<p className="text-sm uppercase text-black">Food</p>
			</div>
		</div>

        <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
			<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-[#3C2A21]">
				<p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
                    Tempat yang sempurna untuk bersantai di tengah taman tropis dengan kursi berjemur dan cabana yang nyaman. Dengarkan suasana kota yang tenang sambil menikmati minuman segar dari bar kolam renang kami.
				</p>
			</div>
			<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-[#765827]dark:text-gray-900">
				<img src="/assets/swimming.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-3xl p-3 dark:bg-gray-500 dark:bg-[#765827]" />
				<p className="text-xl font-semibold leadi text-black">High Quality</p>
				<p className="text-sm uppercase text-black">Swimming Pool</p>
			</div>
		</div>

        <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
			<div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-[#3C2A21]">
				<p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
					
                    Tempat yang sempurna untuk berlatih dengan peralatan terkini dan pemandangan indah kota. Terang, tenang, dan dilengkapi dengan mesin kardio, kekuatan, serta ruang istirahat. Transformasikan diri Anda di sini!
					
				</p>
			</div>
			<div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-[#765827]dark:text-gray-900">
				<img src="/assets/gym.png" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-3xl p-3 dark:bg-gray-500 dark:bg-[#765827]" />
				<p className="text-xl font-semibold leadi text-black">High Quality</p>
				<p className="text-sm uppercase text-black">Sport Area</p>
			</div>
		</div>
	</div>
</section>

            </div>
        )
    }
}