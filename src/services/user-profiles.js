import supabase from "./supabase";

export async function createUserProfile(data) {
    const { error } = await supabase
    .from('user_profiles')
    .insert(data);

    if(error) {
        console.error('[user-profiles.js createUserProfile] Error al crear perfil de usuario: ', error);
        throw error;
    }
}

export async function updateUserProfile(id, data) {
    const {error} = await supabase
    .from('user_profiles')
    .update(data)
    .eq('id',id);

    if(error) {
        console.error('[user-profiles.js updateUserProfile] Error al actualizar el perfil de usuario: ', error);
        throw error;
    }
}

export async function getUserProfileById(id) {
    const { data, error} = await supabase
        .from('user_profiles')
        .select()
        .eq('id' ,id);

    if(error) {
        console.error('[user-profiles.js getUserProfileById] Error al traer el usuario: ', error);
        throw error;
    }
    return data [0];
}