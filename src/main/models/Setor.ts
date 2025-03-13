import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "main/database/connections/db";
import { Servidor } from "./Servidor";

interface SetorAttributes {
  id: number;
  nome: string;
  descricao: string;
}

interface SetorCreationAttributes extends Optional<SetorAttributes, "id"> {}

export class Setor extends Model<SetorAttributes, SetorCreationAttributes> {
  public id!: number;
  public nome!: string;
  public descricao!: string;

  declare public getServidores: () => Promise<Servidor[]>;
  declare public addServidor: (servidor: Servidor) => Promise<void>;
  declare public countServidores: () => Promise<number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Setor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "setores",
    modelName: "Setor",
  },
);

export default Setor;
