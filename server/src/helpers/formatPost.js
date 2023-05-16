export function formatPost(arrPosts, arrComments) {
  let listPosts = [];
  for (let i = 0; i < arrPosts.length; i++) {
    listPosts.push({
      id: arrPosts[i].id,
      title: arrPosts[i].title,
      image: arrPosts[i].image,
      date: arrPosts[i].created_at,
      userAuthor: {
        id: arrPosts[i].user_id,
        name: arrPosts[i].userName,
        lastName: arrPosts[i].userLastName,
        image: arrPosts[i].imageUser,
        role: arrPosts[i].created_role
      },
      comments: [],
    });
  }
  console.log(arrPosts)
  for (let j = 0; j < listPosts.length; j++) {
    for (let y = 0; y < arrComments.length; y++) {
      if (listPosts[j].id == arrComments[y].post_id) {
        listPosts[j].comments.push({
          commentId: arrComments[y].id,
          comment: arrComments[y].text,
          date: arrComments[y].created_at,
          userAuthor: {
            id: arrComments[y].user_id,
            name: arrComments[y].name,
            lastName: arrComments[y].last_name,
            role: arrComments[y].role,
            image: arrComments[y].image,
          },
        });
      }
    }
  }

  return listPosts.sort()
}
