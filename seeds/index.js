const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64e6bd50178b748d4b213ca0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, iste quibusdam harum fugit distinctio sed. Facere deserunt possimus voluptate similique at ea et necessitatibus reprehenderit delectus, porro sequi veniam in',
            price,
            geometry: {
                type: "Point",
                coordinates: [-122.599708, 49.219735]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dqazncahz/image/upload/v1693361044/YelpCamp/mh9zbvoewagy2nhbzdqx.jpg',
                  filename: 'YelpCamp/mh9zbvoewagy2nhbzdqx'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})