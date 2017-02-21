const User = require('./Database');
const Amazon = require('./AWS');

module.exports = {
  grabUserProfile,
  postNewImage,
  getPictures
};

function grabUserProfile(userId) {
    return User.find({ _id: userId }, (err, user) => {
      if (err) {
      console.log(err);
      throw err;
    }
    console.log('user', user);
    });
}

function getPictures(userId) {
  return User.find({ _id: userId }, (err, user) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('user', user);
  })
    .then(result => {
      console.log('result', result[0].image_keys[1]);  //these are the image keys.  Use them to get from AWS.
       return Amazon.getPicture({ Bucket: 'jad.bucket1', Key: result[0].image_keys[1] })
         .then((image) => {
           console.log('this image', image);
           return result;
         });
      //return result;
    });
}

function postNewImage(userId, image, imageNumber) {
  //return Amazon.getPicture({ Bucket: 'jad.bucket1', Key: 'newImage.jpg' });
  let imageKey = userId + imageNumber + '.jpg';
  return Amazon.addImage(userId, image, imageKey)
     .then((result) => {
        // User.findByIdAndUpdate(userId, { $set: { 'image_keys': userId + imageNumber } }, (err, user) => {
        //   if (err) throw err;
        //   console.log('image posted!');
        // })
        // User.update({ _id: userId, 'image_keys.id': imageNumber }, { $set: { 'image_keys.key': userId + imageNumber } }, (err, user) => {
        //   if (err) {
        //     console.log('err', err);  
        //     throw err;
        //   }
        //   console.log('user is', user);
        // });
        console.log('this is the user id', userId, imageNumber);
        return User.findById(userId, (err, user) => {
          if (err) {
            console.log('new error', err);
            throw err;
          }
          console.log('user is', user);
          user.image_keys.set(imageNumber, userId + imageNumber + '.jpg');
          return user.save((err) => {
            if (err) {
              console.log('bad things', err);
              throw err;
            }
            console.log('user is2', user);
            console.log('image saved!', result);
            return result;
          });
        });
    });
}
