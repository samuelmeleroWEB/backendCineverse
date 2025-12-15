import { Router } from "express";
import { deleteMovieController, getMovieController, getMoviesController, getMovieSessionController, getMvpMoviesController, postMovieController, postMoviesController, putMovieController, putMvpMoviesController } from "../controllers/movie.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// ---------- GET /movies (público) CUALQUIERA PUEDE VER LA LISTA-ESTA ES LA RUTA BASE /MOVIES ---------- //
router.get("/", getMoviesController);

// ---------- GET /movies/:id (público) VER UNA PELICULA ESPECIFICA 
router.get("/:id", getMovieController);

// ---------- GET /movies/:id/sessions (sesiones de una película)
router.get("/:id/sessions", getMovieSessionController);

// ---------- GET /movies/mvp  → lista de pelis marcadas como MVP
router.get("/mvp", getMvpMoviesController);

                      // ADMIN

// PUT /movies/mvp  → actualiza qué pelis son MVP
router.put("/mvp", authMiddleware, isAdmin, putMvpMoviesController);

// ---------- POST /movies (solo admin)
router.post("/", authMiddleware, isAdmin, postMovieController);

// ---------- PUT /movies/:id (actualizar película - solo admin)
router.put("/:id", authMiddleware, isAdmin, putMovieController);

// ---------- DELETE /movies/:id (borrar película - solo admin)
router.delete("/:id", authMiddleware, isAdmin, deleteMovieController);


export default router