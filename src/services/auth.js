import supabase from "./supabase";

/**
 * Registra un usuario y lo autentica.
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{}>}
 */
export async function register(email, password) {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if(error) {
        console.error('[auth.js register] Error al crear una cuenta: ', error);
        throw error;
    }

    console.log(data);

    return data.user;
}

/**
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{}>}
 */
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw error;
    }

    console.log(data);

    return data.user;
}

export async function logout() {

}