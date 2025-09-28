import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.Aluguel, { foreignKey: 'clienteId' });
    }
  }
  Cliente.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
