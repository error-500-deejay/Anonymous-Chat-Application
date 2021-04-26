var express = require("express");
var router = express.Router();

//function to render the chat room page
const chatPage = (req, res, next) => {
  let cid = Math.floor(Math.random() * 1000000);

  //check if the roomid and roomname are present in the url params if yes than add it in the post bpdy
  console.log(req.params);
  if (Object.keys(req.params).length > 0) {
    req.body["join-room-id"] = req.params.roomid;
    req.body["join-room-name"] = req.params.roomname;
  }
  //get the roomid and name else aassign custom one
  let roomid = parseInt(req.body["join-room-id"]);
  let roomname =
    req.body["join-room-name"] == undefined || req.body["join-room-name"] == ""
      ? "Custom Chat Room"
      : req.body["join-room-name"];

  //   console.log(
  //     "REquesting...",
  //     req.params,
  //     req.body,
  //     req.body["join-room-name"]
  //   );
  //   console.log(roomid, roomname);
  let baseurl = "";
  //rneder the chat room page with roomid and roomnae
  res.render("chats", {
    title: "testing ttle",
    baseurl: baseurl,
    cid: cid,
    roomid: roomid,
    roomname,
  });
};

/* GET home page which displays please enter the room id and then enter chat. */
const requireChatPage = (req, res, next) => {
  res.send(
    `<center>
      <h2 style=" margin: 10% 10% 1%; background: #673ab7; border-radius: 5px; padding: 10px; color: white; ">
      Please do join chat with the RoomId</h2>
      <a href="../" style=" color: #673ab7; font-size: 20px; "> Click to join chat again </a>
      </center>`
  );
};

//route for displaying the actual chat room page
router.post("/", chatPage);
//route for displaying enter theroom detais and try again page
router.get("/", requireChatPage);
/*route to lauch the chat room from the shareable link- 
It opens the same cchat room page only it takes the room id and room name in form of params instead of post paramtere as in the req.post(/chat ) route */
router.get("/launchChat/:roomid/:roomname", chatPage);

module.exports = router;
