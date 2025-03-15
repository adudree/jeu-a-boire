<template>
	<main>
		<NuxtPage />
	</main>
</template>
<style>
@import url('/assets/css/normalize.css');
@import url('/assets/css/main.css');
@import url('/assets/css/reset.css');
main {
	font-family: 'Domine', sans-serif !important;
}
button {
	border: none;
	padding: 10px;
	border-radius: 8px;
	background: #7e3a86;
	color: #fff;
	&:hover {
		cursor: pointer;
		background: #522357;
	}
}
</style>