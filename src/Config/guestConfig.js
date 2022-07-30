import img from "../assets/edu.png";
import img2 from "../assets/illustration.png";
import img3 from "../assets/illustration-2.png";

export let demoPosts = [];

export let demoForum = {
  _id: "5e9f8f8f8 f8f8f8f8f8f8f8f",
  forumName: "Demo Forum",
  address: "Demo Address",
  website: "https://www.campustalk.live",
  email: "support@campustalk.live",
  rules: [],
  members: [],
  moderators: [],
  posts: [],
  timestamp: "2022-01-01T00:00:00.000Z",
  __v: 0,
};

const moderator = {
  _id: "5e9f8f8f8f8f8f8f8f8f8f8f",
  posts: demoPosts,
  forums: [demoForum],
  firstName: "CampusTalk",
  lastName: "Bot",
  picture: "",
  new: false,
  active: true,
};

demoPosts = [
  ...demoPosts,
  {
    _id: "7e8a8c8f838h8f2y1t5f1f8f",
    text: "Welcome to CampusTalk! Here's a list of things you can do:\n\n - Create a new forum\n - Edit forum information (Only if you are a moderator)\n - Delete a forum(Only if you are a moderator)\n - Remove a member (Only if you are a moderator)\n - Add/Update forum rules(Only if you are a moderator\n - Join an existing forum \n - Create a new post\n - Create a post anonymously\n - Edit your post\n - Upvote/Downvote a Post\n - Delete a post(Only if you are a moderator or the author)\n - Comment on a Post\n - Upvote/Downvote a Comment\n - Reply to a comment\n - Upvote/Downvote a Reply\n - Chat with other members\n - Edit your profile\n",
    anonymous: false,
    file: [img],
    author: moderator,
    originalFileNames: [
      {
        name: "Illustration",
        type: "image",
      },
    ],
    forum: demoForum,
    comments: [],
    upvotes: [],
    downvotes: [],
    approved: true,
    important: false,
    timestamp: "2022-01-02T00:00:00.000Z",
    __v: 0,
  },

  {
    _id: "7e8a8c8f838h8f2y1t5f1w8c",
    text: "Why should you use CampusTalk? \n\n - Information about all college related activites available on a single platform.\n - No need to juggle between email, What'sApp & google classroom.\n - Suitable for academic as well as extra-curricular activities.\n - Optinal anonymous environment for our the introverted crowd.\n - Very high chance of getting accurate information since almost everyone in the college will be a member of the forum.",
    anonymous: false,
    file: [img2],
    author: moderator,
    originalFileNames: [
      {
        name: "Illustration",
        type: "image",
      },
    ],
    forum: demoForum,
    comments: [],
    upvotes: [],
    downvotes: [],
    approved: true,
    important: false,
    timestamp: "2022-01-01T00:00:00.000Z",
    __v: 0,
  },

  {
    _id: "4e6b1t8f838h8f2y1t5f1w8c",
    text: "Brief information about how the foroums will work: \n\n - Each forum will have moderators and members.\n - Moderators will manage the forum and ensure that all forum rules are followed by the members.\n - Every member request will have to be approved by a moderator.\n - Every post created will have to be approved by the moderators. If a moderator thinks that a post violates the forum rules, he/she can reject the post.\n - Events section will also be managed exclusively by moderators. They can create, update or delete an event anytime.\n - Moderators can also remove a member or post at anytime.\n - Other than the above duties, Moderators can perform any tasks that just like a normal member such as creating posts, comments, replies, chatting etc.\n - Members can create a post to ask or to provide information/resources about college activites.",
    anonymous: false,
    file: [img3],
    author: moderator,
    originalFileNames: [
      {
        name: "Illustration",
        type: "image",
      },
    ],
    forum: demoForum,
    comments: [],
    upvotes: [],
    downvotes: [],
    approved: true,
    important: false,
    timestamp: "2022-01-01T00:00:00.000Z",
    __v: 0,
  },
];

export const guestUser = {
  _id: process.env.REACT_APP_GUEST_ID,
  posts: [],
  forums: [demoForum],
  firstName: "Guest",
  lastName: "User",
  picture: "",
  new: false,
  active: true,
};

demoForum.posts = demoPosts;
demoForum.members = [moderator, guestUser];
demoForum.moderators = [moderator];

export let demoChat = {
  _id: "6e9f8f8f8f8f8f8f8f8f8f8f",
  members: [moderator, guestUser],
  timestamp: "2022-01-01T00:00:00.000Z",
  unReadCounts: {
    [moderator._id]: 0,
    [guestUser._id]: 0,
  },
  messages: [],
};

export let demoEvent = {
  _id: "7e9f8f8f8f8f8f8f8f8f8f8f",
  name: "Demo Event",
  description: "This is a demo event",
  images: [],
  link: "",
  forum: demoForum,
  date: "2022-09-01T00:00:00.000Z",
  time: "11:00",
  venue: "Moon",
  timestamp: "2022-01-01T00:00:00.000Z",
  document: "",
};
