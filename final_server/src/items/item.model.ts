import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'items' })
export class Item extends Model<Item> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;
}
