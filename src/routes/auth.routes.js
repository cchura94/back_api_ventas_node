import { Router } from "express"
import authController from "./../controllers/auth.controller"

export const Route = Router()

Route.post('/auth/login', authController.login);
Route.post('/auth/register', authController.register);
Route.get('/auth/perfil', authController.perfil);
Route.post('/auth/logout', authController.logout);
