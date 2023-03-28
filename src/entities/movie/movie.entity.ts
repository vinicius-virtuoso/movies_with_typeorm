import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50, unique: true })
  name: string

  @Column({ nullable: true, type: 'text' })
  description: string

  @Column()
  duration: number

  @Column()
  price: number
}
