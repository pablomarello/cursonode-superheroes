import express from 'express';
import { body } from 'express-validator';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  crearSuperheroeController,
  actualizarSuperheroeController,
  borrarSuperheroePorIdController,
  borrarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';
import superheroValidations from '../validations/superheroValidation.mjs';

const router = express.Router();


router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.post('/heroes', superheroValidations, crearSuperheroeController);
router.put('/heroes/:id', superheroValidations, actualizarSuperheroeController);
router.delete('/heroes/:id', borrarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController);

export default router;