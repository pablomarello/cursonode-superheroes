import { validationResult } from 'express-validator';
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
  buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperHeroe, 
  actualizarSuperHeroe, eliminarSuperheroePorId,
  eliminarSuperheroePorNombre}
  from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes }
  from '../views/responseView.mjs';

  export async function crearSuperheroeController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const nuevoSuperheroe = req.body;
    const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
  
    if (superheroeCreado.error) {
      res.status(400).send({ mensaje: 'Error al crear el superhéroe', error: superheroeCreado.error });
    } else {
      res.status(201).send(renderizarSuperheroe(superheroeCreado));
    }
  }

export async function actualizarSuperheroeController(req, res) {
  const {id} = req.params;
  const superheroe = req.body;
  const result = await actualizarSuperHeroe(id, superheroe);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo actualizar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe actualizado exitosamente'
  });
}

export async function borrarSuperheroePorIdController(req, res) {
  const {id} = req.params;
  const result = await eliminarSuperheroePorId(id);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo eliminar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe eliminado exitosamente'
  });
}

export async function borrarSuperheroePorNombreController(req, res){
  const {nombre} = req.params;
  const result = await eliminarSuperheroePorNombre(nombre);
  if(result?.error){
    res.status(400).json({mensaje: 'No se pudo eliminar el superheroe', error: result.error });
    return;
  }
  res.status(200).json({
    data: renderizarSuperheroe(result),
    mensaje: 'Superheroe eliminado exitosamente'
  });
}

export async function obtenerSuperheroePorIdController(req, res){
  const { id } = req.params
  const superheroe = await obtenerSuperheroePorId(id);

  if(superheroe){
    res.send(renderizarSuperheroe(superheroe));
  }else{
    res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res){
  const superheroes = await obtenerTodosLosSuperheroes();
  res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroesPorAtributoController(req, res){
  const { atributo, valor } = req.params;
  const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

  if(superheroes.length > 0){
    res.send(renderizarListaSuperheroes(superheroes));
  }else{
    res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atibuto" });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res){
  const superheroes = await obtenerSuperheroesMayoresDe30();
  res.send(renderizarListaSuperheroes(superheroes));
}