import Movie from "../models/movie.model.js";
import Session from "../models/session.model.js";

// PUBLIC
export async function getMoviesService(){
    return await Movie.find().sort({ createdAt: -1 });
   
}
 export async function getMovieService(id){ // solo 1 porque es por Id
    return await Movie.findById(id);
}
export async function getMovieSessionService(id){
   return await Session.find({ movie: id })
      .populate('room')
      .sort({ startTime: 1 });
}
export async function getMvpMoviesService(){
    return await Movie.find({ isMvp: true }).sort({ createdAt: -1 }); 
}

// ADMIN

export async function putMvpMoviesService(movieIds){
    // 1) Quitamos el flag MVP de todas
    await Movie.updateMany(
      { isMvp: true },
      { $set: { isMvp: false } }
    );
    // 2) Marcamos como MVP solo las que nos llegan
    if (movieIds.length > 0) {
      await Movie.updateMany(
        { _id: { $in: movieIds } },
        { $set: { isMvp: true } }
      );
    } 
}
export async function postMovieService(params){

    const {
      title,
      description,
      duration,
      genre,
      ageRating,
      posterUrl,
      releaseDate,
      mvpImageUrl,
    } = params;

   return await Movie.create({
      title,
      description,
      duration,
      genre,
      ageRating,
      posterUrl,
      releaseDate,
      mvpImageUrl,
    });


}
export async function putMovieService(req){

    const { id } = req.params;
    const {
      title,
      description,
      duration,
      genre,
      ageRating,
      posterUrl,
      releaseDate,
      mvpImageUrl,
    } = req.body;

   return await Movie.findByIdAndUpdate(
      id,
      {
        title,
        description,
        duration,
        genre,
        ageRating,
        posterUrl,
        releaseDate,
        mvpImageUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    
}
export async function deleteMovieService(id){
    return await Movie.findByIdAndDelete(id);
}