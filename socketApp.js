var server = require("./bin/www");
//get the createServer variable function through this import

const io = require("socket.io")(server);
//the message array will act like a db to sture all the messages
/**It would act like this
 * [{
    roomname: 'Custom Chat Room', roomid: 1,  msg: [  '{"msgtext":"12","msgtime":"15:36","roomid":"1","roomname":"Custom Chat Room"}']
  },
  {
    roomname: 'Custom Chat Room', roomid: 12,msg: [
      '{"msgtext":"hii","msgtime":"15:37","roomid":"12","roomname":"Custom Chat Room"}', '{"msgtext":"hey","msgtime":"15:37","roomid":"12","roomname":"Custom Chat Room"}',
      '{"msgtext":"heyy","msgtime":"15:38","roomid":"12","roomname":"Custom Chat Room"}', '{"msgtext":"just","msgtime":"15:38","roomid":"12","roomname":"Custom Chat Room"}',
    ]
  },
]
So it a array which has each element which is store for a room:
each element has:
1. roomname
2. roomid
3. msg - Array which store the ongoning conversation in the room in sequenctial order
 * 
 */
let messageArray = [];

//onconnect
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //after connection each user request to join a room by providing the room id
  socket.on("Join Room", (data) => {
    // console.log("Join room");
    let roomid = JSON.parse(data).roomid;
    socket.join(parseInt(roomid)); //join room and emit the acknowledgement
    io.to(socket.id).emit("Room Joined");
  });

  //when user sends amessage
  socket.on("User to Server", (data) => {
    let roomExistinMsgArr = false,
      roomid = parseInt(JSON.parse(data).roomid),
      roomname = JSON.parse(data).roomname;
    //the below code check if the entry to data store in the message array for current room exists?
    /**if yes then add the message to the msg array in the current room msg array
     * if no make a new entry with  {roomname: roomname, roomid: roomid, msg: [data]}
     * So it acts like a db for the message
     */
    messageArray.forEach((ele, index) => {
      if (ele.roomid == roomid) {
        roomExistinMsgArr = true;
        messageArray[index].msg.push(data);
      }
    });
    if (roomExistinMsgArr == false) {
      messageArray.push({ roomname: roomname, roomid: roomid, msg: [data] });
    }
    // console.log(">>>", messageArray, typeof roomid);
    // console.log("__________________", roomid);
    //emit the current message to other user ibn the room
    socket.to(roomid).emit("Server to User", data);
    //io.to(socket.id).emit('hii','hello')
  });

  //When a new user joins the room then get him the previous message store the messageArr
  socket.on("Request For Old Message", (datajson) => {
    console.log("Got request for old message", socket.id);

    let roomid = datajson.roomid,
      mesageArr,
      roomExistinMsgArr = false;
    //chekc if the room entry is inthe message array if yes return the message object else return blank arr
    messageArray.forEach((ele, index) => {
      if (ele.roomid == roomid) {
        roomExistinMsgArr = true;
        mesageArr = messageArray[index].msg;
      }
    });
    if (roomExistinMsgArr == false) {
      mesageArr = [];
    }
    console.log(mesageArr);
    //emit to requesting user
    io.to(socket.id).emit("Load Previous Messages", JSON.stringify(mesageArr));
  });

  //on disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
