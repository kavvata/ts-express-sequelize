import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "main/database/connections/db";
import { Setor } from "./Setor";

interface ServidorAttributes {
  id: number;
  nomeCompleto: string;
  matricula: string;
  cpf: string;
  email: string;
  setorId?: number;
}

export interface ServidorCreationAttributes
  extends Optional<ServidorAttributes, "id"> {}

export class Servidor extends Model<
  ServidorAttributes,
  ServidorCreationAttributes
> {
  public id!: number;
  public nomeCompleto!: string;
  public matricula!: string;
  public cpf!: string;
  public email!: string;

  declare public getSetor: () => Promise<Setor | null>;
  declare public setSetor: (setor: Setor) => Promise<void>;
  declare public setorId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Servidor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    setorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Setor,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "servidores",
    modelName: "Servidor",
  },
);

Servidor.belongsTo(Setor, {
  foreignKey: "setorId",
  as: "setor",
});

export default Servidor;
