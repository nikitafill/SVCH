const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name cannot be null.',
      },
      notEmpty: {
        msg: 'Name cannot be empty.',
      },
    },
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Experience cannot be null.',
      },
      min: {
        args: [0],
        msg: 'Experience should be a non-negative integer.',
      },
    },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Bio cannot be null.',
      },
      notEmpty: {
        msg: 'Bio cannot be empty.',
      },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Image cannot be null.',
      },
      notEmpty: {
        msg: 'Image cannot be empty.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email cannot be null.',
      },
      notEmpty: {
        msg: 'Email cannot be empty.',
      },
      isEmail: {
        msg: 'Invalid email format.',
      },
    },
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Position cannot be null.',
      },
      notEmpty: {
        msg: 'Position cannot be empty.',
      },
    },
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Department cannot be null.',
      },
      notEmpty: {
        msg: 'Department cannot be empty.',
      },
    },
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Group ID cannot be null.',
      },
    },
  },
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lists: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isFloat: true,
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Group name cannot be null.',
      },
      notEmpty: {
        msg: 'Group name cannot be empty.',
      },
    },
  },
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Username cannot be null.',
      },
      notEmpty: {
        msg: 'Username cannot be empty.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email cannot be null.',
      },
      notEmpty: {
        msg: 'Email cannot be empty.',
      },
      isEmail: {
        msg: 'Invalid email format.',
      },
    },
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password cannot be null.',
      },
      notEmpty: {
        msg: 'Password cannot be empty.',
      },
    },
  },
});

Employee.belongsTo(Group, {
  foreignKey: 'groupId',
  as: 'group',
  onDelete: 'CASCADE',
});

Group.hasMany(Employee, {
  foreignKey: 'groupId',
  onDelete: 'CASCADE',
});

module.exports = {
  Employee,
  Product,
  Group,
  User,
  sequelize,
};