export default {
	mobile: /^1[3|4|5|6|7|8][0-9]{9}$/,
	mobileAbroad: /^[0-9]{1,}$/,
	number: /^[0-9]{1,}$/,
	verify: /[0-9]{4}/,
	password: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/,
}