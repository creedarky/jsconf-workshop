/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

module.exports = async (app, db) => {
  // const Users = db.models.Users;
  // const Images = db.models.Images;
  // const Votes = db.models.Votes;
  // const user = await Users.sync()
  // .then(() => Users.destroy({ where: {} }))
  // .then(() => {
  //   const data = {
  //     name: 'Test User',
  //     email: 'test@example.com',
  //     password: 'test',
  //   };
  //   return Users.create(data);
  // }).then(u => u.toJSON());
  //
  //
  //
  // const images = await Images.sync()
  // .then(() => Images.destroy({ where: {} }))
  // .then(() => {
  //   const data = [{
  //     url: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg',
  //   }, {
  //     url: 'https://wallpaperscraft.com/image/kitten_briton_look_kid_96414_602x339.jpg',
  //   }, {
  //     url: 'https://static.pexels.com/photos/54632/cat-animal-eyes-grey-54632.jpeg',
  //   }, {
  //     url: 'https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/4785B1C2-8734-405D-96DC23A6A32F256B/thul-90efb785-97af-5e51-94cf-503fc81b6940.jpg?response-content-disposition=inline',
  //   }];
  //
  //   const promises = data.map(i => Images.create(i));
  //   return Promise.all(promises);
  // })
  // .then(responses => responses.map(r => r.toJSON()));
  //
  // await Votes.sync()
  //   .then(() => Votes.destroy({ where: {} }))
  //   .then(() => Promise.all(images.map(i => Votes.create({ user_id: user.id, image_id: i.id }))));
};
