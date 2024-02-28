const express = require('express');
const cors = require('cors');

const sequelize = require("./db");
const { Employee, Product, Group } = require('./models/models');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/employees', async (req, res) => {
    const employees = await Employee.findAll();
    res.json(employees);
});

app.get('/employees/:id', async (req, res) => {
    const employee = await Employee.findByPk(req.params.id);
    res.json(employee);
});

app.post('/employees', async (req, res) => {
    const employee = await Employee.create(req.body);
    res.json(employee);
});

app.put('/employees/:id', async (req, res) => {
    await Employee.update(req.body, { where: { id: req.params.id } });
    const updatedEmployee = await Employee.findByPk(req.params.id);
    res.json(updatedEmployee);
});

app.delete('/employees/:id', async (req, res) => {
    await Employee.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Employee deleted successfully' });
});

app.post('/products', async (req, res) => {
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

app.put('/products/:id', async (req, res) => {
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

app.delete('/products/:id', async (req, res) => {
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

app.post('/groups', async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/groups', async (req, res) => {
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

app.put('/groups/:id', async (req, res) => {
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

app.delete('/groups/:id', async (req, res) => {
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