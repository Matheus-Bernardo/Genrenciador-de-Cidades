import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Aluguel extends Model {
    static associate(models) {
      Aluguel.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
      Aluguel.belongsTo(models.Filme, { foreignKey: 'filmeId' });
    }
  }
  Aluguel.init({
    dataAluguel: DataTypes.DATE,
    dataDevolucao: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aluguel',
  });
  return Aluguel;
};
