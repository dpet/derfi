export default function Docs(){
 	return (
 		<div className="container docs">

 			<h2 className="is-size-3 pt-4 mb-4 light-green">DerfiDefi</h2>
 			<p className="is-size-5 mb-5">
 				This site is meant to provide a few tools to help explore Factory contracts and Liquidity Pools. The main goal is to help people understand the underlying contracts and see metrics that are normally hidden or hard to see. It uses Metamask to fetch data. It assumes the common uniswap contract interfaces so it may not work with contracts that vary like uniswap V3 etc. 
 			</p>


 			<h2 className="is-size-3 pt-4 mb-4 light-green">Liquidity Pools</h2>
 			<p className="is-size-5 mb-5">
 				Liquidity pools are contracts that allow for the trading of two tokens. The liquidity pool contract involves three tokens, the two tokens being traded and an LP token that is used to represent a users share in the pool. The LP Token lives at the LP Contract address. The LP Contract holds references to the two traded token contracts which live at different addresses. <a href="https://bscscan.com/address/0x20bCC3b8a0091dDac2d0BC30F68E6CBb97de59Cd" target="_blank">Here</a> is an example of a Liquidity Pool contract. <a href="https://bscscan.com/address/0x20bCC3b8a0091dDac2d0BC30F68E6CBb97de59Cd#readContract" target="_blank">Here</a> are some contract details.
 			</p>

 			<p className="is-size-5 mb-5">
 				Liquidity Pools give you an amount of LP Tokens when you deposit the two trading tokens. These Lp Tokens represent your share in the pools. If the pool generates fees then the value of your LP Tokens will increase. You can also deposit your LP Tokens into a Staking Pool to farm other tokens.
 			</p>


 			<h2 className="is-size-3 pt-4 mb-4 light-green">Factories</h2>
 			<p className="is-size-5 mb-5">
 				A liquidity pool gets registered with a Factory Contract at creation. The Factory Contract holds references to all of the Liquidity Pools that are registered with it. A Factory can not have two pools with the same two trading tokens. Once a Liquidity Pool is registered with a Factory, that becomes the official Liquidity Pool for those two tokens. <a href="https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73" target="_blank">Here</a> is Pancakeswap's Factory.
 			</p>

 			<p className="is-size-5 mb-5">
 				When a Liquidity Pool is registered with a Factory, it is given an index number. The Factory has methods to allow you to find a Liquidity Pool by providing two token addresses or by providing an index. The index is just what number the Pool is in the list of Pools. Unfortunately, if you provide two token adddresses to find a Pool, it does not return what index the Pool has.
 			</p>

 			<p className="is-size-5 mb-5">
 				Exchanges can create their own Factories or they can piggyback on the Factories of other exchanges. Some exchanges on Binance Smart Chain that have their own Factories are Pancakeswap, Sushiswap and Apeswap. Since these are each separate Factories, they can each have Liquidity Pools with the same tokens. 
 			</p>


 			<h2 className="is-size-3 pt-4 mb-4 light-green">Routers</h2>
 			<p className="is-size-5 mb-5">
 				A Router Contract can be used to find efficient paths for trading two tokens. It holds a reference to a Factory Contract and can see the Liquidity Pools and their liquidity. It may decide that a large token trade needs to avoid Liquidity Pools that don't have enough liquidity. ex. Maybe a user is trading WBNB for another token, the token may have a larger pool for BUSD than for WBNB so the router may decide to convert WBNB for BUSD before trading to the token to avoid moving the WBNB pool too much and losing value in the trade. <a href="https://bscscan.com/address/0x10ed43c718714eb63d5aa57b78b54704e256024e" target="_blank">Here</a> is Pancakeswap's Router.
 			</p>

 			<p className="is-size-5 mb-5">
 				It is worth checking multiple exchanges to see which has the largest pools for the token you want to trade. Making a large trade in an illiquid Liquidity Pool can lead to large losses. Some exchanges like 1inch try to find efficient paths between exchanges.
 			</p>

 			<h2 className="is-size-3 pt-4 mb-4 light-green">Chefs</h2>
 			<p className="is-size-5 mb-5">
 				Chef Contracs allow for the creation of Staking Pools. Once a users has some LP Tokens, they can deposit them into a staking pool to farm other tokens. This acts as an incentive to get users to fund Liquidity Pools. 

 				<a href="https://bscscan.com/address/0x73feaa1ee314f8c655e354234017be2193c9e24e" target="_blank">Here</a> is Pancakeswap's Chef.
 			</p>
 		</div>
 	)
 }

 