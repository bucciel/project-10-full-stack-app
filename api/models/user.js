'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Your first name is required'
                }
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Your last name is required'
                }
            },
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email address'
                },
                notEmpty: {
                    msg: 'Your email address is required'
                }
            },
            unique: {
                args: true,
                msg: "This email address already exists."
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Your password is required'
                }
            },
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Course, {   //adds associations
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return User;
};