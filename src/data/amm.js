
const nativeTokens = {
	bnb: {
		address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
		decimals: 18,
		name: "Wrapped BNB",
		symbol: "WBNB",
	},
	matic: {
		address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
		decimals: 18,
		name: "Wrapped Matic",
		symbol: "WMATIC",
	},
	ftm: {
		address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
		decimals: 18,
		name: "Wrapped Fantom",
		symbol: "WFTM",
	},
	eth: {
		address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
		decimals: 18,
		name: "Wrapped Ether",
		symbol: "WETH",
	},
	ht: {
		address: "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
		decimals: 18,
		name: "Wrapped HT",
		symbol: "WHT",
	},
}

 export const networks = {
	bsc: {
		name: "bsc",
		networkId: 56,
		token: nativeTokens.bnb,
	},
	polygon: {
		name: "polygon",
		networkId: 137,
		token: nativeTokens.matic,
	},
	fantom: {
		name: "fantom",
		networkId: 250,
		token: nativeTokens.ftm,
	},
	ethereum: {
		name: "ethereum",
		networkId: 1,
		token: nativeTokens.eth,
	},
	heco: {
		name: "heco",
		networkId: 128,
		token: nativeTokens.ht,
	},
}


networks.bsc.amms = [
	{
		name: 'Pancakeswap V1',
		router: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
		factory: '0xBCfCcbde45cE874adCB698cC183deBcF17952812',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Pancakeswap V2',
		router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
		factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Apeswap',
		router: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
		factory: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Sushiswap',
		router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
		factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Biswap',
		router: '0x3a6d8ca21d1cf76f653a67577fa0d27453350dd8',
		factory: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Bakery',
		router: '',
		factory: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Jetswap',
		router: '0xBe65b8f75B9F20f4C522e0067a3887FADa714800',
		factory: '0x0eb58E5c8aA63314ff5547289185cC4583DfCBD5',
		chef: '',
		timelock: '',
		proof: '',	
	},
	{
		name: 'Mdex',
		router: '0x7dae51bd3e3376b8c7c4900e9107f12be3af1ba8',
		factory: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: '1Inch',
		router: '0xc603a00595d5f8ea8d93c5c338c00ff29dba6258',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Dodo',
		router: '0x8f8dd7db1bda5ed3da8c9daf3bfa471c12d58486',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	}
]

networks.polygon.amms = [
	{
		name: 'Quickswap',
		router: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Sushiswap',
		router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Apeswap',
		router: '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Dfyn',
		router: '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
		factory: '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Honeyswap',
		router: '0xaD340d0CD0B117B0140671E7cB39770e7675C848',
		factory: '0x03DAa61d8007443a6584e3d8f85105096543C19c',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Waultswap',
		router: '0x3a1d87f206d12415f5b0a33e786967680aab4f6d',
		factory: '0xa98ea6356a316b44bf710d5f9b6b4ea0081409ef',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Jetswap',
		router: '0x5C6EC38fb0e2609672BDf628B1fD605A523E5923',
		factory: '0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Creampie',
		router: '0xA3415b8F2D3Ef121248362fCf3e4437c21545A68',
		factory: '0xf502b3d87311863bb0ac3cf3d2729a78438116cf',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Polycat',
		router: '',
		factory: '0xf502b3d87311863bb0ac3cf3d2729a78438116cf',
		chef: '',
		timelock: '',
		proof: '',		
	},
	{
		name: 'Balancer',
		router: '0xba12222222228d8ba445958a75a0704d566bf2c8',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	}
]
	

networks.fantom.amms = [
	{
		name: 'Spiritswap',
		router: '0x16327e3fbdaca3bcf7e38f5af2599d2ddc33ae52',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Spookyswap',
		router: '0xf491e7b69e4244ad4002bc14e878a34207e38c29',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Sushiswap',
		router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Hyperswap',
		router: '0x53c153a0df7e050bbefbb70ee9632061f12795fb',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
]

networks.ethereum.amms = [
	{
		name: 'Uniswap V2',
		router: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Uniswap V3',
		router: '0xe592427a0aece92de3edee1f18e0157c05861564',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
	{
		name: 'Sushiswap',
		router: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
]

networks.heco.amms = [
	{
		name: 'Mdex',
		router: '0xed7d5f38c79115ca12fe6c0041abb22f0a06c300',
		factory: '',
		chef: '',
		timelock: '',
		proof: '',
	},
]

