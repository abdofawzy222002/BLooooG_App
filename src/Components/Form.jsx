// import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";

// export default function Form({ open, onClose, onSubmit, initialData }) {
//   const [title, setTitle] = useState(initialData?.title || "");
//   const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
//   const [description, setDescription] = useState(initialData?.description || "");

//   useEffect(() => {
//     setTitle(initialData?.title || "");
//     setImageUrl(initialData?.imageUrl || "");
//     setDescription(initialData?.description || "");
//   }, [initialData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       title,
//       imageUrl,
//       description,
//       ...(initialData?.id ? { id: initialData.id } : {}),
//     });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>{initialData ? "Edit Post" : "Add Post"}</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Title"
//           fullWidth
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <TextField
//           margin="dense"
//           label="Image URL"
//           fullWidth
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//           required
//         />
//         <TextField
//           margin="dense"
//           label="Description"
//           fullWidth
//           multiline
//           rows={4}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button variant="contained" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">
//           {initialData ? "Update" : "Add"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }