const mongoose = require("mongoose");

const PASSWORD = "HarpeBlue";
const CONNECTION_STRING = `mongodb+srv://HarpeBlue:${PASSWORD}@cluster0.r4nymyq.mongodb.net/harpedb`;

// conextion string
mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error(err);
  });

// const note = new Note({
//   content: "HTML is easy",
//   date: new Date(),
//   important: true,
// });

// note
//   .save()
//   .then((response) => {
//     console.log(response);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error(err);
//   });
