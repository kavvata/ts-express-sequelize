import { sequelize } from "main/database/connections/sqlite";
import { DataTypes, Model } from "sequelize";

export interface SetorInstance extends Model {
  id: number;
  nome: string;
  descricao: string;
}

export const Setor = sequelize.define<SetorInstance>(
  "Setor",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nome: { type: DataTypes.STRING },
    descricao: { type: DataTypes.STRING },
  },
  {
    tableName: "setores",
  },
);
