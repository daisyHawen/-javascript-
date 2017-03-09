const s = 100;
const test = {
	s: 200,
	p: () => {
		setTimeout(() => {
			console.log(this.s);
		})
	}
}
test.p();