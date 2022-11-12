// const deletePost = async (req, res, nxt) => {
//   const id = req.params.id;
//   let post;
//   try {
//     post = await Post.findById(id).populate('user');
//     // if (post != null) {
//     // console.log(post.user);
//     // await post.user.posts.pull(post);
//     // }
//   } catch (err) {
//     console.log(err);
//   }
//   if (!post) {
//     res.status(404).json({ message: "Post not found" });
//   }

//   try {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await post.remove({ session: session });  //remove doc; make sure we refer to the current session
//     post.user.posts.pull(post);   //remove post id from the corresponding user
//     await post.user.save({ session: session });    //save the updated user (part of our current session)
//     await session.commitTransaction();
//   } catch (err) {
//     return console.log(err);
//   }
//   return res.status(200).json({ message: "Post deleted successfully" });
// }
