import supabase from "./supabase";

export async function createUserProfile(data) {
    
}

export async function updateUserProfile(id, data) {
    
}

export async function getUserProfileById(id) {
    const { data, error} = await supabase
        .from('user_profiles')
        .select()
        .eq("id", id);

    if(error) {
        console.error('[user-profiles.js getUserProfileById] Error al traer el usuario: ', error);
        throw error;
    }
    return data [0];
}