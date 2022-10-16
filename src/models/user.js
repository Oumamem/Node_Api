module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique:{
                msg: 'Le nom utilisateur est utilisé déjà'
            },
        },
        password: {
            type: DataTypes.STRING
        }


    })


}