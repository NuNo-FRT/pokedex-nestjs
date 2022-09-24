import { Injectable, BadRequestException, InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    return await this.pokemonModel.find()
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: +term})
    }

    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase()});
    }

    if(!pokemon) throw new NotFoundException(`Pokmeon por id, name o no. No se encontro`);
    
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term)
      if(updatePokemonDto.name){
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
      }
      await pokemon.updateOne(updatePokemonDto)
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
      const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
      if(deletedCount === 0){
        throw new BadRequestException('El pokemon no existe');
      }
      return;
  }

  private handleExceptions(error: any) {
    if(error.code === 11000){
      throw new BadRequestException(`El pokemon ya existe ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException('Algo salio mal.');
  }
}