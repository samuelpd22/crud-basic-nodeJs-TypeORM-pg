import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('userstb')
class User{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{ length:100,nullable:false})
    name:string;

    @Column('varchar',{ length:100,nullable:false})
    email: string;

}
export default User;