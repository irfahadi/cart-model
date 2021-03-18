const cart = (sequelize,DataTypes)=>{

    const cart = sequelize.define('cart', {
      cart_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      cart_created_on: {
        type: DataTypes.DATE,
        allowNull: true
      },
      cart_total_weight: {
        type: DataTypes.REAL,
        allowNull: true
      },
      cart_total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cart_total_qty: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cart_acco_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'account',
          key: 'acco_id'
        }
      },
      cart_stat_name: {
        type: DataTypes.STRING(15),
        allowNull: true,
        references: {
          model: 'status',
          key: 'stat_name'
        }
      }
    }, {
      sequelize,
      tableName: 'cart',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "cart_pkey",
          unique: true,
          fields: [
            { name: "cart_id" },
          ]
        },
      ]
    });

    cart.associate = models => {
      cart.belongsTo(models.account,{foreignKey : 'cart_acco_id'});
      cart.belongsTo(models.status,{foreignKey : 'cart_stat_name'});
      cart.hasMany(models.clit,{foreignKey : 'clit_cart_id'});
    }
      return cart
}
export default cart
