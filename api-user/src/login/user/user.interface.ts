import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario'})
export class User {
    @PrimaryGeneratedColumn() 
    id_user: number;
    @Column({ type: 'varchar', length: 50 })
    nombre: string;
    @Column({ type: 'varchar', length: 50 })
    usuario: string;
    @Column({ type: 'varchar', length: 250 })
    clave: string;
}