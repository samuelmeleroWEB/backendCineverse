import mongoose from "mongoose";

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // minutos
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    ageRating: {
      type: String, 
      required: true,
    },
     mvpImageUrl: {
      type: String,
      default: "",
    },
    isMvp: {
      type: Boolean,
      default: false,
    },
    posterUrl: {
      type: String, 
      required: true,
    },
    releaseDate:{
        type: String,
        required:true

    }
  },
  {
    timestamps: true, // añade createdAt y updatedAt automáticamente , createdAt, es la fecha en la que se creo el documento y update es la ultima actualización
  }
);

const Movie = model('Movie', movieSchema, 'Movie');

export default Movie;