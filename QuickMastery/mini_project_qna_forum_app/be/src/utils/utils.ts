export function generateUserId(role: string) {
  let userId = "";

  if (role === "admin") {
    userId = "ADM";
    for (let i = 0; i < 9; i++) {
      userId += Math.floor(Math.random() * 10);
    }
  } else {
    userId = String(Math.floor(Math.random() * 9) + 1);
    for (let i = 0; i < 11; i++) {
      userId += Math.floor(Math.random() * 10);
    }
  }

  return userId;
}

export function generatePostId(sequence: string) {
  const chars = sequence;
  if (!chars) throw new Error("Sequence is required.");
  let postId = '';
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    postId += chars[randomIndex];
  }
  return postId;
}