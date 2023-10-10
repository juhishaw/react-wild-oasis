import supabase, { supabaseUrl } from "./supabase";

const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
};

const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
};

const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://iagzgcaeskknbnbfrajk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //1. Create cabin
  let query = supabase.from("cabins");

  //Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  //2. Upload image
  if(hasImagePath) return data;
  
  const { error: storgaeError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete cabin if there was error uploading image
  if (storgaeError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created!"
    );
  }

  return data;
};

export { getCabins, deleteCabin, createEditCabin };
