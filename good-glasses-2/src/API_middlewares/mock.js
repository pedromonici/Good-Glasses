class MockAPI {
	constructor() {};

	async registerUser(user) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let users = localStorage.getItem("users");
				if (typeof users !== "string") {
					users = "{}";
				}
				users = JSON.parse(users);
				if (user.cpf in users) {
					reject("CPF já em uso!");
				} else {
					users[user.cpf] = user;
					localStorage.setItem("users", JSON.stringify(users));
					resolve("");
				}
			}, 300);
		});
	};

	async authUser(cpf, passwd) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let users = localStorage.getItem("users");
				if (typeof users !== "string") {
					users = "{}";
				}
				users = JSON.parse(users);
				if (cpf in users && passwd === users[cpf].password) {
					resolve("");
				} else {
					reject("");
				}
			}, 300);
		});
	};

	async getUserInfo(cpf) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let users = localStorage.getItem("users");
				if (typeof users !== "string") {
					users = "{}";
				}
				users = JSON.parse(users);
				if (cpf in users) {
					resolve(JSON.stringify(users[cpf]));
				} else {
					reject("Usuário não encontrado!");
				}
			}, 300);
		});
	};

	async updateUserInfo(cpf, info) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let users = localStorage.getItem("users");
				if (typeof users !== "string") {
					users = "{}";
				}
				users = JSON.parse(users);
				if (cpf in users) {
					users[cpf] = {...users[cpf], ...info};
					localStorage.setItem("users", JSON.stringify(users));
					resolve("");
				} else {
					reject("Usuário não encontrado!");
				}
			}, 300);
		});
	};

	async getProduct(name) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let products = localStorage.getItem("products");
				if (typeof products !== "string") {
					products = "{}";
				}
				products = JSON.parse(products);
				if (name in products) {
					resolve(products[name]);
				} else {
					reject("Produto não encontrado!");
				}
			}, 300);
		});
	};

	async updateProduct(name, info) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let products = localStorage.getItem("products");
				if (typeof products !== "string") {
					products = "{}";
				}
				products = JSON.parse(products);
				if (name in products) {
					products[name] = {...products[name], ...info};
					localStorage.setItem("products", JSON.stringify(products));
					resolve("");
				} else {
					reject("Produto não encontrado!");
				}
			}, 300);
		});
	}

	async getProducts() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let products = localStorage.getItem("products");
				if (typeof products !== "string") {
					products = "{}";
				}
				resolve(products);
			}, 300);
		});
	};

	async removeProduct(name) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let products = localStorage.getItem("products");
				if (typeof products !== "string") {
					products = "{}";
				}
				products = JSON.parse(products);
				if (name in products) {
					delete products[name];
					localStorage.setItem("products", JSON.stringify(products));
					resolve("");
				} else {
					reject("O produto não existe!");
				}
			}, 300);
		});
	};

	async addProduct(product) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let products = localStorage.getItem("products");
				if (typeof products !== "string") {
					products = "{}";
				}
				products = JSON.parse(products);
				if (product.name in products) {
					reject("O produto já existe!");
				} else {
					products[product.name] = product;
					localStorage.setItem("products", JSON.stringify(products));
					resolve("");
				}
			}, 300);
		});
	};
}
const mockAPI = new MockAPI();

export default mockAPI;