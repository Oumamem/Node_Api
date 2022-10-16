const validTypes = ['Feu' , 'Plante' , 'Poison' , 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'Le nom doit être unique'
        },
        validate: {
          notEmpty:{msg: 'ça doit pas etre vide'},
          notNull: {msg: 'ça doit pas être null'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt:{msg: 'Utilisez que des entiers'},
          notNull: {msg: 'ça doit pas être null'},
          min: {
            args: [0],
            msg:'minimum 0 pour hp'
          },
          max: {
            args: [999],
            msg:'maximum 999 pour hp'
          }

        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt:{msg: 'Utilisez que des entiers'},
          notNull: {msg: 'ça doit pas être null'},
          min: {
            args: [0],
            msg:'minimum 0 pour cp'
          },
          max: {
            args: [99],
            msg:'maximum 999 pour cp'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl:{msg: 'Utilisez que des url'},
          notNull: {msg: 'ça doit pas être null'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate: {
          //validateur personnalisé
          isTypeValid(value){
            if(!value){
              throw new Error('Un pokemon doit avoir au moins un type');
            }
            if(value.split(',').length >3){
              throw new Error('Un pokemon doit avoir au maximum 3 types')
            }
            value.split(',').forEach(type => {
              console.log(type)
              if(!validTypes.includes(type)){
                console.log('error')
                throw new Error(`les types ne sont pas dans la liste suivante: $(validTypes)`)
              }
            });
          }
          
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }