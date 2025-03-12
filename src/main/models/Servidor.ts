import { DataTypes, Model } from "sequelize";
import sequelize from "main/database/connections/db";
export interface ServidorInstance extends Model {
  id: number;
  nomeCompleto: string;
  matricula: string;
  cpf: string;
  email: string;
}
export const Servidor = sequelize.define<ServidorInstance>(
  "Servidor",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nomeCompleto: { type: DataTypes.STRING },
    cpf: { type: DataTypes.STRING },
    matricula: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  {
    tableName: "servidores",
  },
);
