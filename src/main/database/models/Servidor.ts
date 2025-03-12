import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connections/sqlite";

export interface ServidorInstance extends Model {
  id: number,
  nomeCompleto: string,
  matricula: string,
  cpf: string,
  email: string,
}
export const Servidor = sequelize.define<ServidorInstance>('Servidor', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  nomeCompleto: DataTypes.STRING,
  cpf: DataTypes.STRING,
  matricula: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  tableName: 'servidores',
})
