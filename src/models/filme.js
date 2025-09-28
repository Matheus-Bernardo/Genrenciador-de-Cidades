import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Filme extends Model {
    static associate(models) {
      Filme.hasMany(models.Aluguel, { foreignKey: 'filmeId' });
    }
  }
  Filme.init({
    titulo: DataTypes.STRING,
    diretor: DataTypes.STRING,
    ano: DataTypes.INTEGER,
    disponivel: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Filme',
  });
  return Filme;
};
