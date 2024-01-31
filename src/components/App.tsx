import React, { useState } from "react"
import classes from './App.module.scss'
import { Outlet, Link } from "react-router-dom"
import Shop from "@/pages/shop/Shop"
import Ppng from "@/assets/47.png"
import Pjpg from "@/assets/7.jpg"
import Psvg from "@/assets/router.svg"
import Pgif from "@/assets/555.gif"
import Pwebp from "@/assets/4sm.webp"

export const App = () => {
	const [count, setCount] = useState<number>(0)

	const fn = () => {throw new Error()}
	const Fn = () => {fn()}


	const inc = () => {
		 setCount(prev => prev + 1)
		 Fn()
		}

	// имитируется ошибка типов для проверки transpileOnly и ForkTsCheckerWebpackPlugin()
	const sum = (a:number, b:number) => a + b
	sum(5, 10)



	return (
		<div data-testid={"123"}>
			<h2>PLATFORM: 
				{__PLATFORM__ == "desk" ? " Desktop Platform": " Mobile Platform"}
			</h2>
		<div className="links">
				<Link to={'/about'}>About</Link>
				<Link to={'/shop'}>Shop</Link>
				<Link to={'/contacts'}>Contacts</Link>
				<Link to={'/suggestions'}>Suggestions</Link>
			</div>
			<h1 data-testid={"456"} className={classes.h22}>App</h1>
			
			<div className={classes.picture}>
				<img src={Ppng} alt="PNG" />
				<img src={Pjpg} alt="JPG" />
				<img src={Pgif} alt="GIF" />
			{/* 	<img src={Pwebp} alt="WEBP" /> */}
			</div>

			<div className={classes.picture}>
				<div className={classes.img}>
					<Psvg width={250} height={250} className={classes.psvg}/>
				</div>
			</div>

			<Shop />
			<h1>{count}</h1>
			<button onClick={inc}>Increment&nbsp;<span> &#11014;</span></button>
			<h2 className={classes.h2}>Module Scss</h2>
			<h2 className={classes.h22}>Module Scss</h2>
			<Outlet />
		</div>
	)
}


