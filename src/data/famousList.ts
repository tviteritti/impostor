export interface FamousPerson {
  name: string;
  category: string;
}

export const FAMOUS_LIST: FamousPerson[] = [
  // Deportistas
  { name: 'Ángel Di María', category: 'Deportistas' },
  { name: 'Sergio Agüero', category: 'Deportistas' },
  { name: 'Carlos Tévez', category: 'Deportistas' },
  { name: 'Juan Román Riquelme', category: 'Deportistas' },
  { name: 'Gabriel Batistuta', category: 'Deportistas' },
  { name: 'Manu Ginóbili', category: 'Deportistas' },
  { name: 'Carlos Reutemann', category: 'Deportistas' },
  { name: 'Franco Colapinto', category: 'Deportistas' },
  { name: 'Neymar', category: 'Deportistas' },
  { name: 'Mbappé', category: 'Deportistas' },
  { name: 'Zlatan Ibrahimović', category: 'Deportistas' },
  { name: 'Pelé', category: 'Deportistas' },
  { name: 'Rafael Nadal', category: 'Deportistas' },

  
  // Cantantes
  { name: 'Charly García', category: 'Cantantes' },
  { name: 'Gustavo Cerati', category: 'Cantantes' },
  { name: 'Fito Páez', category: 'Cantantes' },
  { name: 'Andrés Calamaro', category: 'Cantantes' },
  { name: 'Luis Alberto Spinetta', category: 'Cantantes' },
  { name: 'Sandro', category: 'Cantantes' },
  { name: 'Mercedes Sosa', category: 'Cantantes' },
  { name: 'Bizarrap', category: 'Cantantes' },
  { name: 'Nicki Nicole', category: 'Cantantes' },
  { name: 'Nathy Peluso', category: 'Cantantes' },
  { name: 'Duki', category: 'Cantantes' },
  { name: 'Wos', category: 'Cantantes' },
  { name: 'Tini', category: 'Cantantes' },
  { name: 'Lali', category: 'Cantantes' },
  { name: 'Michael Jackson', category: 'Cantantes' },
  { name: 'Madonna', category: 'Cantantes' },
  { name: 'Freddie Mercury', category: 'Cantantes' },
  { name: 'Elvis Presley', category: 'Cantantes' },
  { name: 'Charly García', category: 'Cantantes' },
  { name: 'Palito Ortega', category: 'Cantantes' },
  { name: 'La Joaqui', category: 'Cantantes' },
  { name: 'Rusherking', category: 'Cantantes' },
  { name: 'Tiago PZK', category: 'Cantantes' },
  { name: 'Duki', category: 'Cantantes' },
  
  // Actores
  { name: 'Ricardo Darín', category: 'Actores' },
  { name: 'Guillermo Francella', category: 'Actores' },
  { name: 'Norma Aleandro', category: 'Actores' },
  { name: 'Luis Brandoni', category: 'Actores' },
  { name: 'Adrián Suar', category: 'Actores' },
  { name: 'Natalia Oreiro', category: 'Actores' },
  { name: 'Florencia Peña', category: 'Actores' },
  { name: 'Johnny Depp', category: 'Actores' },
  { name: 'Al Pacino', category: 'Actores' },
  { name: 'Robert De Niro', category: 'Actores' },
  { name: 'Keanu Reeves', category: 'Actores' },
  { name: 'Denzel Washington', category: 'Actores' },
  { name: 'Margot Robbie', category: 'Actores' },
  { name: 'Guillermo Francella', category: 'Actores' },
  { name: 'Ricardo Darín', category: 'Actores' },

  // Conductores
  { name: 'Marcelo Tinelli', category: 'Conductores' },
  { name: 'Susana Giménez', category: 'Conductores' },
  { name: 'Mirtha Legrand', category: 'Conductores' },
  { name: 'Guido Kaczka', category: 'Conductores' },
  { name: 'Santiago del Moro', category: 'Conductores' },
  { name: 'Andy Kusnetzoff', category: 'Conductores' },
  { name: 'Jorge Rial', category: 'Conductores' },
  { name: 'Mirtha Legrand', category: 'Conductores' },
  { name: 'Susana Giménez', category: 'Conductores' },
  
  // Científicos
  { name: 'Nikola Tesla', category: 'Científicos' },
  { name: 'Marie Curie', category: 'Científicos' },
  { name: 'Isaac Newton', category: 'Científicos' },
  { name: 'Charles Darwin', category: 'Científicos' },
  
  // Empresarios
  { name: 'Elon Musk', category: 'Empresarios' },
  { name: 'Bill Gates', category: 'Empresarios' },
  { name: 'Jeff Bezos', category: 'Empresarios' },

  { name: 'Homero Simpson', category: 'Personajes' },
  { name: 'Bart Simpson', category: 'Personajes' },
  { name: 'Mafalda', category: 'Personajes' },
  { name: 'Harry Potter', category: 'Personajes' },
  { name: 'Darth Vader', category: 'Personajes' },
  { name: 'Batman', category: 'Personajes' },
  { name: 'Spider-Man', category: 'Personajes' },

  { name: 'Ibai Llanos', category: 'Redes Sociales' },
  { name: 'Coscu', category: 'Redes Sociales' },
  { name: 'AuronPlay', category: 'Redes Sociales' },
];

export const getRandomFamous = (): FamousPerson => {
  const randomIndex = Math.floor(Math.random() * FAMOUS_LIST.length);
  return FAMOUS_LIST[randomIndex];
};

