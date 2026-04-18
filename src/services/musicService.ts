import { supabase } from "@/lib/supabase";

// Definimos una consulta estándar para reutilizar
const SONG_QUERY = `
  *,
  artists (
    id,
    name,
    image_url
  )
`

export const getSongs = async () => {
  const { data, error } = await supabase
    .from("songs")
    .select(SONG_QUERY);

  //if (error) return [];
  return error ? [] : data;
};

export const searchSongs = async (query: string) => {
  if (!query) return [];  

  const { data, error } = await supabase
    .from("songs_with_artist_name")
    .select("*")
    .or(`title.ilike.%${query}%,genre.ilike.%${query}%,artist_name.ilike.%${query}%`)
    .limit(15);

    if (error) {
      console.error("Error en búsqueda:", error);
      return [];
    }

    const formattedData = data.map(song => ({
      ...song,
      artists: {
        name: song.artist_name,
        image_url: song.artist_image,
      }
    }))

    return formattedData;  
};

export const getUniqueGenres = async () => {
  const { data, error } = await supabase.from("songs").select("genre");

  if (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
  // Eliminar duplicados y filtramos
  const genres = [...new Set(data.map((item) => item.genre).filter(Boolean))];
  return genres;
};

export const getArtistById = async (id: string) => {  
  // 1. Obtener datos del artista
  const { data: artist, error: artistErr } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (artistErr || !artist) {
    console.error("Error artista:", artistErr);
    return null;
  }

  // 2. Obtener canciones del artist
  const { data: songs } = await supabase
    .from("songs")
    .select(SONG_QUERY)
    .eq("artist_id", id)

  // 3. Albumes del artista
  const { data: albums } = await supabase
    .from("albums")
    .select('*')
    .eq("artist_id", id)
  

  return { artist, songs: songs || [], albums: albums || [], }
};

export const getSongsByGenre = async (genre: string) => {
  const { data, error } = await supabase
    .from("songs")
    .select(SONG_QUERY)
    .eq("genre", genre)

  return error ? [] : data;
}

export const getAlbumById = async (id: string) => {
  // 1. Datos Álbum + Artista del álbum
  const { data: album, error: albumErr } = await supabase
    .from("albums")
    .select("*, artists (name, image_url)")
    .eq("id", id)
    .single();
  
  if (albumErr || !album) return null;

  // 2. Canciones que pertencen al álbum
  const {data: songs, error: songsErr} = await supabase
    .from("songs")
    .select(SONG_QUERY)
    .eq("album_id", id)
    .order("track_number", {ascending: true})

  return { album, songs: songs || [] }
}

export const getAllArtists = async () => {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("name", {ascending: true})

  if (error) {
    console.error("Error fetching all artists:", error)
    return [];
  }

  return data;
  
}
