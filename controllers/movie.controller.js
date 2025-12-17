import {
    deleteMovieService,
  getMovieService,
  getMovieSessionService,
  getMoviesService,
  getMvpMoviesService,
  postMovieService,
  putMovieService,
  putMvpMoviesService,
} from "../services/movie.service.js";

// PUBLIC
export async function getMoviesController(req, res) {
  try {
    const movies = await getMoviesService();
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error en GET /movies:", error);
    return res.status(500).json({ message: "Error al obtener películas" });
  }
}
export async function getMovieController(req, res) {
  try {
    const { id } = req.params;
    const movie = await getMovieService(id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error en GET /movies/:id:", error);
    return res.status(500).json({ message: "Error al obtener la película" });
  }
}
export async function getMovieSessionController(req, res) {
  try {
    const { id } = req.params;
    const sessions = await getMovieSessionService(id)
    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error en GET /movies/:id/sessions:", error);
    return res.status(500).json({ message: "Error al obtener sesiones" });
  }
}

// ADMIN
export async function getMvpMoviesController(req, res) {
  try {
    const mvpMovies = await getMvpMoviesService();
    return res.status(200).json(mvpMovies);
  } catch (error) {
    console.error("Error en GET /movies/mvp:", error);
    return res.status(500).json({ message: "Error al obtener películas MVP" });
  }
}

export async function putMvpMoviesController(req, res) {
  try {
    const { movieIds } = req.body;

    if (!Array.isArray(movieIds)) {
      return res
        .status(400)
        .json({ message: "movieIds debe ser un array de IDs" });
    }
    await putMvpMoviesService(movieIds);
    return res.status(200).json({
      message: "Películas MVP actualizadas correctamente",
      movieIds,
    });
  } catch (error) {
    console.error("Error en PUT /movies/mvp:", error);
    return res
      .status(500)
      .json({ message: "Error al actualizar películas MVP" });
  }
}
export async function postMovieController(req, res) {
 try {
    const {
      title,
      description,
      duration,
      genre,
      ageRating,
      posterUrl,
    } = req.body;

    if (!title || !description || !duration || !genre || !ageRating || !posterUrl) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newMovie = await postMovieService(req.body)

    return res.status(201).json({
      message: 'Película creada correctamente',
      movie: newMovie,
    });
  } catch (error) {
    console.error('Error en POST /movies:', error);
    return res.status(500).json({ message: 'Error al crear la película' });
  }
}
export async function putMovieController(req, res) {
try {
    const updatedMovie = await putMovieService(req)
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    return res.status(200).json({
      message: 'Película actualizada correctamente',
      movie: updatedMovie,
    });
  } catch (error) {
    console.error('Error en PUT /movies/:id:', error);
    return res.status(500).json({ message: 'Error al actualizar película' });
  }
}
export async function deleteMovieController(req, res) {
try {
    const { id } = req.params;

    const deletedMovie = await deleteMovieService(id)

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    return res.status(200).json({
      message: 'Película eliminada correctamente',
    });
  } catch (error) {
    console.error('Error en DELETE /movies/:id:', error);
    return res.status(500).json({ message: 'Error al eliminar película' });
  }
}