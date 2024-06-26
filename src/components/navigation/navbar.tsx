"use client"
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Logo from '../../../public/images/playVerseLogo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useProvider, useContract, useSigner } from 'wagmi'
import { ethers } from "ethers";
import {
	LogInWithAnonAadhaar,
	useAnonAadhaar,
	AnonAadhaarProof,
} from "anon-aadhaar-react";


const style = {
	wrapper: `bg-black w-screen px-[1.2rem] py-[0.8rem] flex `,
	logoContainer: `flex items-center cursor-pointer`,
	logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
	searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] h-[50px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
	searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
	searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
	headerItems: ` flex items-center align-right justify-end h-[50px]`,
	headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
	headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

export default function Navbar() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const { address, isConnected } = useAccount()
	console.log("account", address, "isConnected", isConnected);

	const [isDropdownOpen, setDropdownOpen] = useState(false);

	// const toggleDropdown = () => {
	// 	setDropdownOpen(!isDropdownOpen);
	// };

	const [anonAadhaar] = useAnonAadhaar();

	useEffect(() => {
		console.log("Anon Aadhaar status: ", anonAadhaar.status);
	}, [anonAadhaar]);


	return (
		<div className={style.wrapper}>
			<Link
				href="/"
				rel="noopener noreferrer"
				passHref
				className="text-secondary hover:text-white"
			>
				<div className="flex items-center cursor-pointer">
					<Image src={Logo} height={30} width={50} alt="logo" />

					<div className="ml-[0.8rem] text-white text-2xl font-serif">PlayVerse</div>
				</div>
			</Link>
			{/* search bar to search streams */}
			<div className={style.searchBar}>
				<div className={style.searchIcon}>
					<AiOutlineSearch />
				</div>
				<input
					className={style.searchInput}
					type="text"
					value={searchQuery}
					placeholder="Enter Your Streaming ID"
				//  onKeyPress={(e) => {
				// if (e.key === 'Enter')
				//     console.log(searchQuery)
				// }}
				/>
				<button
					onClick={() => {
						router.push(`/streaming/${searchQuery}`);
					}}
					className="text-white px-2"
				>
					Search
				</button>
			</div>

			<div className={style.headerItems}>
				<Link href="/streaming">
					{/* <div className={style.headerItem}> Streaming </div> */}
				</Link>
				<div
					className={style.headerItem}
					onClick={() => {
						router.push("/tournament");
					}}
				>
					Tournament
				</div>
				<div
					className={style.headerItem}
					onClick={() => {
						router.push("/nft");
					}}
				>
					Mint NFT
				</div>
				<div
					className={style.headerIcon}
					onClick={() => {
						router.push(`/profile/${address}`);
					}}
				>
					<CgProfile />
				</div>

				<div className={style.headerIcon}>
					<MdOutlineAccountBalanceWallet />
				</div>
				<div className="px-2">
					{/* <ConnectButton></ConnectButton> */}
					<details className="dropdown dropdown-bottom dropdown-end ">
						{/* <button onClick={toggleDropdown} className="px-6 py-2 bg-[#98ee2c] text-black font-semibold ">Connect Wallet</button> */}
						<summary className="btn px-4 py-1 bg-[#98ee2c] text-black font-semibold">Connect</summary>
						<ul className="p-2 menu dropdown-content z-[1] bg-base-100 rounded-box">
							<li><a>
								<ConnectButton></ConnectButton>
							</a></li>
							<li><a>
								{/* <p>{anonAadhaar?.status}</p> */}
							</a></li>
						</ul>
						{/* {isDropdownOpen && (
							// <div className="dropdown-content">
							// 	<a href="#option1" className="break-all">Option 1</a>
							// 	<a href="#option2" className="break-all">Option 2</a>
							// </div>
							
						)} */}
					</details>

				</div>
				{/* <div className="pt-8">
					<LogInWithAnonAadhaar />
					<p>{anonAadhaar?.status}</p>
				</div> */}
				<div >
					{/* Render the proof if generated and valid */}

					{anonAadhaar?.status === "logged-in" && (
						<>
							<p>✅ Proof is valid</p>
							<button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
							<AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />

							<dialog id="my_modal_1" className="modal">
								<div className="modal-box">
									<AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
								</div>
							</dialog>
						</>
					)}
				</div>
			</div>
		</div >
	);
}
