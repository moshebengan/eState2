import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },

        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },

      include: {
        messages: {
          orderBy: {
            createAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get THE CHAT!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    // validating that user not openning chat with himself
    if (tokenUserId === req.body.receiverId) {
      return res
        .status(409)
        .json({ message: "You can't open chat with yourself" });
    }

    // validating that not openning duplicated chats with the same user
    const chatExist = await prisma.chat.findFirst({
      where: {
        OR: [
          {
            userIDs: { hasEvery: [tokenUserId, req.body.receiverId] },
          },
          {
            userIDs: { hasEvery: [req.body.receiverId, tokenUserId] },
          },
        ],
      },
    });
    if (chatExist) {
      return res
        .status(409)
        .json({ message: "Chat with that user already exists" });
    }

    const newChat = await prisma.chat.create({
      data: { userIDs: [tokenUserId, req.body.receiverId] },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to update seen by" });
  }
};
