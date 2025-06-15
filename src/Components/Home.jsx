import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data.reverse()); // Show newest posts first
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageUrl("");
    setDescription("");
    setEditingPost(null);
  };

  const handleAddPost = () => {
    resetForm();
    setOpen(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setImageUrl(post.imageUrl);
    setDescription(post.description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      imageUrl,
      description,
      userId: user.id,
    };

    try {
      if (editingPost) {
        await axios.put(`http://localhost:3000/posts/${editingPost.id}`, newPost);
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? { ...p, ...newPost } : p))
        );
      } else {
        const res = await axios.post("http://localhost:3000/posts", newPost);
        setPosts((prev) => [res.data, ...prev]);
      }
      handleClose();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user && (
      <Fab color="primary" aria-label="add"
        variant="outlined"
        onClick={handleAddPost}
        style={{ position: 'fixed', bottom: 20, right: 20 }}>
  <AddIcon />
</Fab>
      )}

      {posts.map((post) => (
        <Card key={post.id} elevation={3} sx={{ maxWidth: 1000, mb: 3 }}>
          <CardMedia
            sx={{ width: "70vw", height: "50vh", objectFit: "cover" }}
            image={post.imageUrl || ""}
            title={post.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", overflowWrap: "break-word" }}
            >
              {post.description}
            </Typography>
          </CardContent>
          {user && user.id === post.userId && (
            <CardActions>
              <Button onClick={() => handleEditPost(post)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      ))}

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPost ? "Edit Post" : "Add Post"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingPost ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}