const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  const { path, method } = event.queryStringParameters || {};
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    // REGISTER
    if (path === "register" && method === "POST") {
      const { email, password, username } = body;
      const { user, error } = await supabase.auth.signUp(
        { email, password },
        { redirectTo: "https://yourfrontend.netlify.app" }
      );
      if (error) return { statusCode: 400, body: JSON.stringify({ error }) };
      await supabase.from("users").insert([{ id: user.id, username }]);
      return { statusCode: 200, body: JSON.stringify({ user }) };
    }

    // LOGIN
    if (path === "login" && method === "POST") {
      const { email, password } = body;
      const { session, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { statusCode: 400, body: JSON.stringify({ error }) };
      return { statusCode: 200, body: JSON.stringify({ session }) };
    }

    // GET VIDEOS
    if (path === "videos" && method === "GET") {
      const { data: videos, error } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
      if (error) return { statusCode: 400, body: JSON.stringify({ error }) };
      return { statusCode: 200, body: JSON.stringify({ videos }) };
    }

    // UPLOAD VIDEO
    if (path === "upload" && method === "POST") {
      const { user_id, file_name, file_content, title, description } = body;
      const { error: uploadError } = await supabase.storage.from("videos").upload(`${user_id}/${file_name}`, Buffer.from(file_content, "base64"), { upsert: true });
      if (uploadError) return { statusCode: 400, body: JSON.stringify({ error: uploadError }) });
      const { publicUrl } = supabase.storage.from("videos").getPublicUrl(`${user_id}/${file_name}`);
      await supabase.from("videos").insert([{ user_id, video_url: publicUrl, title, description }]);
      return { statusCode: 200, body: JSON.stringify({ video_url: publicUrl }) };
    }

    // POST COMMENT
    if (path === "comment" && method === "POST") {
      const { user_id, video_id, comment_text } = body;
      const { error } = await supabase.from("comments").insert([{ user_id, video_id, comment_text }]);
      if (error) return { statusCode: 400, body: JSON.stringify({ error }) };
      return { statusCode: 200, body: JSON.stringify({ message: "Comment added" }) };
    }

    // GET COMMENTS
    if (path === "comments" && method === "GET") {
      const { video_id } = body;
      const { data: comments, error } = await supabase.from("comments").select("*").eq("video_id", video_id).order("created_at", { ascending: true });
      if (error) return { statusCode: 400, body: JSON.stringify({ error }) };
      return { statusCode: 200, body: JSON.stringify({ comments }) };
    }

    // GET USER PROFILE
    if (path === "profile" && method === "GET") {
      const { user_id } = body;
      const { data: user, error: userErr } = await supabase.from("users").select("*").eq("id", user_id).single();
      const { data: videos, error: videoErr } = await supabase.from("videos").select("*").eq("user_id", user_id);
      if (userErr || videoErr) return { statusCode: 400, body: JSON.stringify({ error: userErr || videoErr }) };
      return { statusCode: 200, body: JSON.stringify({ user, videos }) };
    }

    return { statusCode: 404, body: "Not found" };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
