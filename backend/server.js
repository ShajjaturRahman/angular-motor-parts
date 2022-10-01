const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const morgan = require("morgan")
const multer = require("multer")

const storage = multer.diskStorage({   
	destination: function(req, file, cb) { 
		cb(null, './uploads');    
	}, 
	filename: function (req, file, cb) { 
		const date = new Date()
		cb(null , date.getTime() + "-" + file.originalname);   
	}
 });
 
const upload = multer({ storage: storage })

const app = express()

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "products"
})

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(morgan("tiny"))

app.get("/", (req, res) => {
	return res.send("Hello From API")
})

// upload image to server
app.post("/upload", upload.single("product_img"), (req, res) => {
	return res.send({ message: "Uploaded Successfully", location: req.file.path })
})

// new product add
app.post("/product/add", (req, res) => {
	const { name, price, stock, image } = req.body

	const sql = "INSERT INTO product_table(name, price, stock, product_img) VALUES(?, ?, ?, ?)"
	db.query(sql, [name, price, stock, image], (err, result) => {
		if(err) throw err

		console.log(result);
	})
	return res.send({ message: "Product Added Successfully" })
})

// view product list
app.get("/product/list", (req, res) => {
	const sql = "SELECT * FROM product_table"
	db.query(sql, (err, result) => {
		if(err) throw err

		return res.send(result)
	})
})

// view product item by id
app.get("/product/:id", (req, res) => {
	const product_id = req.params.id
	const sql = "SELECT * FROM product_table WHERE id = ?"

	db.query(sql, product_id, (err, result) => {
		if(err) throw err

		return res.send(result)
	})
})

app.patch("/product/update", (req, res) => {
	const { id, name, price, stock } = req.body

	const sql = "UPDATE product_table SET name = ?, price = ?, stock = ? WHERE id = ?"
	db.query(sql, [name, price, stock, id], (err, result) => {
		if(err) throw err

		console.log(result);
	})

	return res.send({ message: "Product Updated" })
})

// delete product
app.delete("/product/delete/:id", (req, res) => {
	const { id } = req.params

	const sq1 = "DELETE FROM product_table WHERE id= ?"
	db.query(sq1, id, (err, result) => {
		if(err) throw err

		return res.send({ message: "Product Deleted", result: result })
	})
})

// user registration
app.post("/user/registration", (req, res) => {
	const { username, password } = req.body

	let sql = ""

	sql = "SELECT * FROM users WHERE username = ?"
	
	db.query(sql, username, (err, result) => {
		if(err) console.log('select', err.message);

		if(result.length > 0){
			return res.send({ message: "Username already Exist", flag: "FAIL" })
		} else {
			sql = "INSERT INTO users(username, password) VALUES (?, ?)"
		
			db.query(sql, [username, password], (err, result) => {
				if(err) console.log('insert', err.message);
		
				if(result){
					return res.send({ message: "User Created Successfully", flag: "SUCCESS" })
				}
			})
		}
	})

})

// user login
app.post("/user/login", (req, res) => {
	const { username, password } = req.body

	const sql = "SELECT * FROM users WHERE username = ? AND password = ?"

	db.query(sql, [username, password], (err, result) => {
		if(err) throw err

		if(result.length > 0){
			return res.send({ flag: "SUCCESS", user: result[0] })
		} else {
			return res.send({ flag: "FAIL", user: "" })
		}
	})
})

app.post("/order/place", (req, res) => {
	const { name, contact, address, ids, date } = req.body

	const sql = "INSERT INTO orders(customer_name, contact, delivery_address, product_id, purchased_date) VALUES ?"
	const values = ids.map(eachId => [name, contact, address, eachId, date])

	db.query(sql, [values], (err, result) => {
		if(err)	throw err

		if(result.insertId !== null){
			return res.send({ message: "Order Placed", flag: "SUCCESS" })
		}

		return res.send({ result, flag: "FAIL" })
	})
})

app.get("/order/list", (req, res) => {
	const sql = "SELECT * FROM `orders` INNER JOIN `product_table` ON product_table.id = orders.product_id"
	db.query(sql, (err, result) => {
		if(err) throw err

		return res.send({ list: result })
	})
})

app.listen(1010, () => {
	console.log('✅ API Server Running...');
	db.connect(err => {
		if(err){
			console.log('Error: ', err.message);
		} else {
			console.log('📌 DB Connected !');
		}
	})
})