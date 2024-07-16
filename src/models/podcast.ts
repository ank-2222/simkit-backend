import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert, 
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
  } from 'typeorm';
  import { v4 as uuidv4 } from 'uuid';
  @Entity()
  export class Podcast extends BaseEntity {
  
    @PrimaryColumn()
    id: string
  
    @Column({ type: 'text' })
    title: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ type: 'text' })
    image_url: string;
  
    @Column({ type: 'text' })
    audio_file: string;
  
    @Column({ type: 'text', nullable: true })
    subtitle?: string;
  
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

  
  }
  