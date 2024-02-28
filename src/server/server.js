const express = require('express');
const cors = require('cors');

const sequelize = require("./db");
const { Employee, Product, Group, User } = require('./models/models');

const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

const CheckMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, 'secretniy_kluch', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

app.use(cors());
app.use(express.json());



app.get('/employees', CheckMiddleware, async (req, res) => {
    const employees = await Employee.findAll();
    res.json(employees);
});

app.get('/employees/:id', CheckMiddleware, async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);
    res.json(employee);
});

app.post('/employees', CheckMiddleware, async (req, res) => {
    const employee = await Employee.create(req.body);
    res.json(employee);
});

app.put('/employees/:id', CheckMiddleware, async (req, res) => {
    await Employee.update(req.body, { where: { id: req.params.id } });
    const updatedEmployee = await Employee.findByPk(req.params.id);
    res.json(updatedEmployee);
});

app.delete('/employees/:id', CheckMiddleware, async (req, res) => {
    await Employee.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Employee deleted successfully' });
});

app.post('/products', CheckMiddleware, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/products/:id', CheckMiddleware, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        console.log(req.body)
        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/products/:id', CheckMiddleware, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/groups', CheckMiddleware, async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/groups', CheckMiddleware, async (req, res) => {
    try {
        const groups = await Group.findAll({
            include: [
                {
                    model: Employee,
                },
            ],
        });
        const modifiedGroups = groups.map(group => {
            const modifiedGroup = group.toJSON();
            modifiedGroup.members = modifiedGroup.Employees;
            delete modifiedGroup.Employees;
            return modifiedGroup;
        });

        res.json(modifiedGroups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/groups/:id', CheckMiddleware, async (req, res) => {
    const groupId = req.params.id;
    try {
        const [updatedRowsCount, updatedGroups] = await Group.update(req.body, {
            where: { id: groupId },
            returning: true,
        });
        if (updatedRowsCount > 0) {
            res.json(updatedGroups[0]);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/groups/:id', CheckMiddleware, async (req, res) => {
    const groupId = req.params.id;
    try {
        const deletedRowCount = await Group.destroy({ where: { id: groupId } });
        if (deletedRowCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const existingUser = await User.findOne({
            where: {
                username: username,
                email: email
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email is already taken.' });
        }

        const newUser = await User.create({
            username,
            email,
            password,
            profession: 'Безработный',
            about: 'Обо мне'
        });

        const token = jwt.sign({ id: newUser.id, username: newUser.username, email: newUser.email, about: newUser.about, profession: newUser.profession }, 'secretniy_kluch', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const isPasswordValid = password == user.password;

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, about: user.about, profession: user.profession }, 'secretniy_kluch', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/users/:id', CheckMiddleware, async (req, res) => {
    const userId = req.params.id;
    const { username, email, profession, about, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password != currentPassword) {
            return res.status(401).json({ error: 'Password mismatch' });
        }

        user.username = username;
        user.email = email;
        user.profession = profession;
        user.about = about;
        user.password = newPassword;


        await user.save();

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, about: user.about, profession: user.profession }, 'secretniy_kluch', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start()