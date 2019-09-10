'use strict';

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Course title is required'
                }
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Course description is required'
                }
            },
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {      //adds associations
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return Course;
};