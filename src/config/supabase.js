'use server';

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON;

const supabaseBucket = process.env.SUPABASE_BUCKET;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadFileToSupabase(filePath, file) {
    let { data, error } = await supabaseClient.storage.from(supabaseBucket).upload(filePath, file);
    if (error) {
        throw error;
    }
    const { data: url } = await supabaseClient.storage.from(supabaseBucket).getPublicUrl(filePath);
    const uploadurl = url.publicUrl;
    return uploadurl
}

export { uploadFileToSupabase }